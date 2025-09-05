import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'ar' | 'en';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    about: 'من نحن',
    services: 'الخدمات',
    doctors: 'الأطباء',
    contact: 'اتصل بنا',
    bookAppointment: 'احجز موعد',
    
    // Doctor Profile
    orthopedicSurgeon: 'أخصائي جراحة العظام والمفاصل',
    rating: 'التقييم',
    location: 'الموقع',
    ammanFifthCircle: 'عمّان - الدوار الخامس',
    price: 'السعر',
    jordanianDinar: 'دينار أردني',
    homeVisit: 'زيارة منزلية',
    waitingTime: 'مدة الانتظار',
    minutes: 'دقيقة',
    phoneNumber: 'رقم الهاتف',
    directBooking: 'للحجز المباشر',
    specializations: 'التخصصات',
    aboutMe: 'نبذة عني',
    educationalCertificates: 'الشهادات التعليمية والعضوية المهنية',
    treatedConditions: 'الأعراض والحالات الصحية التي يعالجها الدكتور',
    treatments: 'العلاجات',
    servicesOffered: 'الخدمات',
    insurance: 'التأمين',
    
    // Booking
    bookingTitle: 'احجز موعدك',
    visitType: 'نوع الزيارة',
    clinicVisit: 'زيارة العيادة',
    selectDate: 'اختر التاريخ',
    selectTime: 'اختر الوقت',
    bookingConfirmed: 'تم تأكيد الحجز',
    confirmationEmail: 'سيتم إرسال رسالة تأكيد عبر البريد الإلكتروني',
    
    // Personal Info
    personalInfo: 'المعلومات الشخصية',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    relationship: 'صلة قرابة المريض بك',
    paymentMethod: 'طريقة الدفع',
    selectInsurance: 'اختر التأمين',
    termsConditions: 'الأحكام والشروط',
    acceptTerms: 'لقد قرأت وأقبل',
    confirmBooking: 'تأكيد الحجز',
    insurance: 'تأمين',
    cash: 'نقداً',
    selectInsurance: 'اختر شركة التأمين',
    
    // Booking Summary
    bookingSummary: 'ملخص الحجز',
    date: 'التاريخ',
    time: 'الوقت',
    consultationType: 'نوع الاستشارة',
    changeTime: 'اختر وقت آخر'
      
    //Insurance Companies
    insuranceCompanies: {
      natHealth: 'نات هيلث',
      jordanActorsSyndicate: 'نقابة الفنانين الأردنيين',
      arabInsurance: 'العرب للتأمين',
      wataniyaInsurance: 'الوطنية للتامين',
      alDamenoonArab: 'الضامنون العرب',
      middleEastInsurance: 'الشرق الأوسط للتأمين',
      yarmoukInsurance: 'شركة اليرموك للتأمين',
      mutahInsurance: 'المتحدة للتأمين',
      socialSecurity: 'المؤسسة العامه للضمان الاجتماعي',
      emiratesScope: 'الاماراتية سكوب',
      royalCare: 'رويال كير',
      philadelphiaInsurance: 'فيلادلفيا للتامين',
      lawyersSyndicate: 'نقابة المحامين',
      centralBank: 'البنك المركزي الاردني',
      housingBank: 'بنك الاسكان',
      jorasaInsurance: 'جراسا للتأمين',
      alManaraInsurance: 'المنارة للتأمين',
      jordanianFrenchInsurance: 'الأردنية الفرنسية للتأمين',
      alIsraaUniversity: 'جامعة الاسراء',
      nationalElectricity: 'شركة الكهرباء الوطنية',
      medVis: 'ميد فيز',
      amdNet: 'امد نت',
      medex: 'ميدكس',
      amedService: 'اميد سيرفس',
      jordanElectricity: 'الكهرباء الأردنية',
      jordanPhosphate: 'شركة الفوسفات الأردنية',
      jordanOilRefinery: 'شركة مصفاة البترول الأردنية',
      jordanCommercialBank: 'البنك التجاري الأردني',
      dentistsSyndicate: 'نقابة الاسنان',
      jordanBank: 'بنك الأردن',
      alQudsInsurance: 'القدس للتأمين',
      holyLandsInsurance: 'الأراضي المقدسة للتأمين',
      globMed: 'غلوب ميد',
      deltaInsurance: 'دلتا للتأمين',
      doctorsSyndicate: 'نقابة الأطباء الأردنيين',
      jordanInsurance: 'شركة التأمين الأردنية',
      jordanEmiratesScope: 'الشركة الاردنية الاماراتية للتأمين سكوب',
      newton: 'نيوتن',
      alAlBaytUniversity: 'جامعة ال البيت',
      globalCompanyInsurance: 'تأمين الشركة العالمية',
      arabUnionInsurance: 'الاتحاد العربي الدولي للتأمين',
      potash: 'البوتاس',
      arabJordanianInsurance: 'المجموعة العربية الأردنية للتأمين',
      germanArabInsurance: 'العربية الألمانية للتأمين',
      arabBank: 'البنك العربي',
      arabEagleInsurance: 'النسر العربي للتأمين',
      alBarakaTakaful: 'البركة للتكافل',
      arabEuroInsurance: 'المجموعة العربية الأوروبية للتأمين',
      jordanInternationalInsurance: 'الأردن الدولية للتأمين',
      engineersSyndicate: 'نقابة المهندسين',
      alAwlaInsurance: 'الأولى للتأمين',
      arabEastInsurance: 'الشرق العربي للتأمين',
      medGulfInsurance: 'المتوسط والخليج للتأمين-ميدغلف',
      americanLifeInsurance: 'الأمريكية للتأمين على الحياة-اليكو',
      arabGeneralInsurance: 'شركة التامين العامة العربية المساهمة المحدودة',
      electricityGeneration: 'شركة توليد الكهرباء',
      samraElectricity: 'شركة كهرباء السمرا',
      irbidElectricity: 'شركة كهرباء إربد',
      jordanInternationalInsurance2: 'شركة الأردن الدولية للتأمين',
      islamicInsurance: 'شركة التأمين الإسلامية',
      arabicInsurance: 'شركة التأمين العربية',
      orthodoxCultureAssociation: 'جمعية الثقافة و التعليم الأرثذوكسية',
      bupaInsurance: 'شركة بوبا للتأمين',
      unionSchoolsInsurance: 'تأمين مدارس الإتحاد',
      istishariHospitalInsurance: 'تأمين مستشفى الإستشاري',
      khalidiHospitalInsurance: 'تأمين مستشفى الخالدي',
      ibnAlHaythamHospitalInsurance: 'تأمين مستشفى إبن الهيثم',
      natHealthElectricityDistribution: 'توزيع الكهرباء -نات هيلث',
      alIsraaUniversity2: 'جامعة الإسراء',
      balqaAppliedUniversity: 'جامعة البلقاء التطبيقية',
      islamicScienceUniversity: 'جامعة العلوم الإسلامية',
      yarmoukUniversity: 'جامعة اليرموك',
      omniCare: 'اومني كير',
      optima: 'أوبتما',
      nationalCables: 'الوطنية لصناعة الكوابل والأسلاك',
      specializedInsuranceManagement: 'الملكية المتخصصة لإدارة التأمينات',
      medicalExpensesManagement: 'المتضامنون لاداره النفقات الطبيه',
      arabCementCompany: 'الشركة العربية لصناعة الاسمنت الابيض',
      nationalSocialSecurityFund: 'الصندوق الوطني للضمان الاجتماعي',
      hashemiteUniversity: 'الجامعة الهاشمية',
      palestineMedicalServices: 'الخدمات الطبية الفلسطينية',
      jordanRefinance: 'الاردنية لاعادة تمويل الرهن العقاري',
      alAqsaInsurance: 'الأقصى للتأمين',
      internationalConsultancy: 'الاستشارية الدولية لادارة النفقات وخدمات التأمين',
      professionalsInsurance: 'تأمين المحترفون',
      royalJordanian: 'الملكية الاردنية',
      cigna: 'سيجنا',
      ahlyBank: 'بنك الاهلي',
      healthPro: 'هيلث برو',
      islamicScientificCollege: 'الكلية العلمية الاسلامية',
      centralElectricity: 'شركة الكهرباء المركزية',
      islamicInternationalBank: 'البنك الاسلامي الدولي',
      arabJordanianInvestmentBank: 'بنك الاستثمار العربي الاردني',
      medServiceOutsideScope: 'ميد سيرفس -خارج نطاق الرد الالي للطبيب',
      gulfInsuranceGroup: 'مجموعة الخليج للتأمين',
      healthInsuranceFund: 'صندوق التأمين الصحي',
      indianJordanianChemicals: 'الشركة الهندية الاردنية للكيماويات',
      arabIslamicUniversity: 'الجامعة العربية الاسلامية',
      guaranteeDeposits: 'ضمان ودائع',
      altifMedicalCenter: 'مركز الطيف الطبي',
      futureMedicalSoftware: 'شركة المستقبل للبرامج الطبية',
      alMashreqCompany: 'شركة المشرق',
      alSaqarArab: 'شركة الصقر العربي',
      arabicExpenseManagement: 'الشركة العربية لادارة النفقات',
      electricityCompaniesInsurance: 'صناديق التامين الصحي للشركات العاملة قي قطاع الكهرباء',
      unRwa: 'الأونروا',
      professionalMed: 'مهني ميد',
      affiliationCompany: 'الشركة الانتمائية',
      medConnect: 'ميد كونكت',
      japaneseFertilizerNatHealth: 'شركة الاسمدة اليابانية- نات هيلث',
      aqabaContainersNatHealth: 'ميناء حاويات العقبة -نات هيلث',
      arabJordanNatHealth: 'العربية الاردنية للتامين -نات هيلث',
      aqabaLogisticsNatHealth: 'قرية العقبة اللوجستية-نات هيلث',
      aqabaWaterNatHealth: 'شركة مياه العقبة -نات هيلث',
      arabUnionNatHealth: 'الاتحاد العربي الدولي للتامين - نات هيلث',
      axaNatHealth: 'اكسا- نات هيلث',
      ciscoNatHealth: 'سيسكو-نات هيلث',
      iqbalInvestmentNatHealth: 'الاقبال للاستثمار-نات هيلث',
      industrialCitiesNatHealth: 'شركة المدن الصناعية -نات هيلث',
      egyptJordanNatHealth: 'فجر الاردنية المصرية -نات هيلث',
      jordanTelecomNatHealth: 'مجموعة الاتصالات الاردنية - نات هيلث',
      lafargeNatHealth: 'الاسمنت الاردنية لافارج-نات هيلث',
      nextCareNatHealth: 'نكست كير - نات هيلث',
      alSayeghNatHealth: 'مجموعة الصايغ - نات هيلث',
      zarqaUniversityNatHealth: 'جامعة الزرقاء-نات هيلث',
      raaEmani: 'رعاية امني',
      khalaiq: 'الخلائق',
      intiqaliya: 'الانتقالية',
      dominantCare: 'العناية المهيمنة',
      electricityCompany: 'شركة الكهرباء المساهمة',
      unitedInsurance: 'تأمين المتحدون',
      alAwlaSpecialized: 'الاولى المتخصصه',
      internationalClub: 'النادي الدولي',
      metLife: 'ميتلايف',
      noInsurance: 'بدون تأمين',
    }
  },
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    services: 'Services',
    doctors: 'Doctors',
    contact: 'Contact',
    bookAppointment: 'Book Appointment',
    
    // Doctor Profile
    orthopedicSurgeon: 'Orthopedic and Joint Surgery Specialist',
    rating: 'Rating',
    location: 'Location',
    ammanFifthCircle: 'Amman - Fifth Circle',
    price: 'Price',
    jordanianDinar: 'JOD',
    homeVisit: 'Home Visit',
    waitingTime: 'Waiting Time',
    minutes: 'minutes',
    phoneNumber: 'Phone Number',
    directBooking: 'for direct booking',
    specializations: 'Specializations',
    aboutMe: 'About Me',
    educationalCertificates: 'Educational Certificates & Professional Memberships',
    treatedConditions: 'Symptoms and Health Conditions Treated by Dr. Muhaned',
    treatments: 'Treatments',
    servicesOffered: 'Services Offered',
    insurance: 'Insurance',
    
    // Booking
    bookingTitle: 'Book Your Appointment',
    visitType: 'Visit Type',
    clinicVisit: 'Clinic Visit',
    selectDate: 'Select Date',
    selectTime: 'Select Time',
    bookingConfirmed: 'Booking Confirmed',
    confirmationEmail: 'A confirmation email will be sent',
    
    // Personal Info
    personalInfo: 'Personal Information',
    firstName: 'First Name',
    lastName: 'Last Name',
    relationship: 'Patient\'s Relationship to You',
    paymentMethod: 'Payment Method',
    selectInsurance: 'Select Insurance',
    termsConditions: 'Terms & Conditions',
    acceptTerms: 'I have read and accept',
    confirmBooking: 'Confirm Booking',
    insurance: 'Insurance',
    cash: 'Cash',
    selectInsurance: 'Select Insurance',
    
    // Booking Summary
    bookingSummary: 'Booking Summary',
    date: 'Date',
    time: 'Time',
    consultationType: 'Consultation Type',
    changeTime: 'Choose Another Time'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

const t = (key: string): string => {
  const keys = key.split('.');
  let value: any = translations[language];
  for (const k of keys) {
    value = value?.[k];
  }
  return value || key;
};

  

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};