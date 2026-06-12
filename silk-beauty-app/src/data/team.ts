import type { Locale } from '../types';

export interface Certification {
  title: string;
  issuer?: string;
  year?: number;
}

export interface Specialist {
  id: string;
  name: string;
  role: Record<Locale, string>;
  bio: Record<Locale, string>;
  photoUrl: string;
  instagram?: string;
  specialties: string[];
  certifications: Certification[];
  languages: string[];
  yearsExperience?: number;
}

export const specialists: Specialist[] = [
  {
    id: '1',
    name: 'Dr. Nino Kapanadze',
    role: {
      en: 'Aesthetic Doctor',
      ka: 'ესთეტიკური ექიმი',
      ru: 'Врач эстетической медицины',
      he: 'רופא אסתטי',
      ar: 'طبيب تجميل',
      tr: 'Estetik Doktoru',
    },
    bio: {
      en: 'Board-certified aesthetic doctor with 15 years of experience in facial harmonization and non-surgical rejuvenation. Trained in Paris and London.',
      ka: 'სერთიფიცირებული ესთეტიკური ექიმი 15 წლიანი გამოცდილებით სახის ჰარმონიზაციასა და უქირურგიო რეჟუვენაციაში. გაწვრთნილი პარიზსა და ლონდონში.',
      ru: 'Сертифицированный врач эстетической медицины с 15-летним опытом в гармонизации лица и безоперационном омоложении. Обучалась в Париже и Лондоне.',
      he: 'רופא אסתטי מוסמך עם 15 שנות ניסיון בהרמוניזציה פנים ומיצוק ללא ניתוח. התמחתה בפריז ובלונדון.',
      ar: 'طبيب تجميل معتمد مع 15 عاما من الخبرة في توازن الوجه والتجديد غير الجراحي. تدربت في باريس ولندن.',
      tr: 'Paris ve Londra da egitim almis, yuz uyumlandirma ve cerrahi olmayan genclestirmede 15 yillik deneyime sahip estetik doktoru.',
    },
    photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=900&h=1100&fit=crop',
    instagram: 'https://instagram.com/dr_nino',
    specialties: ['injectables', 'skin'],
    certifications: [
      { title: 'Diploma in Aesthetic Medicine', issuer: 'University of Paris', year: 2009 },
      { title: 'Advanced Botox Certification', issuer: 'Allergan', year: 2015 },
    ],
    languages: ['en', 'ka', 'ru', 'fr'],
    yearsExperience: 15,
  },
  {
    id: '2',
    name: 'Mariam Gvasalia',
    role: {
      en: 'Master Lash Artist',
      ka: 'მასტერ წამწამების სპეციალისტი',
      ru: 'Мастер по наращиванию ресниц',
      he: 'מאסטרית ריסים',
      ar: 'خبيرة رموش',
      tr: 'Kirpik Uzmani',
    },
    bio: {
      en: 'Internationally certified lash artist specializing in Russian Volume and Mega Volume techniques. Over 10,000 satisfied clients.',
      ka: 'საერთაშორისოდ სერთიფიცირებული წამწამების სპეციალისტი. სპეციალიზაცია რუსულ ვოლუმსა და მეგა ვოლუმში. 10,000-ზე მეტი კმაყოფილი კლიენტი.',
      ru: 'Международно сертифицированный мастер по наращиванию ресниц, специализирующийся на Russian Volume и Mega Volume. Более 10 000 довольных клиентов.',
      he: 'מאסטרית ריסים בעלת תעודה בינלאומית, מתמחה בטכניקות Russian Volume ו-Mega Volume. למעלה מ-10,000 לקוחות מרוצים.',
      ar: 'خبيرة رموش معتمدة دوليا متخصصة في Russian Volume و Mega Volume. أكثر من 10,000 عميل راض.',
      tr: 'Russian Volume ve Mega Volume tekniklerinde uzmanlasmis uluslararasi sertifikali kirpik uzmani. 10.000 den fazla memnun musteri.',
    },
    photoUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=900&h=1100&fit=crop',
    instagram: 'https://instagram.com/mariam_lashes',
    specialties: ['lashes'],
    certifications: [
      { title: 'Russian Volume Master', issuer: 'Lash Inc', year: 2018 },
      { title: 'Mega Volume Advanced', issuer: 'London Lash Pro', year: 2020 },
    ],
    languages: ['en', 'ka', 'ru', 'he'],
    yearsExperience: 8,
  },
  {
    id: '3',
    name: 'Sophie Ben-David',
    role: {
      en: 'Senior Hair Stylist',
      ka: 'უფროსი სტილისტი',
      ru: 'Старший стилист',
      he: 'סטייליסטית בכירה',
      ar: 'أخصائية شعر أولى',
      tr: 'Kidemli Sac Stilisti',
    },
    bio: {
      en: 'Celebrity hair stylist from Tel Aviv with expertise in balayage, precision cuts, and bridal styling. Vidal Sassoon trained.',
      ka: 'ვარსკვლავური სტილისტი თელ ავივიდან, ექსპერტი ბალაიაჟში, ზუსტ შეჭრასა და საქორწილო სტილში.',
      ru: 'Знаменитый стилист из Тель-Авива, эксперт в балаяже, точных стрижках и свадебных укладках. Обучалась в Vidal Sassoon.',
      he: 'מעצבת שיער למפורסמים מתל אביב, מומחית בבליאז, קיצוץ מדויק ועיצוב כלות. הוכשרה ב-Vidal Sassoon.',
      ar: 'أخصائية شعر للمشاهير من تل أبيب، خبيرة في البلياج والقصات الدقيقة وتصفيف العرائس.',
      tr: 'Tel Aviv den unlu sac stilisti; balayage, hassas kesimler ve gelin stilinde uzman. Vidal Sassoon egitimli.',
    },
    photoUrl: 'https://images.unsplash.com/photo-1580619301858-30f7f0f5d4b2?w=900&h=1100&fit=crop',
    instagram: 'https://instagram.com/sophie_hair',
    specialties: ['hair'],
    certifications: [
      { title: 'Precision Cutting', issuer: 'Vidal Sassoon', year: 2012 },
      { title: 'Advanced Color', issuer: 'Wella', year: 2016 },
    ],
    languages: ['en', 'he', 'fr'],
    yearsExperience: 12,
  },
  {
    id: '4',
    name: 'Ana Beridze',
    role: {
      en: 'Nail Artist & Educator',
      ka: 'ფრჩხილების მხატვარი',
      ru: 'Мастер маникюра',
      he: 'מעצבת ציפורניים',
      ar: 'فنانة أظافر',
      tr: 'Nail Artisti',
    },
    bio: {
      en: 'Award-winning nail artist specializing in Russian manicure, nail art, and gel extensions. Educator and competition judge.',
      ka: 'ჯილდოს მფლობელი ფრჩხილების მხატვარი. სპეციალიზაცია რუსულ მანიკურში, ფრჩხილების ხელოვნებასა და გელის გაგრძელებაში.',
      ru: 'Награжденный мастер маникюра, специализирующийся на русском маникюре, нейл-арте и гелевых наращиваниях.',
      he: 'מעצבת ציפורניים זוכת פרסים, מתמחה במניקור רוסי, אמנות ציפורניים והארכות ג׳ל.',
      ar: 'فنانة أظافر حائزة على جوائز، متخصصة في المانيكير الروسي وفن الأظافر والتمديدات بالجل.',
      tr: 'Odullu nail artist; Rus manikuru, tirnak sanati ve jel uzatmalarda uzman.',
    },
    photoUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc4d9f7d?w=900&h=1100&fit=crop',
    instagram: 'https://instagram.com/ana_nails',
    specialties: ['nails'],
    certifications: [
      { title: 'Russian Manicure Master', issuer: 'Nail Academy Moscow', year: 2019 },
      { title: 'Nail Art Competition Winner', issuer: 'International Nail Expo', year: 2021 },
    ],
    languages: ['en', 'ka', 'ru'],
    yearsExperience: 6,
  },
];
