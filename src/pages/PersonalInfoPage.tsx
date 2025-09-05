import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Star, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { doctorData, insuranceCompanies } from '../data/doctorData';
import LanguageToggle from '../components/LanguageToggle';
import emailjs from '@emailjs/browser';

const PersonalInfoPage = () => {
  const { doctorId } = useParams();
  const doctor = doctorData[doctorId as keyof typeof doctorData];
  const location = useLocation();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { visitType, date, time } = location.state || {};

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    relationship: '',
    paymentMethod: '',
    countryCode: '+962',
    phoneNumber: '',
    insurance: ''
  });
  
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // ✅ Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Doctor not found</h1>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  const data = doctor[language];

  const countryCodes = [
    { code: '+962', country: 'الأردن' }, { code: '+966', country: 'السعودية' },
    { code: '+971', country: 'الإمارات' }, { code: '+965', country: 'الكويت' },
    { code: '+973', country: 'البحرين' }, { code: '+974', country: 'قطر' },
    { code: '+968', country: 'عمان' }, { code: '+961', country: 'لبنان' },
    { code: '+963', country: 'سوريا' }, { code: '+964', country: 'العراق' },
    { code: '+20', country: 'مصر' }, { code: '+1', country: 'الولايات المتحدة' },
    { code: '+44', country: 'المملكة المتحدة' }
  ];

  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString(language === 'ar' ? 'ar-JO' : 'en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    if (language === 'ar') {
      return hours >= 12 ? `${hours === 12 ? 12 : hours - 12}:${minutes.toString().padStart(2, '0')} م` : `${hours}:${minutes.toString().padStart(2, '0')} ص`;
    }
    return hours >= 12 ? `${hours === 12 ? 12 : hours - 12}:${minutes.toString().padStart(2, '0')} PM` : `${hours}:${minutes.toString().padStart(2, '0')} AM`;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleConfirmBooking = () => {
    if (formData.firstName && formData.lastName && formData.phoneNumber && formData.paymentMethod && acceptedTerms) {
      sendEmailNotifications();
      setShowSuccessPopup(true);
      setTimeout(() => navigate('/'), 3000);
    }
  };

  const sendEmailNotifications = () => {
    const fullPhoneNumber = formData.countryCode + formData.phoneNumber;
    const paymentMethodArabic = formData.paymentMethod === 'cash' ? 'نقداً' : 'تأمين';
    const paymentMethodEnglish = formData.paymentMethod === 'cash' ? 'Cash' : 'Insurance';
    const insuranceArabic = formData.paymentMethod === 'insurance' ? (formData.insurance || 'غير محدد') : null;
    const insuranceEnglish = formData.paymentMethod === 'insurance' ? (formData.insurance || 'Not specified') : null;

    const combinedEmailContent = `
===== هذه الرسالة للطبيب =====
طب جو: لدى الدكتور ${data.name} حجز يوم ${formatDate(date)},
الساعة: ${formatTime(time)},
نوع الزيارة: ${visitType === 'clinic' ? 'زيارة العيادة' : 'زيارة منزلية'},
طريقة الدفع: ${paymentMethodArabic},
${insuranceArabic ? `التأمين: ${insuranceArabic},` : ''}
صلة القرابة: ${formData.relationship},
اسم المريض: ${formData.firstName} ${formData.lastName},
رقم المريض: ${fullPhoneNumber}

Tib Jo: Dr. ${data.name} has an appointment on ${formatDate(date)},
Time: ${formatTime(time)},
Visit type: ${visitType === 'clinic' ? 'Clinic visit' : 'Home visit'},
Payment method: ${paymentMethodEnglish},
${insuranceEnglish ? `Insurance: ${insuranceEnglish},` : ''}
Relationship: ${formData.relationship},
Patient Name: ${formData.firstName} ${formData.lastName},
Patient Phone: ${fullPhoneNumber}

---------------------------------------------

===== هذه الرسالة للمريض =====
طب جو: تم تأكيد حجز ${visitType === 'clinic' ? 'زيارة العيادة' : 'زيارة منزلية'} في ${formatDate(date)} عند ${formatTime(time)} مع دكتور/ة ${data.name},
طريقة الدفع: ${paymentMethodArabic}
${insuranceArabic ? `التأمين: ${insuranceArabic}` : ''}
للتواصل مع خدمة العملاء: +962 7 9794 2027

Tib Jo: Your ${visitType === 'clinic' ? 'clinic visit' : 'home visit'} appointment has been confirmed on ${formatDate(date)} at ${formatTime(time)} with Dr. ${data.name}.
Payment method: ${paymentMethodEnglish}
${insuranceEnglish ? `Insurance: ${insuranceEnglish}` : ''}
For customer service: +962 7 9794 2027
`;

    emailjs.send(
      'service_mu7jzcm',
      'template_nw2maje',
      { to_email: doctor.email || 'default@example.com', message: combinedEmailContent },
      'p6TA6jdE3qG_7qi25'
    ).then(() => console.log('Email sent to doctor'))
     .catch((error) => console.error('Error sending email:', error));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          {/* ✅ Clickable logo */}
          <img 
            src="/images/logo.png" 
            alt="طب جو" 
            className="h-16 w-auto cursor-pointer" 
            onClick={() => navigate('/')} 
          />
          <LanguageToggle />
        </div>

        {/* Rest of your page code... */}
        {/* (unchanged form + success popup code remains as you sent it) */}

      </div>
    </div>
  );
};

export default PersonalInfoPage;
