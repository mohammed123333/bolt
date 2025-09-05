import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Star, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { doctorData, insuranceCompanies } from '../data/doctorData';
import LanguageToggle from '../components/LanguageToggle';
import emailjs from '@emailjs/browser';


const PersonalInfoPage = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
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
<button onClick={() => navigate('/')}>
  <img src="/images/logo.png" alt="طب جو" className="h-16 w-auto cursor-pointer" />
</button>

          <LanguageToggle />
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
          {/* Booking Summary */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-6 lg:sticky lg:top-8">
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 lg:mb-6">{t('bookingSummary')}</h3>
              <div className="text-center mb-4 lg:mb-6">
                <img src={doctor.image} alt={data.name} className="w-16 h-16 lg:w-20 lg:h-20 rounded-full mx-auto mb-3 object-cover" />
                <h4 className="font-bold text-gray-900 text-sm lg:text-base">{data.name}</h4>
                <p className="text-blue-600 text-xs lg:text-sm">{data.specialty}</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('date')}:</span>
                  <span className="text-gray-900 text-right">{formatDate(date)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('time')}:</span>
                  <span className="text-gray-900">{formatTime(time)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('consultationType')}:</span>
                  <span className="text-gray-900">{visitType === 'clinic' ? t('clinicVisit') : t('homeVisit')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('price')}:</span>
                  <span className="text-gray-900">{visitType === 'clinic' ? doctor.priceClinic : doctor.priceHome} {t('jordanianDinar')}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate(`/${doctorId}/booking`)}
                className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm underline"
              >
                {t('changeTime')}
              </button>
            </div>
          </div>

          {/* Personal Information Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 lg:mb-8">{t('personalInfo')}</h2>

              <div className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('firstName')}</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder={t('firstName')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('lastName')}</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder={t('lastName')}
                    />
                  </div>
                </div>

{/* Phone Number */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
  <div className="flex" dir="ltr">
<select
  value={formData.countryCode}
  onChange={(e) => handleInputChange('countryCode', e.target.value)}
  className="min-w-[120px] max-w-[125px] px-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50"
>
  {countryCodes.map(country => (
    <option key={country.code} value={country.code}>
      {country.code} {country.country}
    </option>
  ))}
</select>

    <input
      type="tel"
      value={formData.phoneNumber}
      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
      className="w-full flex-1 px-4 py-3 rounded-lg border border-l-0 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      placeholder="7 9999 9999"
    />
  </div>
</div>


                {/* Relationship */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('relationship')}</label>
                  <select
                    value={formData.relationship}
                    onChange={(e) => handleInputChange('relationship', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">اختر صلة القرابة</option>
                    <option value="نفسي">نفسي</option>
                    <option value="ابني/ابنتي">ابني/ابنتي</option>
                    <option value="زوجي/زوجتي">زوجي/زوجتي</option>
                    <option value="والدي/والدتي">والدي/والدتي</option>
                    <option value="أخي/أختي">أخي/أختي</option>
                    <option value="قريب">قريب</option>
                    <option value="صديق">صديق</option>
                  </select>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('paymentMethod')}</label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === 'cash'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="ml-3 text-blue-600 focus:ring-blue-500"
                      />
                      <span>نقداً</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="insurance"
                        checked={formData.paymentMethod === 'insurance'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="ml-3 text-blue-600 focus:ring-blue-500"
                      />
                      <span>تأمين</span>
                    </label>
                  </div>
                </div>

                {/* Insurance Selection */}
                {formData.paymentMethod === 'insurance' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('selectInsurance')}</label>
                    <select
                      value={formData.insurance}
                      onChange={(e) => handleInputChange('insurance', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">اختر شركة التأمين</option>
                      {insuranceCompanies.map((company, index) => (
                        <option key={index} value={company}>{company}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Terms and Conditions */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 ml-3 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    {t('acceptTerms')} <a href="/terms-conditions" className="text-blue-600 hover:underline">{t('termsConditions')}</a>
                  </label>
                </div>

                {/* Confirm Button */}
                <button
                  onClick={handleConfirmBooking}
                  disabled={!formData.firstName || !formData.lastName || !formData.phoneNumber || !formData.paymentMethod || !acceptedTerms}
                  className={`w-full py-3 lg:py-4 px-4 lg:px-6 rounded-lg font-medium text-base lg:text-lg transition-all ${
                    formData.firstName && formData.lastName && formData.phoneNumber && formData.paymentMethod && acceptedTerms
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