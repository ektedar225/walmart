# Full Python Script: Prompt → Gemini Keyword Extraction → Fuzzy Product Match → Sentiment → Ranking
import spacy
import google.generativeai as genai
from youtube_transcript_api import YouTubeTranscriptApi
from googleapiclient.discovery import build
import praw
import re
from rapidfuzz import fuzz

# --- Configuration ---
YOUTUBE_API_KEY = 'AIzaSyCgOglXTDo03v0_UJgF_4D7aFMTTAL7L10'
GENAI_API_KEY = 'AIzaSyAP5FIJfCXOObjkdVgJ9CC_Mi63tLQi3NE'
REDDIT_CLIENT_ID = '6QfrJSDfHQZP9XBOQ17oLQ'
REDDIT_SECRET = 'y2R8_CUxJT37gMciyfir3c3j1TCsnQ'
REDDIT_USER_AGENT = 'product_sentiment'

# Initialize services
nlp = spacy.load("en_core_web_sm")
genai.configure(api_key=GENAI_API_KEY)
gemini_model = genai.GenerativeModel("gemini-1.5-flash")
youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)
reddit = praw.Reddit(client_id=REDDIT_CLIENT_ID,
                     client_secret=REDDIT_SECRET,
                     user_agent=REDDIT_USER_AGENT)

# Product dictionary: electronics domain
product_dict = {
    "Asus ROG Zephyrus G14": ["gaming", "laptop", "student", "portable", "performance"],
    "MacBook Air M2": ["student", "lightweight", "apple", "battery", "performance"],
    "Lenovo Legion 5": ["gaming", "budget", "student", "laptop", "cooling"],
    "HP Pavilion x360": ["2-in-1", "student", "budget", "touchscreen", "laptop"],
    "Dell XPS 13": ["ultrabook", "performance", "design", "compact", "student"]
}

def extract_keywords(prompt):
    doc = nlp(prompt)
    return list(set([chunk.text.lower().strip() for chunk in doc.noun_chunks]))

def fuzzy_tag_match(user_tags, product_tags):
    matched = []
    for utag in user_tags:
        for ptag in product_tags:
            if fuzz.partial_ratio(utag, ptag) >= 80:
                matched.append(ptag)
                break
    return matched

def fetch_youtube_reviews(product):
    try:
        search_response = youtube.search().list(
            q=f"{product} review",
            part='id',
            type='video',
            maxResults=2
        ).execute()
        video_ids = [item['id']['videoId'] for item in search_response['items']]
        text_segments = []
        for vid in video_ids:
            try:
                transcript = YouTubeTranscriptApi.get_transcript(vid)
                text_segments.extend([seg['text'] for seg in transcript])
            except:
                continue
        return " ".join(text_segments[:1000])
    except Exception as e:
        print(f"Error fetching YouTube: {e}")
        return ""

def fetch_reddit_reviews(product):
    try:
        posts = reddit.subreddit("all").search(f"{product} review", limit=3)
        comments = []
        for post in posts:
            comments.append(post.title + " " + post.selftext)
        return " ".join(comments)
    except Exception as e:
        print(f"Error fetching Reddit: {e}")
        return ""

def gemini_sentiment_analysis(product, text):
    prompt = f"""
You are an expert product review analyzer.

Product: {product}

Review Content:
{text}

Analyze the above content and return the following (strictly in this format):

Sentiment: (Positive / Neutral / Negative)  
Score: (out of 100, numeric only)  
Pros:
- Bullet points of pros
Cons:
- Bullet points of cons
Summary: A one-line summary of the product's strengths and weaknesses
"""
    try:
        response = gemini_model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Gemini Error: {e}")
        return "Error"

def extract_score(response_text):
    match = re.search(r"score\\s*[:\\-]?\\s*(\\d+)", response_text, re.IGNORECASE)
    if match:
        return min(100, max(0, int(match.group(1))))
    
    # Fallback score based on sentiment keywords
    text = response_text.lower()
    if "positive" in text:
        return 80
    elif "neutral" in text:
        return 50
    elif "negative" in text:
        return 20
    return 0

def analyze_prompt(prompt):
    user_tags = extract_keywords(prompt)
    results = []

    for product, tags in product_dict.items():
        matched_tags = fuzzy_tag_match(user_tags, tags)
        checklist_ratio = len(matched_tags) / len(user_tags) if user_tags else 0

        yt_text = fetch_youtube_reviews(product)
        reddit_text = fetch_reddit_reviews(product)
        combined_text = yt_text + " " + reddit_text

        if combined_text.strip():
            sentiment_result = gemini_sentiment_analysis(product, combined_text)
            score = extract_score(sentiment_result)
        else:
            sentiment_result = "No review data available"
            score = 0

        final_rank_score = score * checklist_ratio

        results.append({
            "product": product,
            "sentiment_score": score,
            "matched_tags": matched_tags,
            "checklist_ratio": checklist_ratio,
            "final_score": final_rank_score,
            "gemini_sentiment": sentiment_result.strip()
        })

    ranked = sorted(results, key=lambda x: x['final_score'], reverse=True)
    return ranked, user_tags

if __name__ == "__main__":
    user_prompt = input("What kind of product are you looking for? ")
    ranked_results, user_tags = analyze_prompt(user_prompt)

    print("\n📦 Product Sentiment Summary:")
    for idx, res in enumerate(ranked_results):
        print(f"\n🔹 {res['product']}")
        print(f"Sentiment Score: {res['sentiment_score']} / 100")
        print(f"Checklist Match: {'✔' * len(res['matched_tags']) + '✖' * (len(user_tags) - len(res['matched_tags']))} ({len(res['matched_tags'])}/{len(user_tags)})")
        print(f"Matched Tags: {', '.join(res['matched_tags']) if res['matched_tags'] else 'None'}")
        print("Gemini Summary:")
        print(res['gemini_sentiment'])
