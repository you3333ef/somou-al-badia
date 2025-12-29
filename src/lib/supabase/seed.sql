-- Seed data for Somou Al-Badia
-- Run this after schema.sql

-- Insert sample tents with REAL Unsplash images
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
    'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1200&q=80',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
    'https://images.unsplash.com/photo-1602391833977-358a52198938?w=1200&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80'
  ],
  'https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d',
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
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
    'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80',
    'https://images.unsplash.com/photo-1602391833977-358a52198938?w=1200&q=80'
  ],
  null,
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
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80',
    'https://images.unsplash.com/photo-1602391833977-358a52198938?w=1200&q=80'
  ],
  null,
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
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
    'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80',
    'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80'
  ],
  null,
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
    'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80',
    'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80'
  ],
  null,
  false
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
    'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1200&q=80',
    'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80'
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
    'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1200&q=80'
  ],
  null,
  false
),

-- One more luxury for variety
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
    'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1200&q=80',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
    'https://images.unsplash.com/photo-1602391833977-358a52198938?w=1200&q=80'
  ],
  null,
  true
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
