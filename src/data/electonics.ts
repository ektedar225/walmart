const laptops = [
  {
    "id": "LAP201",
    "name": "Apple MacBook Air 13.3 inch Laptop - Space Gray, M1 Chip, 8GB RAM, 256GB storage",
    "brand": "Apple",
    "category": "Electronics",
    "price": 649.00,
    "image": "electro_image/electro_image/ii1.webp",
    "description": "Ultra-lightweight MacBook Air with Apple M1 chip for powerful performance and all-day battery.",
    "rating": 4.7,
    "reviews": 6273
  },
  {
    "id": "LAP202",
    "name": "Dell Inspiron 14 Laptop 5440 14-inch FHD+ Intel Core i5-1334U 8GB RAM 512GB NVMe SSD",
    "brand": "Dell",
    "category": "Electronics",
    "price": 369.00,
    "image": "electro_image/electro_image/ii2.webp",
    "description": "Sleek Inspiron 14 with Intel Core i5, FHD+ display, and fast SSD for multitasking.",
    "rating": 4.4,
    "reviews": 43
  },
  {
    "id": "LAP203",
    "name": "HP 15.6 inch FHD IPS Touch Windows Laptop AMD Ryzen 7 7730U 16GB RAM 512GB SSD",
    "brand": "HP",
    "category": "Electronics",
    "price": 478.00,
    "image": "electro_image/electro_image/ii3.webp",
    "description": "Touchscreen HP laptop with Ryzen 7, 16GB RAM, and large SSD for power users.",
    "rating": 4.3,
    "reviews": 112
  },
  {
    "id": "LAP204",
    "name": "ASUS Vivobook 16\" WUXGA Laptop Intel Core i7-1355U 16GB RAM 512GB SSD Black",
    "brand": "ASUS",
    "category": "Electronics",
    "price": 599.00,
    "image": "electro_image/electro_image/ii4.webp",
    "description": "Vivobook 16-inch with Core i7 and 16GB RAM for seamless productivity and entertainment.",
    "rating": 4.6,
    "reviews": 30
  },
  {
    "id": "LAP205",
    "name": "HP 15.6 inch FHD IPS Windows Laptop Intel Core i3-N305 8GB RAM 256GB SSD",
    "brand": "HP",
    "category": "Electronics",
    "price": 309.00,
    "image": "electro_image/electro_image/ii5.webp",
    "description": "Affordable HP 15.6\" with FHD display, Core i3, and fast SSD storage.",
    "rating": 4.7,
    "reviews": 86
  },
  {
    "id": "LAP206",
    "name": "Lenovo IdeaPad Slim 3i 15.6\" Laptop, Intel Core i3-N305, 8GB RAM, 256GB SSD",
    "brand": "Lenovo",
    "category": "Electronics",
    "price": 329.00,
    "image": "electro_image/electro_image/ii6.webp",
    "description": "Slim, stylish IdeaPad with Core i3, 8GB RAM, and vibrant FHD display.",
    "rating": 4.5,
    "reviews": 594
  },
  {
    "id": "LAP207",
    "name": "ASUS CX15 15.6 inch FHD IPS Chromebook Laptop Intel Celeron N4500 4GB RAM 128GB eMMC",
    "brand": "ASUS",
    "category": "Electronics",
    "price": 159.00,
    "image": "electro_image/electro_image/ii7.webp",
    "description": "Chromebook with FHD IPS display, fast boot, and long battery life.",
    "rating": 4.3,
    "reviews": 319
  },
  {
    "id": "LAP208",
    "name": "HP 14 inch HD Windows Laptop Intel Processor N150 4GB RAM 128GB UFS Tranquil Pink",
    "brand": "HP",
    "category": "Electronics",
    "price": 179.00,
    "image": "electro_image/electro_image/ii8.webp",
    "description": "Compact HP 14\" laptop in Tranquil Pink, ideal for students and on-the-go.",
    "rating": 4.3,
    "reviews": 541
  },
  {
    "id": "LAP209",
    "name": "Acer Chromebook 315 15.6 inch Laptop Intel N4500 4GB RAM 64GB eMMC Pure Silver",
    "brand": "Acer",
    "category": "Electronics",
    "price": 174.00,
    "image": "electro_image/electro_image/ii9.webp",
    "description": "Large-screen Chromebook with all-day battery and ChromeOS simplicity.",
    "rating": 4.4,
    "reviews": 8698
  },
  {
    "id": "LAP210",
    "name": "Auusda 15.6\" Laptop Intel Alder N95, 16GB RAM, 512GB SSD, Windows 11 Pro",
    "brand": "Auusda",
    "category": "Electronics",
    "price": 286.99,
    "image": "electro_image/electro_image/ii10.webp",
    "description": "Work-ready Auusda laptop with 16GB RAM, fingerprint reader, and backlit keyboard.",
    "rating": 3.7,
    "reviews": 387
  },
  {
    "id": "LAP211",
    "name": "AEEZO 15.6 inch Laptop, 16GB RAM 512GB ROM, Intel Celeron Quad-Core, Windows 11",
    "brand": "AEEZO",
    "category": "Electronics",
    "price": 259.99,
    "image": "electro_image/electro_image/ii11.webp",
    "description": "AEEZO laptop with quad-core CPU, 16GB RAM, and a large battery for all-day use.",
    "rating": 4.6,
    "reviews": 1006
  },
  {
    "id": "LAP212",
    "name": "HP Stream 14 inch Windows Laptop Intel Processor N4120 4GB RAM 64GB eMMC Pink",
    "brand": "HP",
    "category": "Electronics",
    "price": 221.99,
    "image": "electro_image/electro_image/ii12.webp",
    "description": "HP Stream 14\" in Pink with 1-year Microsoft 365, perfect for students.",
    "rating": 4.2,
    "reviews": 20053
  },
  {
    "id": "LAP213",
    "name": "Dell Latitude 7480 Laptop Intel i5 WiFi 256GB SSD Windows 11 Professional",
    "brand": "Dell",
    "category": "Electronics",
    "price": 175.00,
    "image": "electro_image/electro_image/ii13.webp",
    "description": "Business-class Latitude with Intel i5, SSD, and professional features.",
    "rating": 3.5,
    "reviews": 84
  },
  {
    "id": "LAP214",
    "name": "ASUS ROG Strix G16 (2025) Gaming Laptop, 16” WUXDA Ryzen 9 9955HX, RTX 5060, 16GB RAM",
    "brand": "ASUS",
    "category": "Electronics",
    "price": 1399.00,
    "image": "electro_image/electro_image/ii14.webp",
    "description": "High-end gaming laptop with powerful Ryzen 9 and RTX 5060 graphics.",
    "rating": 4.5,
    "reviews": 12
  },
  {
    "id": "LAP215",
    "name": "HP 15.6\" Touchscreen Laptop for Business Student, Intel Core i3-1215U, 32GB RAM, 2TB SSD",
    "brand": "HP",
    "category": "Electronics",
    "price": 599.00,
    "image": "electro_image/electro_image/ii15.webp",
    "description": "Touchscreen HP laptop with massive RAM and SSD for ultimate multitasking.",
    "rating": 4.2,
    "reviews": 1063
  },
  {
    "id": "LAP216",
    "name": "Lenovo IdeaPad 1 Student Laptop, 15.6\" FHD, Intel Dual Core, 12GB RAM, 128GB eMMC + 256GB SSD",
    "brand": "Lenovo",
    "category": "Electronics",
    "price": 329.00,
    "image": "electro_image/electro_image/ii16.webp",
    "description": "Affordable IdeaPad for students, with dual storage and Office 365 included.",
    "rating": 4.2,
    "reviews": 134
  },
  {
    "id": "LAP217",
    "name": "HP 15.6 inch HD Windows Laptop Intel Processor N200 4GB RAM 128GB UFS Natural Silver",
    "brand": "HP",
    "category": "Electronics",
    "price": 219.00,
    "image": "electro_image/electro_image/ii17.webp",
    "description": "Reliable HP laptop with HD display and fast UFS storage.",
    "rating": 4.3,
    "reviews": 561
  },
  {
    "id": "LAP218",
    "name": "RNRUO 14 inch Windows 11 Laptops New Intel Celeron N4000 8GB RAM 256GB ROM",
    "brand": "RNRUO",
    "category": "Electronics",
    "price": 179.99,
    "image": "electro_image/electro_image/ii18.webp",
    "description": "Affordable RNRUO laptop for students and beginners with ample storage.",
    "rating": 3.7,
    "reviews": 419
  },
  {
    "id": "LAP219",
    "name": "SANPTENT 15.6 inch 1080p FHD Laptop Computer 16GB RAM 512GB SSD Intel Celeron N5095",
    "brand": "SANPTENT",
    "category": "Electronics",
    "price": 294.49,
    "image": "electro_image/electro_image/ii19.webp",
    "description": "Full HD SANPTENT laptop with 16GB RAM and fingerprint security.",
    "rating": 4.4,
    "reviews": 866
  },
  {
    "id": "LAP220",
    "name": "2025 Newest Laptop, 15.6-Inch FHD, Intel Quad Core-12th N100, 16GB RAM, 1TB ROM, Pink",
    "brand": "Generic",
    "category": "Electronics",
    "price": 349.99,
    "image": "electro_image/electro_image/ii20.webp",
    "description": "Latest 2025 laptop with 16GB RAM and 1TB storage, stylish pink finish.",
    "rating": 4.4,
    "reviews": 172
  }
];



const mobiles = [
  {
    "id": "MOB101",
    "name": "Cricket Wireless Moto G Play 2024 64GB, 4GB RAM (Prepaid) - Sapphire Blue",
    "brand": "Motorola",
    "category": "Electronics",
    "price": 29.88,
    "image": "electro_image/electro_image/p1.webp",
    "description": "Affordable prepaid Moto G Play with 64GB storage and 4GB RAM in Sapphire Blue.",
    "rating": 4.3,
    "reviews": 808
  },
  {
    "id": "MOB102",
    "name": "Straight Talk Apple iPhone 13, 128GB, Midnight - Prepaid Smartphone [Locked to Straight Talk]",
    "brand": "Apple",
    "category": "Electronics",
    "price": 199.00,
    "image": "electro_image/electro_image/p2.webp",
    "description": "iPhone 13 in Midnight, 128GB, prepaid and locked to Straight Talk.",
    "rating": 4.4,
    "reviews": 3373
  },
  {
    "id": "MOB103",
    "name": "AT&T Samsung Galaxy A15 5G, 64GB, Blue Black - Prepaid Smartphone",
    "brand": "Samsung",
    "category": "Electronics",
    "price": 49.88,
    "image": "electro_image/electro_image/p3.webp",
    "description": "Samsung Galaxy A15 5G, 64GB, Blue Black, prepaid for AT&T.",
    "rating": 4.3,
    "reviews": 243
  },
  {
    "id": "MOB104",
    "name": "Samsung Galaxy S24 Ultra 256GB US Version, Unlocked Android Smartphone - Titanium Violet",
    "brand": "Samsung",
    "category": "Electronics",
    "price": 789.97,
    "image": "electro_image/electro_image/p4.webp",
    "description": "Flagship S24 Ultra with 200MP camera, 8K video, and long battery life.",
    "rating": 4.8,
    "reviews": 18776
  },
  {
    "id": "MOB105",
    "name": "Samsung Galaxy S20+ 5G, 128GB Unlocked Smartphone, Black",
    "brand": "Samsung",
    "category": "Electronics",
    "price": 199.99,
    "image": "electro_image/electro_image/p5.webp",
    "description": "Unlocked Galaxy S20+ 5G, 128GB, Black, with triple camera and Infinity Display.",
    "rating": 4.1,
    "reviews": 919
  },
  {
    "id": "MOB106",
    "name": "Cricket Wireless Outlast 5G 128GB, 6GB RAM (Prepaid) - Midnight Majesty",
    "brand": "Cricket",
    "category": "Electronics",
    "price": 49.88,
    "image": "electro_image/electro_image/p6.webp",
    "description": "Cricket Outlast 5G with 128GB storage, 6GB RAM, and Midnight Majesty color.",
    "rating": 4.4,
    "reviews": 204
  },
  {
    "id": "MOB107",
    "name": "Straight Talk Motorola moto g 2025, 5G, 64GB, Blue - Prepaid Smartphone",
    "brand": "Motorola",
    "category": "Electronics",
    "price": 39.88,
    "image": "electro_image/electro_image/p7.webp",
    "description": "2025 Moto G with 5G, 64GB storage, and prepaid for Straight Talk.",
    "rating": 4.3,
    "reviews": 104
  },
  {
    "id": "MOB108",
    "name": "Restored Apple iPhone 12 - Fully Unlocked - 64GB Green (Refurbished)",
    "brand": "Apple",
    "category": "Electronics",
    "price": 188.67,
    "image": "electro_image/electro_image/p8.webp",
    "description": "Refurbished, fully unlocked iPhone 12 in Green, 64GB storage.",
    "rating": 4.0,
    "reviews": 8196
  },
  {
    "id": "MOB109",
    "name": "Restored Apple iPhone 14 Pro - Fully Unlocked - 128 GB Space Black (Refurbished)",
    "brand": "Apple",
    "category": "Electronics",
    "price": 461.00,
    "image": "electro_image/electro_image/p9.webp",
    "description": "Refurbished iPhone 14 Pro, fully unlocked, 128GB, Space Black.",
    "rating": 4.0,
    "reviews": 744
  },
  {
    "id": "MOB110",
    "name": "Total Wireless Motorola moto g play 2024, 64GB, CDMA LTE, Blue - Prepaid Smartphone",
    "brand": "Motorola",
    "category": "Electronics",
    "price": 29.88,
    "image": "electro_image/electro_image/p10.webp",
    "description": "Moto G Play 2024, 64GB, Blue, locked to Total Wireless.",
    "rating": 4.3,
    "reviews": 140
  },
  {
    "id": "MOB111",
    "name": "Samsung Galaxy A03s Cell Phone, Factory Unlocked Android Smartphone, 32GB, Black",
    "brand": "Samsung",
    "category": "Electronics",
    "price": 95.90,
    "image": "electro_image/electro_image/p11.webp",
    "description": "Unlocked Galaxy A03s, 32GB, triple camera, long battery life.",
    "rating": 4.2,
    "reviews": 1768
  },
  {
    "id": "MOB112",
    "name": "Walmart Family Mobile Apple iPhone 13, 128GB, 5G, Midnight - Prepaid Smartphone",
    "brand": "Apple",
    "category": "Electronics",
    "price": 249.00,
    "image": "electro_image/electro_image/p12.webp",
    "description": "iPhone 13, 128GB, 5G, Midnight, prepaid and locked to Walmart Family Mobile.",
    "rating": 4.2,
    "reviews": 257
  },
  {
    "id": "MOB113",
    "name": "Restored Apple iPhone 14 - T-Mobile - 128 GB Midnight (Refurbished)",
    "brand": "Apple",
    "category": "Electronics",
    "price": 323.29,
    "image": "electro_image/electro_image/p13.webp",
    "description": "Refurbished iPhone 14, T-Mobile, 128GB, Midnight.",
    "rating": 4.3,
    "reviews": 204
  },
  {
    "id": "MOB114",
    "name": "Straight Talk Motorola Razr 2024, 5G, 256GB, Gray - Prepaid Smartphone",
    "brand": "Motorola",
    "category": "Electronics",
    "price": 199.00,
    "image": "electro_image/electro_image/p14.webp",
    "description": "2024 Motorola Razr, 5G, 256GB, Gray, prepaid for Straight Talk.",
    "rating": 4.3,
    "reviews": 1187
  },
  {
    "id": "MOB115",
    "name": "Metro by T-Mobile TCL K23 - Prepaid Smartphone",
    "brand": "TCL",
    "category": "Electronics",
    "price": 34.88,
    "image": "electro_image/electro_image/p15.webp",
    "description": "TCL K23, prepaid and locked to Metro by T-Mobile.",
    "rating": 3.7,
    "reviews": 399
  },
  {
    "id": "MOB116",
    "name": "Walmart Family Mobile Motorola Moto G Stylus 4G (2023), 64GB, Blue - Prepaid Smartphone",
    "brand": "Motorola",
    "category": "Electronics",
    "price": 60.00,
    "image": "electro_image/electro_image/p16.webp",
    "description": "Moto G Stylus 4G (2023), 64GB, Blue, prepaid and locked to Walmart Family Mobile.",
    "rating": 3.6,
    "reviews": 179
  },
  {
    "id": "MOB117",
    "name": "Boost Mobile Summit Flip, 8GB, Black - Prepaid Phone",
    "brand": "Boost Mobile",
    "category": "Electronics",
    "price": 19.88,
    "image": "electro_image/electro_image/p17.webp",
    "description": "Summit Flip phone, 8GB, Black, prepaid and locked to Boost Mobile.",
    "rating": 3.1,
    "reviews": 139
  },
  {
    "id": "MOB118",
    "name": "Boost Mobile Samsung A15 5G 64GB",
    "brand": "Samsung",
    "category": "Electronics",
    "price": 59.99,
    "image": "electro_image/electro_image/p18.webp",
    "description": "Samsung A15 5G, 64GB, prepaid and locked to Boost Mobile.",
    "rating": 4.5,
    "reviews": 28
  },
  {
    "id": "MOB119",
    "name": "Walmart Family Mobile Samsung Galaxy A15, 64GB, 5G, Black - Prepaid Smartphone",
    "brand": "Samsung",
    "category": "Electronics",
    "price": 39.88,
    "image": "electro_image/electro_image/p19.webp",
    "description": "Samsung Galaxy A15, 64GB, 5G, Black, prepaid and locked to Walmart Family Mobile.",
    "rating": 4.6,
    "reviews": 52
  },
  {
    "id": "MOB120",
    "name": "Straight Talk Moto G Power 5G 2024, 128GB, Black - Prepaid Smartphone",
    "brand": "Motorola",
    "category": "Electronics",
    "price": 84.00,
    "image": "electro_image/electro_image/p20.webp",
    "description": "Moto G Power 5G 2024, 128GB, Black, prepaid and locked to Straight Talk.",
    "rating": 4.1,
    "reviews": 3680
  }
];

export default {
  laptops,
  mobiles
};