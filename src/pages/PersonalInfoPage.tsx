import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Star, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { doctorData, insuranceCompanies } from '../data/doctorData';
import LanguageToggle from '../components/LanguageToggle';
import emailjs from '@emailjs/browser';
import { translations } from './LanguageContext';


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

    // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
  { code: '+962', country: t('countries.JO') },
  { code: '+966', country: t('countries.SA') },
  { code: '+971', country: t('countries.AE') },
  { code: '+965', country: t('countries.KW') },
  { code: '+973', country: t('countries.BH') },
  { code: '+974', country: t('countries.QA') },
  { code: '+968', country: t('countries.OM') },
  { code: '+961', country: t('countries.LB') },
  { code: '+963', country: t('countries.SY') },
  { code: '+964', country: t('countries.IQ') },
  { code: '+20', country: t('countries.EG') },
  { code: '+1', country: t('countries.US') },
  { code: '+44', country: t('countries.UK') }
];


  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString(language === 'ar' ? 'ar-JO' : 'en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  };

const formatTime = (timeString: string) => {
  const date = new Date(timeString);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // خلي الساعات بدون leading zero
  const formattedHours = hours.toString(); 
  // الدقائق لازم تضل 2 digits
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
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

// Find doctor ID safely
const doctorId = Object.keys(doctorData).find(
  id => doctorData[id]?.ar?.name === formData.doctorName || doctorData[id]?.en?.name === formData.doctorName
);

// Fallback if not found
if (!doctorId) {
  console.warn('Doctor not found in doctorData:', formData.doctorName);
}

// Detect language safely
const userLang = doctorId && doctorData[doctorId]?.ar?.name === formData.doctorName ? 'ar' : 'en';

// Doctor names with safe fallback
const doctorNameArabic = doctorId ? (doctorData[doctorId]?.ar?.name || formData.doctorName) : formData.doctorName;
const doctorNameEnglish = doctorId ? (doctorData[doctorId]?.en?.name || formData.doctorName) : formData.doctorName;


  // Payment method
  const paymentMethodArabic = formData.paymentMethod === 'cash' ? 'نقداً' : 'تأمين';
  const paymentMethodEnglish = formData.paymentMethod === 'cash' ? 'Cash' : 'Insurance';

// Get insurance translation dynamically
let insuranceArabic = '';
let insuranceEnglish = '';

if (formData.paymentMethod === 'insurance' && formData.insurance) {
  const insuranceName = formData.insurance;

  // Determine if user booked in Arabic or English
  const bookedInArabic = /[\u0600-\u06FF]/.test(insuranceName);

  if (bookedInArabic) {
    // Booked in Arabic, get English translation
    insuranceArabic = `التأمين: ${insuranceName}`;
    insuranceEnglish = `Insurance: ${translations.en.insuranceCompanies[insuranceName] || insuranceName}`;
  } else {
    // Booked in English, get Arabic translation
    insuranceEnglish = `Insurance: ${insuranceName}`;
    insuranceArabic = `التأمين: ${translations.ar.insuranceCompanies[insuranceName] || insuranceName}`;
  }
}
  // Date & Time
  const dateArabic = new Date(date).toLocaleDateString('ar-JO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const dateEnglish = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const timeArabic = new Date(`1970-01-01T${time}`).toLocaleTimeString('ar-JO', {
    hour: 'numeric',
    minute: '2-digit',
  });
  const timeEnglish = new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  // Relationship translation
  const relationshipArabic = formData.relationship === 'Father' ? 'أب' :
                             formData.relationship === 'Mother' ? 'أم' :
                             formData.relationship === 'Brother' ? 'أخ' :
                             formData.relationship === 'Sister' ? 'أخت' :
                             formData.relationship === 'Son' ? 'ابن' :
                             formData.relationship === 'Daughter' ? 'ابنة' :
                             formData.relationship === 'Me' ? 'أنا' :
                             formData.relationship === 'Spouse' ? 'زوجي/زوجتي' :
                             formData.relationship === 'Relative' ? 'قريب' :
                             formData.relationship === 'Friend' ? 'صديق' :
                             formData.relationship;
  
  const relationshipEnglish = formData.relationship === 'أب' ? 'Father' :
                              formData.relationship === 'أم' ? 'Mother' :
                              formData.relationship === 'أخ' ? 'Brother' :
                              formData.relationship === 'أخت' ? 'Sister' :
                              formData.relationship === 'ابن' ? 'Son' :
                              formData.relationship === 'ابنة' ? 'Daughter' :
                              formData.relationship === 'أنا' ? 'Me' :
                              formData.relationship === 'زوجي/زوجتي' ? 'Spouse' :
                              formData.relationship === 'قريب' ? 'Relative' :
                              formData.relationship === 'صديق' ? 'Friend' :
                              formData.relationship;

  // Doctor message Arabic
  const doctorMessageArabic = `
===== هذه الرسالة للطبيب =====
طب جو: لدى ${doctorNameArabic} حجز يوم ${dateArabic},
الساعة: ${timeArabic},
نوع الزيارة: ${visitType === 'clinic' ? 'زيارة العيادة' : 'زيارة منزلية'},
طريقة الدفع: ${paymentMethodArabic}${insuranceArabic ? `\n${insuranceArabic}` : ''}
صلة القرابة: ${relationshipArabic},
اسم المريض: ${formData.firstName} ${formData.lastName},
رقم المريض: ${fullPhoneNumber}
`;

  // Doctor message English
  const doctorMessageEnglish = `
Tib Jo: ${doctorNameEnglish} has an appointment on ${dateEnglish},
Time: ${timeEnglish},
Visit type: ${visitType === 'clinic' ? 'Clinic visit' : 'Home visit'},
Payment method: ${paymentMethodEnglish}${insuranceEnglish ? `\n${insuranceEnglish}` : ''},
Relationship: ${relationshipEnglish},
Patient Name: ${formData.firstName} ${formData.lastName},
Patient Phone: ${fullPhoneNumber}
`;

  // Patient message Arabic
  const patientMessageArabic = `
===== هذه الرسالة للمريض =====
طب جو: تم تأكيد حجز ${visitType === 'clinic' ? 'زيارة العيادة' : 'زيارة منزلية'}
في ${dateArabic} عند ${timeArabic} مع ${doctorNameArabic},
طريقة الدفع: ${paymentMethodArabic}${insuranceArabic ? `\n${insuranceArabic}` : ''},
للتواصل مع خدمة العملاء: +2027 9794 7 962
`;

  // Patient message English
  const patientMessageEnglish = `
Tib Jo: Your ${visitType === 'clinic' ? 'clinic visit' : 'home visit'} appointment has been confirmed
on ${dateEnglish} at ${timeEnglish} with ${doctorNameEnglish}.
Payment method: ${paymentMethodEnglish}${insuranceEnglish ? `\n${insuranceEnglish}` : ''},
For customer service: +962 7 9794 2027
`;

  // Combine
  const combinedEmailContent =
    doctorMessageArabic +
    "\n" +
    doctorMessageEnglish +
    "\n---------------------------------------------\n" +
    patientMessageArabic +
    "\n" +
    patientMessageEnglish;

  // Send email
  emailjs
    .send(
      'service_mu7jzcm',
      'template_nw2maje',
      { to_email: doctorData[doctorId]?.email || 'appointments.tibjo@gmail.com', message: combinedEmailContent },
      'p6TA6jdE3qG_7qi25'
    )
    .then(() => console.log('Email sent to doctor'))
    .catch((error) => console.error('Error sending email:', error));
};

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <img
            src="/images/logo.png"
            alt="طب جو"
            className="h-16 w-auto cursor-pointer"
            onClick={() => navigate('/')}
          />
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
  <label className="block text-sm font-medium text-gray-700 mb-2">{t('phoneNumber')}</label>
  <div className="flex" dir="ltr">
<select
  value={formData.countryCode}
  onChange={(e) => handleInputChange('countryCode', e.target.value)}
  className="min-w-[110px] max-w-[126px] px-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50"
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
    <option value={t('chooseRelationship')}>{t('chooseRelationship')}</option>
    <option value={t('relationships.self')}>{t('relationships.self')}</option>
    <option value={t('relationships.child')}>{t('relationships.child')}</option>
    <option value={t('relationships.spouse')}>{t('relationships.spouse')}</option>
    <option value={t('relationships.parent')}>{t('relationships.parent')}</option>
    <option value={t('relationships.sibling')}>{t('relationships.sibling')}</option>
    <option value={t('relationships.relative')}>{t('relationships.relative')}</option>
    <option value={t('relationships.friend')}>{t('relationships.friend')}</option>
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
        className={`text-blue-600 focus:ring-blue-500 ${language === 'ar' ? 'ml-3' : 'mr-3'}`}
      />
      <span>{t('cash')}</span>
    </label>
    <label className="flex items-center">
      <input
        type="radio"
        name="paymentMethod"
        value="insurance"
        checked={formData.paymentMethod === 'insurance'}
        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
        className={`text-blue-600 focus:ring-blue-500 ${language === 'ar' ? 'ml-3' : 'mr-3'}`}
      />
      <span>{t('insurance')}</span>
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
      <option value="">{t('selectInsurance')}</option>
      {insuranceCompanies.map((key) => (
        <option key={key} value={key}>{t(`insuranceCompanies.${key}`)}</option>
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
    className={`mt-1 text-blue-600 focus:ring-blue-500 ${language === 'ar' ? 'ml-3' : 'mr-3'}`}
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