import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Question, UserResponse } from '../types';
import { modeQuestions, electronicsQuestions, skincareQuestions, groceryQuestions, customQuestions } from '../data/questions';

interface QuestionnaireProps {
  onComplete: (responses: UserResponse[], mode: string) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete }) => {
  const [mode, setMode] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);

  let questions: Question[] = [];
  if (!mode) {
    questions = modeQuestions;
  } else if (mode === '📱 Electronics') {
    questions = electronicsQuestions;
  } else if (mode === '💄 Skincare') {
    questions = skincareQuestions;
  } else if (mode === '🥗 Healthcare Grocery') {
    questions = groceryQuestions;
  } else if (mode === '✏️ Custom Mode') {
    questions = customQuestions;
  }

  const handleAnswer = (answer: string | string[]) => {
    const newResponses = [...responses];
    const existingIndex = newResponses.findIndex(r => r.questionId === questions[currentQuestion].id);
    
    if (existingIndex >= 0) {
      newResponses[existingIndex] = { questionId: questions[currentQuestion].id, answer };
    } else {
      newResponses.push({ questionId: questions[currentQuestion].id, answer });
    }
    
    setResponses(newResponses);
  };

  const handleNext = () => {
    if (!mode) {
      // First question is mode selection
      const selected = responses.find(r => r.questionId === 'mode')?.answer as string;
      setMode(selected);
      setCurrentQuestion(0);
      setResponses([]);
      return;
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(responses, mode);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (mode) {
      setMode(null);
      setCurrentQuestion(0);
      setResponses([]);
    }
  };

  const getCurrentResponse = () => {
    return responses.find(r => r.questionId === questions[currentQuestion].id)?.answer;
  };

  const isAnswered = () => {
    const response = getCurrentResponse();
    return response && (Array.isArray(response) ? response.length > 0 : response !== '');
  };

  const question = questions[currentQuestion];
  const currentResponse = getCurrentResponse();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto animate-fade-in">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-walmart-blue">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-walmart-blue h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="animate-slide-up">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{question.question}</h2>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <label
              key={index}
              className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-walmart-blue hover:bg-walmart-blue-light transition-all duration-200"
            >
              <input
                type={question.type === 'single' ? 'radio' : 'checkbox'}
                name={question.id}
                value={option}
                checked={
                  question.type === 'single' 
                    ? currentResponse === option
                    : Array.isArray(currentResponse) && currentResponse.includes(option)
                }
                onChange={(e) => {
                  if (question.type === 'single') {
                    handleAnswer(option);
                  } else {
                    const currentArray = Array.isArray(currentResponse) ? currentResponse : [];
                    if (e.target.checked) {
                      handleAnswer([...currentArray, option]);
                    } else {
                      handleAnswer(currentArray.filter(item => item !== option));
                    }
                  }
                }}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                (question.type === 'single' && currentResponse === option) ||
                (question.type === 'multiple' && Array.isArray(currentResponse) && currentResponse.includes(option))
                  ? 'bg-walmart-blue border-walmart-blue'
                  : 'border-gray-300'
              }`}>
                {((question.type === 'single' && currentResponse === option) ||
                  (question.type === 'multiple' && Array.isArray(currentResponse) && currentResponse.includes(option))) && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
              <span className="text-gray-700 font-medium">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex items-center px-6 py-3 text-gray-600 hover:text-walmart-blue disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={!isAnswered()}
          className="flex items-center px-8 py-3 bg-walmart-blue text-white rounded-lg hover:bg-walmart-blue-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
        >
          {currentQuestion === questions.length - 1 ? 'Get Recommendations' : 'Next'}
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;