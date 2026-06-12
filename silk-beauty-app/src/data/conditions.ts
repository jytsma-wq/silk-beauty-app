import type { LocalizedText } from '../types';

export interface SkinCondition {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  recommendedTreatments: string[];
  tips: string[];
}

export const skinConditions: SkinCondition[] = [
  {
    id: 'dry',
    title: {
      en: 'Dry Skin',
      ka: 'მშრალი კანი',
      ru: 'Сухая кожа',
      he: 'עור יבש',
      ar: 'البشرة الجافة',
      tr: 'Kuru Cilt',
    },
    description: {
      en: 'Needs intensive hydration and barrier repair.',
      ka: 'საჭიროებს ინტენსიურ დატენიანებას და ბარიერის აღდგენას.',
      ru: 'Нуждается в интенсивном увлажнении и восстановлении барьера.',
      he: 'זקוק ללחות אינטנסיבית ושיקום מחסום העור.',
      ar: 'تحتاج إلى ترطيب مكثف وإصلاح حاجز البشرة.',
      tr: 'Yogun nemlendirme ve bariyer onarimi gerekir.',
    },
    recommendedTreatments: ['HydraFacial', 'Skin Boosters', 'Mesotherapy', 'BioRePeel'],
    tips: ['Gentle cream cleanser', 'Hyaluronic acid serum', 'Monthly hydrating facial'],
  },
  {
    id: 'oily',
    title: {
      en: 'Oily Skin',
      ka: 'ცხიმოვანი კანი',
      ru: 'Жирная кожа',
      he: 'עור שמן',
      ar: 'البشرة الدهنية',
      tr: 'Yagli Cilt',
    },
    description: {
      en: 'Control excess sebum while keeping the skin hydrated.',
      ka: 'აკონტროლეთ სებუმი კანის გამოშრობის გარეშე.',
      ru: 'Контроль себума без пересушивания кожи.',
      he: 'איזון עודפי שומן תוך שמירה על לחות.',
      ar: 'التحكم في الدهون الزائدة مع الحفاظ على الترطيب.',
      tr: 'Cildi kurutmadan fazla sebumu dengelemeye odaklanir.',
    },
    recommendedTreatments: ['Chemical Peel', 'Microneedling', 'HydraFacial', 'LED Therapy'],
    tips: ['Salicylic acid care', 'Oil-free hydration', 'Regular exfoliation'],
  },
  {
    id: 'aging',
    title: {
      en: 'Fine Lines & Aging',
      ka: 'ნაოჭები და დაბერება',
      ru: 'Морщины и возрастные изменения',
      he: 'קמטים וסימני גיל',
      ar: 'الخطوط الدقيقة والتقدم في العمر',
      tr: 'Ince Cizgiler ve Yaslanma',
    },
    description: {
      en: 'Focuses on softening lines, restoring glow, and preserving natural expression.',
      ka: 'ფოკუსი ხაზების დარბილებაზე, ბრწყინვალების აღდგენასა და ბუნებრივ გამომეტყველებაზე.',
      ru: 'Смягчает линии, возвращает сияние и сохраняет естественную мимику.',
      he: 'התמקדות בריכוך קמטים, החזרת זוהר ושמירה על הבעה טבעית.',
      ar: 'يركز على تنعيم الخطوط واستعادة الإشراق والحفاظ على التعبير الطبيعي.',
      tr: 'Cizgileri yumusatmaya, isiltiyi geri kazandirmaya ve dogal ifadeyi korumaya odaklanir.',
    },
    recommendedTreatments: ['Botox', 'Fillers', 'Skin Boosters', 'RF Treatment'],
    tips: ['Daily SPF', 'Peptide-rich care', 'Consultation-led plan'],
  },
  {
    id: 'acne',
    title: {
      en: 'Acne & Breakouts',
      ka: 'აკნე და გამონაყარი',
      ru: 'Акне и высыпания',
      he: 'אקנה ופצעונים',
      ar: 'حب الشباب والبثور',
      tr: 'Akne ve Sivilceler',
    },
    description: {
      en: 'Calms congestion, supports healing, and improves post-acne texture.',
      ka: 'ამშვიდებს ჩახერგვას, ეხმარება შეხორცებას და აუმჯობესებს ტექსტურას.',
      ru: 'Уменьшает воспаления, поддерживает заживление и улучшает текстуру после акне.',
      he: 'מרגיע עומס בעור, תומך בהחלמה ומשפר מרקם אחרי אקנה.',
      ar: 'يهدئ الاحتقان ويدعم التعافي ويحسن ملمس آثار الحبوب.',
      tr: 'Tikanikligi yatistirir, iyilesmeyi destekler ve akne sonrasi dokuyu iyilestirir.',
    },
    recommendedTreatments: ['Chemical Peel', 'LED Therapy', 'Extraction Facial'],
    tips: ['Avoid over-scrubbing', 'Use non-comedogenic SPF', 'Plan a treatment series'],
  },
  {
    id: 'pigmentation',
    title: {
      en: 'Pigmentation',
      ka: 'პიგმენტაცია',
      ru: 'Пигментация',
      he: 'פיגמנטציה',
      ar: 'التصبغات',
      tr: 'Pigmentasyon',
    },
    description: {
      en: 'Targets dark spots, uneven tone, and sun-related discoloration.',
      ka: 'მიმართულია მუქ ლაქებზე, არათანაბარ ტონსა და მზისგან ფერის ცვლილებაზე.',
      ru: 'Работает с темными пятнами, неровным тоном и изменениями после солнца.',
      he: 'מטפל בכתמים כהים, גוון לא אחיד ושינויי צבע מהשמש.',
      ar: 'يستهدف البقع الداكنة وتفاوت اللون والتصبغ الناتج عن الشمس.',
      tr: 'Koyu lekeler, esit olmayan ton ve gunes kaynakli renk degisimini hedefler.',
    },
    recommendedTreatments: ['Chemical Peel', 'Laser Treatment', 'Vitamin C Infusion'],
    tips: ['Strict SPF', 'Brightening serum', 'Avoid sun after peels'],
  },
  {
    id: 'pores',
    title: {
      en: 'Large Pores & Texture',
      ka: 'ფორები და ტექსტურა',
      ru: 'Расширенные поры и текстура',
      he: 'נקבוביות ומרקם',
      ar: 'المسام الواسعة والملمس',
      tr: 'Genis Gozenekler ve Doku',
    },
    description: {
      en: 'Refines visible pores and smooths uneven skin texture.',
      ka: 'ამცირებს შესამჩნევ ფორებს და არბილებს არათანაბარ ტექსტურას.',
      ru: 'Сужает видимые поры и выравнивает текстуру кожи.',
      he: 'מצמצם נקבוביות נראות לעין ומחליק מרקם לא אחיד.',
      ar: 'ينعم ملمس البشرة ويقلل مظهر المسام.',
      tr: 'Gorunur gozenekleri inceltir ve esit olmayan cilt dokusunu puruzsuzlestirir.',
    },
    recommendedTreatments: ['HydraFacial', 'Chemical Peel', 'Microneedling'],
    tips: ['Consistent exfoliation', 'Do not skip moisturizer', 'Monthly maintenance'],
  },
];
