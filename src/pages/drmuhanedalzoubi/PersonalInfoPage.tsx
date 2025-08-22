import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Star, ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { insuranceCompanies } from '../../data/doctorData';
import LanguageToggle from '../../components/LanguageToggle';
import emailjs from '@emailjs/browser';

function formatDateEn(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatTimeEn(timeString: string): string {
  const [hour, minute] = timeString.split(':');
  const date = new Date();
  date.setHours(Number(hour));
  date.setMinutes(Number(minute));

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

const PersonalInfoPage = () => {
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

  const countryCodes = [
    { code: '+962', country: 'الأردن' },
    { code: '+966', country: 'السعودية' },
    { code: '+971', country: 'الإمارات' },
    { code: '+965', country: 'الكويت' },
    { code: '+973', country: 'البحرين' },
    { code: '+974', country: 'قطر' },
    { code: '+968', country: 'عمان' },
    { code: '+961', country: 'لبنان' },
    { code: '+963', country: 'سوريا' },
    { code: '+964', country: 'العراق' },
    { code: '+20', country: 'مصر' },
    { code: '+1', country: 'الولايات المتحدة' },
    { code: '+44', country: 'المملكة المتحدة' }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (language === 'ar') {
      return date.toLocaleDateString('ar-JO', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    
    if (language === 'ar') {
      const displayTime = hour >= 12 
        ? `${hour === 12 ? 12 : hour - 12}:${minutes} م`
        : `${hour}:${minutes} ص`;
      return displayTime;
    } else {
      const displayTime = hour >= 12 
        ? `${hour === 12 ? 12 : hour - 12}:${minutes} PM`
        : `${hour}:${minutes} AM`;
      return displayTime;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleConfirmBooking = () => {
    if (formData.firstName && formData.lastName && formData.phoneNumber && formData.paymentMethod && acceptedTerms) {
      // Send email notifications
      sendEmailNotifications();
      
      // Show success popup
      setShowSuccessPopup(true);
      
      // Navigate to home after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };
const sendEmailNotifications = () => {
  const fullPhoneNumber = formData.countryCode + formData.phoneNumber;

const paymentMethodArabic = formData.paymentMethod === 'cash' ? 'نقداً' : 'تأمين';
const paymentMethodEnglish = formData.paymentMethod === 'cash' ? 'Cash' : 'Insurance';

const insuranceArabic = formData.paymentMethod === 'insurance'
  ? (formData.insurance || 'غير محدد')
  : null;

const insuranceEnglish = formData.paymentMethod === 'insurance'
  ? (formData.insurance || 'Not specified')
  : null;

const combinedEmailContent = `
===== هذه الرسالة للطبيب =====

طب جو: لدى الدكتور مهند الزعبي حجز يوم ${formatDate(date)},
الساعة: ${formatTime(time)},
نوع الزيارة: ${visitType === 'clinic' ? 'زيارة العيادة' : 'زيارة منزلية'},
طريقة الدفع: ${paymentMethodArabic},
${insuranceArabic ? `التأمين: ${insuranceArabic},` : ''}
صلة القرابة: ${formData.relationship},
اسم المريض: ${formData.firstName} ${formData.lastName},
رقم المريض: ${fullPhoneNumber}

Tib Jo: Dr. Muhaned Alzoubi has an appointment on ${formatDateEn(date)},
Time: ${formatTimeEn(time)},
Visit type: ${visitType === 'clinic' ? 'Clinic visit' : 'Home visit'},
Payment method: ${paymentMethodEnglish},
${insuranceEnglish ? `Insurance: ${insuranceEnglish},` : ''}
Relationship: ${formData.relationship},
Patient Name: ${formData.firstName} ${formData.lastName},
Patient Phone: ${fullPhoneNumber}

---------------------------------------------

===== هذه الرسالة للمريض =====

طب جو: تم تأكيد حجز ${visitType === 'clinic' ? 'زيارة العيادة' : 'زيارة منزلية'} في ${formatDate(date)} عند ${formatTime(time)} مع دكتور/ة مهند الزعبي،
طريقة الدفع: ${paymentMethodArabic}
${insuranceArabic ? `التأمين: ${insuranceArabic}` : ''}
للتواصل مع خدمة العملاء: +962798376025

Tib Jo: Your ${visitType === 'clinic' ? 'clinic visit' : 'home visit'} appointment has been confirmed on ${formatDateEn(date)} at ${formatTimeEn(time)} with Dr. Muhaned Alzoubi.
Payment method: ${paymentMethodEnglish}
${insuranceEnglish ? `Insurance: ${insuranceEnglish}` : ''}
For customer service: +962797942027
`;

  emailjs.send(
    'service_mu7jzcm',
    'template_nw2maje', // Use a single template for both sections
    {
      to_email: 'drmuhaned83@gmail.com',
      message: combinedEmailContent
    },
    'p6TA6jdE3qG_7qi25'
  )
  .then(() => {
    console.log('Combined email sent to doctor');
  })
  .catch((error) => {
    console.error('Error sending combined email:', error);
  });
};



  const handleChangeTime = () => {
    navigate('/DrMuhanedAlzoubi/booking');
  };

  const handleTermsClick = () => {
    navigate('/terms-conditions');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header with Logo and Language Toggle */}
        <div className="flex justify-between items-center mb-8">
          <img 
            src="/images/logo.png" 
            alt="طب جو" 
            className="h-16 w-auto"
          />
          <LanguageToggle />
        </div>
        
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
          {/* Booking Summary */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-6 lg:sticky lg:top-8">
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 lg:mb-6">{t('bookingSummary')}</h3>
              
              <div className="text-center mb-4 lg:mb-6">
                <img 
                  src="/images/IMG_8538.jpeg" 
                  alt={language === 'ar' ? 'د. مهند الزعبي' : 'Dr. Muhaned Alzoubi'}
                  className="w-16 h-16 lg:w-20 lg:h-20 rounded-full mx-auto mb-3 object-cover"
                />
                <h4 className="font-bold text-gray-900 text-sm lg:text-base">
                  {language === 'ar' ? 'د. مهند الزعبي' : 'Dr. Muhaned Alzoubi'}
                </h4>
                <p className="text-blue-600 text-xs lg:text-sm">{t('orthopedicSurgeon')}</p>
              </div>

              <div className="space-y-2 lg:space-y-4 text-xs lg:text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('rating')}:</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('location')}:</span>
                  <span className={`text-gray-900 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {t('ammanFifthCircle')}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('date')}:</span>
                  <span className={`text-gray-900 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {formatDate(date)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('time')}:</span>
                  <span className={`text-gray-900 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {formatTime(time)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('consultationType')}:</span>
                  <span className={`text-gray-900 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {visitType === 'clinic' ? t('clinicVisit') : t('homeVisit')}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('price')}:</span>
                  <span className={`text-gray-900 font-bold ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {visitType === 'clinic' ? '30' : '35'} {t('jordanianDinar')}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('phoneNumber')}:</span>
                  <span className={`text-gray-900 ${language === 'ar' ? 'text-right' : 'text-left'} break-all`}>
                    +962 7 9794 2027
                  </span>
                </div>
              </div>

              <button
                onClick={handleChangeTime}
                className="w-full mt-4 lg:mt-6 bg-gray-100 text-gray-700 py-2 lg:py-3 px-3 lg:px-4 rounded-lg hover:bg-gray-200 transition-colors duration-300 font-medium text-sm lg:text-base"
              >
                {t('changeTime')}
              </button>
            </div>
          </div>

          {/* Personal Information Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('personalInfo')}</h2>

              <div className="space-y-6">
                {/* Phone Number - First Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('phoneNumber')}</label>
                  <div className={`flex gap-2 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <select
                      value={formData.countryCode}
                      onChange={(e) => handleInputChange('countryCode', e.target.value)}
                      className="w-32 px-2 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder={language === 'ar' ? '7 9999 9999' : '7 9999 9999'}
                    />
                  </div>
                </div>
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('firstName')}</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={language === 'ar' ? 'الاسم الأول' : 'First Name'}
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('lastName')}</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={language === 'ar' ? 'اسم العائلة' : 'Last Name'}
                  />
                </div>

                {/* Patient Relationship */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">صلة قرابة المريض بك</label>
                  <select
                    value={formData.relationship}
                    onChange={(e) => handleInputChange('relationship', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">اختر صلة القرابة</option>
                    <option value="انا">انا</option>
                    <option value="اب/ام">اب/ام</option>
                    <option value="ابن/ابنة">ابن/ابنة</option>
                    <option value="زوج/زوجة">زوج/زوجة</option>
                    <option value="اخ/اخت">اخ/اخت</option>
                    <option value="آخر">آخر</option>
                  </select>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('paymentMethod')}</label>
                  <div className={`flex ${language === 'ar' ? 'space-x-4 space-x-reverse' : 'space-x-4'}`}>
                    <button
                      onClick={() => handleInputChange('paymentMethod', 'cash')}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all text-sm lg:text-base ${
                        formData.paymentMethod === 'cash'
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 text-gray-700 hover:border-blue-300'
                      }`}
                    >
                      {language === 'ar' ? 'نقداً' : 'Cash'}
                    </button>
                    <button
                      onClick={() => handleInputChange('paymentMethod', 'insurance')}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all text-sm lg:text-base ${
                        formData.paymentMethod === 'insurance'
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 text-gray-700 hover:border-blue-300'
                      }`}
                    >
                      {language === 'ar' ? 'تأمين' : 'Insurance'}
                    </button>
                  </div>
                </div>


                {/* Insurance - Only show if payment method is insurance */}
                {formData.paymentMethod === 'insurance' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('selectInsurance')}</label>
                    <select
                      value={formData.insurance}
                      onChange={(e) => handleInputChange('insurance', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">{language === 'ar' ? 'اختر شركة التأمين' : 'Select Insurance Company'}</option>
                      {insuranceCompanies.map((insurance) => (
                        <option key={insurance} value={insurance}>
                          {insurance}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Terms and Conditions */}
                <div className={`flex items-start ${language === 'ar' ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    {t('acceptTerms')}{' '}
                    <button
                      onClick={handleTermsClick}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {t('termsConditions')}
                    </button>
                  </label>
                </div>

                {/* Confirm Button */}
                <button
                  onClick={handleConfirmBooking}
                  disabled={!formData.firstName || !formData.lastName || !formData.phoneNumber || !formData.relationship || !formData.paymentMethod || !acceptedTerms}
                  className={`w-full py-4 px-6 rounded-lg font-medium text-lg transition-all ${
                    formData.firstName && formData.lastName && formData.phoneNumber && formData.relationship && formData.paymentMethod && acceptedTerms
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {t('confirmBooking')}
                </button>
              </div>
            </div>
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