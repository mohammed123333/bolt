import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Star, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { doctorData, insuranceCompanies } from '../../data/doctorData';
import LanguageToggle from '../../components/LanguageToggle';
import emailjs from '@emailjs/browser';

const PersonalInfoPage = () => {
  const { slug } = useParams(); // Get doctor slug from URL
  const doctor = doctorData.find((doc) => doc.slug === slug); // Find doctor by slug
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

  if (!doctor) return <h1>Doctor not found</h1>; // Handle invalid slug

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
      return hours >= 12 ? `${hours === 12 ? 12 : hours - 12}:${minutes} م` : `${hours}:${minutes} ص`;
    }
    return hours >= 12 ? `${hours === 12 ? 12 : hours - 12}:${minutes} PM` : `${hours}:${minutes} AM`;
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
طب جو: لدى الدكتور ${doctor.name} حجز يوم ${formatDate(date)},
الساعة: ${formatTime(time)},
نوع الزيارة: ${visitType === 'clinic' ? 'زيارة العيادة' : 'زيارة منزلية'},
طريقة الدفع: ${paymentMethodArabic},
${insuranceArabic ? `التأمين: ${insuranceArabic},` : ''}
صلة القرابة: ${formData.relationship},
اسم المريض: ${formData.firstName} ${formData.lastName},
رقم المريض: ${fullPhoneNumber}

Tib Jo: Dr. ${doctor.name} has an appointment on ${formatDate(date)},
Time: ${formatTime(time)},
Visit type: ${visitType === 'clinic' ? 'Clinic visit' : 'Home visit'},
Payment method: ${paymentMethodEnglish},
${insuranceEnglish ? `Insurance: ${insuranceEnglish},` : ''}
Relationship: ${formData.relationship},
Patient Name: ${formData.firstName} ${formData.lastName},
Patient Phone: ${fullPhoneNumber}

---------------------------------------------

===== هذه الرسالة للمريض =====
طب جو: تم تأكيد حجز ${visitType === 'clinic' ? 'زيارة العيادة' : 'زيارة منزلية'} في ${formatDate(date)} عند ${formatTime(time)} مع دكتور/ة ${doctor.name},
طريقة الدفع: ${paymentMethodArabic}
${insuranceArabic ? `التأمين: ${insuranceArabic}` : ''}
للتواصل مع خدمة العملاء: +962798376025

Tib Jo: Your ${visitType === 'clinic' ? 'clinic visit' : 'home visit'} appointment has been confirmed on ${formatDate(date)} at ${formatTime(time)} with Dr. ${doctor.name}.
Payment method: ${paymentMethodEnglish}
${insuranceEnglish ? `Insurance: ${insuranceEnglish}` : ''}
For customer service: +962797942027
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
          <img src="/images/logo.png" alt="طب جو" className="h-16 w-auto" />
          <LanguageToggle />
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
          {/* Booking Summary */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-6 lg:sticky lg:top-8">
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 lg:mb-6">{t('bookingSummary')}</h3>
              <div className="text-center mb-4 lg:mb-6">
                <img src={doctor.image} alt={doctor.name} className="w-16 h-16 lg:w-20 lg:h-20 rounded-full mx-auto mb-3 object-cover" />
                <h4 className="font-bold text-gray-900 text-sm lg:text-base">{doctor.name}</h4>
                <p className="text-blue-600 text-xs lg:text-sm">{doctor.specialty}</p>
              </div>
              {/* rest of booking summary info like date, time, visitType, price... */}
            </div>
          </div>

          {/* Personal Information Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            {/* same form as before */}
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t('bookingConfirmed')}</h3>
            <p className="text-gray-600">{t('confirmationEmail')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoPage;
