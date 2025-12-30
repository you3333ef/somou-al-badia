-- Seed data for Somou Al-Badia
-- Run this after schema.sql

-- Insert sample tents with REAL uploaded images
INSERT INTO tents (name_en, name_ar, slug, description_en, description_ar, category, capacity, area_sqm, price_per_night, features_en, features_ar, amenities_en, amenities_ar, images, video_url, is_featured) VALUES

-- Royal Category
(
  'Royal Desert Palace',
  'قصر الصحراء الملكي',
  'royal-desert-palace',
  'Experience unparalleled luxury in our flagship royal tent. This magnificent structure features hand-woven carpets, crystal chandeliers, and panoramic desert views. Perfect for VIP guests seeking the ultimate desert experience.',
  'اختبر الفخامة التي لا مثيل لها في خيمتنا الملكية الرئيسية. يحتوي هذا الهيكل الرائع على سجاد منسوج يدويًا وثريات كريستالية ومناظر بانورامية للصحراء.',
  'royal',
  12,
  250.00,
  3500.00,
  ARRAY['Private majlis', 'King-size beds', 'Ensuite bathrooms', '24/7 butler service', 'Private chef', 'Outdoor firepit lounge'],
  ARRAY['مجلس خاص', 'أسرة كينج سايز', 'حمامات خاصة', 'خدمة خادم على مدار الساعة', 'طاه خاص', 'صالة نار خارجية'],
  ARRAY['WiFi', 'AC', 'Heating', 'Smart TV', 'Sound system', 'Coffee machine', 'Mini bar', 'Safe'],
  ARRAY['واي فاي', 'تكييف', 'تدفئة', 'تلفزيون ذكي', 'نظام صوتي', 'آلة قهوة', 'ميني بار', 'خزنة'],
  ARRAY[
    '/tents/IMG-20251228-WA0099.jpg',
    '/tents/IMG-20251228-WA0100.jpg',
    '/tents/IMG-20251228-WA0101.jpg',
    '/tents/IMG-20251228-WA0143.jpg'
  ],
  '/videos/VID-20251228-WA0172.mp4',
  true
),

-- Luxury Category
(
  'Golden Sands Suite',
  'جناح الرمال الذهبية',
  'golden-sands-suite',
  'A luxurious retreat blending traditional Bedouin aesthetics with modern comfort. Features include premium furnishings, ambient lighting, and a private outdoor seating area with fire pit.',
  'ملاذ فاخر يمزج بين الجماليات البدوية التقليدية والراحة الحديثة. تشمل المرافق أثاثًا فاخرًا وإضاءة محيطية ومنطقة جلوس خارجية خاصة.',
  'luxury',
  8,
  180.00,
  2200.00,
  ARRAY['Queen-size beds', 'Private bathroom', 'Seating majlis', 'Outdoor terrace', 'BBQ area', 'Stargazing deck'],
  ARRAY['أسرة كوين سايز', 'حمام خاص', 'مجلس جلوس', 'شرفة خارجية', 'منطقة شواء', 'سطح مراقبة النجوم'],
  ARRAY['WiFi', 'AC', 'Heating', 'LED TV', 'Bluetooth speaker', 'Tea set', 'Refrigerator'],
  ARRAY['واي فاي', 'تكييف', 'تدفئة', 'تلفزيون LED', 'سماعة بلوتوث', 'طقم شاي', 'ثلاجة'],
  ARRAY[
    '/tents/IMG-20251228-WA0141.jpg',
    '/tents/IMG-20251228-WA0142.jpg',
    '/tents/IMG-20251228-WA0144.jpg',
    '/tents/IMG-20251228-WA0145.jpg'
  ],
  '/videos/VID-20251228-WA0173.mp4',
  true
),

(
  'Moonlight Oasis',
  'واحة ضوء القمر',
  'moonlight-oasis',
  'Immerse yourself in tranquility under the desert sky. This luxury tent offers a perfect balance of privacy and comfort with elegant interiors and a dedicated outdoor lounge area.',
  'انغمس في الهدوء تحت سماء الصحراء. توفر هذه الخيمة الفاخرة توازنًا مثاليًا بين الخصوصية والراحة مع تصميمات داخلية أنيقة.',
  'luxury',
  6,
  150.00,
  1900.00,
  ARRAY['Queen-size beds', 'Private bathroom', 'Lounge area', 'Outdoor seating', 'Fire pit'],
  ARRAY['أسرة كوين سايز', 'حمام خاص', 'منطقة استراحة', 'جلسة خارجية', 'موقد نار'],
  ARRAY['WiFi', 'AC', 'Heating', 'TV', 'Speaker', 'Mini fridge'],
  ARRAY['واي فاي', 'تكييف', 'تدفئة', 'تلفزيون', 'سماعة', 'ثلاجة صغيرة'],
  ARRAY[
    '/tents/IMG-20251228-WA0146.jpg',
    '/tents/IMG-20251228-WA0147.jpg',
    '/tents/IMG-20251228-WA0148.jpg'
  ],
  '/videos/VID-20251228-WA0174.mp4',
  false
),

-- Premium Category
(
  'Desert Breeze Haven',
  'ملاذ نسيم الصحراء',
  'desert-breeze-haven',
  'A premium camping experience designed for families and groups. Spacious interiors with comfortable bedding, shared majlis area, and modern amenities ensure a memorable stay.',
  'تجربة تخييم متميزة مصممة للعائلات والمجموعات. تصميمات داخلية واسعة مع أسرة مريحة ومنطقة مجلس مشتركة.',
  'premium',
  6,
  120.00,
  1200.00,
  ARRAY['Double beds', 'Shared bathroom', 'Majlis area', 'Outdoor space'],
  ARRAY['أسرة مزدوجة', 'حمام مشترك', 'منطقة مجلس', 'مساحة خارجية'],
  ARRAY['WiFi', 'AC', 'Heating', 'Fan', 'Cooler'],
  ARRAY['واي فاي', 'تكييف', 'تدفئة', 'مروحة', 'مبرد'],
  ARRAY[
    '/tents/IMG-20251228-WA0149.jpg',
    '/tents/IMG-20251228-WA0150.jpg',
    '/tents/IMG-20251228-WA0151.jpg'
  ],
  '/videos/VID-20251229-WA0043.mp4',
  false
),

(
  'Starlight Sanctuary',
  'محمية ضوء النجوم',
  'starlight-sanctuary',
  'Escape to comfort in the heart of the desert. This premium tent offers cozy accommodations with traditional Bedouin-style furnishings and a welcoming atmosphere.',
  'اهرب إلى الراحة في قلب الصحراء. توفر هذه الخيمة المتميزة مساكن مريحة مع أثاث على الطراز البدوي التقليدي.',
  'premium',
  5,
  100.00,
  1000.00,
  ARRAY['Double beds', 'Shared facilities', 'Majlis seating', 'Outdoor area'],
  ARRAY['أسرة مزدوجة', 'مرافق مشتركة', 'جلسة مجلس', 'منطقة خارجية'],
  ARRAY['WiFi', 'AC', 'Fan', 'Lighting'],
  ARRAY['واي فاي', 'تكييف', 'مروحة', 'إضاءة'],
  ARRAY[
    '/tents/IMG-20251228-WA0152.jpg',
    '/tents/IMG-20251228-WA0153.jpg'
  ],
  null,
  false
),

-- Glass Pavilion (Premium/Luxury)
(
  'Crystal Sky Pavilion',
  'جناح السماء الكريستالية',
  'crystal-sky-pavilion',
  'A stunning glass-enclosed structure offering panoramic views and modern luxury. Perfect for those who want to experience the outdoors with complete comfort and climate control.',
  'هيكل زجاجي مذهل يوفر مناظر بانورامية وفخامة حديثة. مثالي لمن يرغب في تجربة الهواء الطلق مع راحة كاملة والتحكم في المناخ.',
  'luxury',
  8,
  160.00,
  2400.00,
  ARRAY['Luxury seating', 'Glass walls', 'Climate control', 'Premium flooring', 'Ambient lighting', 'Privacy features'],
  ARRAY['جلسات فاخرة', 'جدران زجاجية', 'تحكم بالمناخ', 'أرضيات فاخرة', 'إضاءة محيطية', 'ميزات خصوصية'],
  ARRAY['WiFi', 'AC', 'Heating', 'Smart lighting', 'Sound system', 'Mini bar'],
  ARRAY['واي فاي', 'تكييف', 'تدفئة', 'إضاءة ذكية', 'نظام صوتي', 'ميني بار'],
  ARRAY[
    '/tents/IMG-20251228-WA0155.jpg',
    '/tents/IMG-20251228-WA0156.jpg',
    '/tents/IMG-20251228-WA0157.jpg',
    '/tents/IMG-20251228-WA0158.jpg'
  ],
  '/videos/VID-20251228-WA0175.mp4',
  true
),

-- Standard Category
(
  'Nomad Nest',
  'عش البدوي',
  'nomad-nest',
  'An authentic desert camping experience perfect for adventurers. Simple yet comfortable setup with essential amenities and a true taste of Bedouin hospitality.',
  'تجربة تخييم صحراوية أصيلة مثالية للمغامرين. إعداد بسيط ولكنه مريح مع وسائل الراحة الأساسية.',
  'standard',
  4,
  70.00,
  600.00,
  ARRAY['Twin beds', 'Shared facilities', 'Basic seating', 'Outdoor space'],
  ARRAY['أسرة توأم', 'مرافق مشتركة', 'جلسة أساسية', 'مساحة خارجية'],
  ARRAY['Lighting', 'Fan', 'Cooler'],
  ARRAY['إضاءة', 'مروحة', 'مبرد'],
  ARRAY[
    '/tents/IMG-20251228-WA0159.jpg',
    '/tents/IMG-20251228-WA0160.jpg'
  ],
  null,
  false
),

(
  'Dune Dweller',
  'ساكن الكثبان',
  'dune-dweller',
  'Experience the raw beauty of desert camping with our standard tent. Ideal for budget-conscious travelers seeking adventure and natural landscapes.',
  'اختبر الجمال الخام للتخييم الصحراوي مع خيمتنا القياسية. مثالية للمسافرين الذين يبحثون عن المغامرة.',
  'standard',
  3,
  50.00,
  450.00,
  ARRAY['Twin beds', 'Shared facilities', 'Basic setup'],
  ARRAY['أسرة توأم', 'مرافق مشتركة', 'إعداد أساسي'],
  ARRAY['Lighting', 'Fan'],
  ARRAY['إضاءة', 'مروحة'],
  ARRAY[
    '/tents/IMG-20251228-WA0161.jpg'
  ],
  null,
  false
),

-- Rooftop Lounge (Luxury)
(
  'Sahara Crown',
  'تاج الصحراء',
  'sahara-crown',
  'A crown jewel of desert luxury. Featuring expansive living spaces, premium materials, and impeccable service. Perfect for special celebrations and gatherings.',
  'جوهرة تاج الفخامة الصحراوية. يتميز بمساحات معيشة واسعة ومواد فاخرة وخدمة لا تشوبها شائبة.',
  'luxury',
  10,
  200.00,
  2800.00,
  ARRAY['King & Queen beds', 'Private bathrooms', 'Large majlis', 'Entertainment area', 'BBQ terrace', 'Fire pit lounge'],
  ARRAY['أسرة كينج وكوين', 'حمامات خاصة', 'مجلس كبير', 'منطقة ترفيه', 'شرفة شواء', 'صالة موقد نار'],
  ARRAY['WiFi', 'AC', 'Heating', 'Smart TV', 'Sound system', 'Coffee station', 'Full kitchen', 'Bar'],
  ARRAY['واي فاي', 'تكييف', 'تدفئة', 'تلفزيون ذكي', 'نظام صوتي', 'محطة قهوة', 'مطبخ كامل', 'بار'],
  ARRAY[
    '/tents/IMG-20251228-WA0162.jpg',
    '/tents/IMG-20251228-WA0163.jpg',
    '/tents/IMG-20251228-WA0164.jpg',
    '/tents/IMG-20251228-WA0165.jpg',
    '/tents/IMG-20251228-WA0140.jpg'
  ],
  '/videos/VID-20251229-WA0042.mp4',
  true
),

-- Additional Premium Options
(
  'Desert Garden Retreat',
  'منتجع حديقة الصحراء',
  'desert-garden-retreat',
  'Modern outdoor living spaces with beautiful landscaping and contemporary design. Features premium seating areas and sophisticated outdoor amenities.',
  'مساحات معيشة خارجية حديثة مع تنسيق حدائق جميل وتصميم معاصر. يتميز بمناطق جلوس فاخرة ووسائل راحة خارجية متطورة.',
  'premium',
  6,
  130.00,
  1400.00,
  ARRAY['Modern design', 'Garden setting', 'Premium seating', 'Outdoor lounge'],
  ARRAY['تصميم حديث', 'بيئة حديقة', 'جلسات فاخرة', 'صالة خارجية'],
  ARRAY['WiFi', 'AC', 'Lighting', 'Sound system'],
  ARRAY['واي فاي', 'تكييف', 'إضاءة', 'نظام صوتي'],
  ARRAY[
    '/tents/IMG-20251228-WA0166.jpg',
    '/tents/IMG-20251228-WA0167.jpg',
    '/tents/IMG-20251228-WA0168.jpg'
  ],
  '/videos/VID-20251229-WA0044.mp4',
  false
);

-- Add some sample availability (block out some dates for testing)
INSERT INTO availability (tent_id, date, is_available)
SELECT 
  id,
  generate_series(
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '90 days',
    '1 day'::interval
  )::date,
  true
FROM tents;

-- Block some random dates for the first tent (for testing)
UPDATE availability
SET is_available = false
WHERE tent_id = (SELECT id FROM tents LIMIT 1)
AND date IN (
  CURRENT_DATE + INTERVAL '5 days',
  CURRENT_DATE + INTERVAL '6 days',
  CURRENT_DATE + INTERVAL '15 days'
);
