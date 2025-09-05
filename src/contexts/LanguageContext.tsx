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