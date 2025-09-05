import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { doctorData, insuranceCompanies } from '../data/doctorData';
import LanguageToggle from '../components/LanguageToggle';
import emailjs from '@emailjs/browser';

const PersonalInfoPage = () => {
  const { doctorId } = useParams();
  const doctor = doctorData[doctorId]; // ✅ fixed
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

  // ✅ Always scroll to top when page loads
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

  // 📅 Format date
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString(language === 'ar' ? 'ar-JO' : 'en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  // ⏰ Format time
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    if (language === 'ar') {
      return hours >= 12
        ? `${hours === 12 ? 12 : hours - 12}:${minutes.toString().padStart(2, '0')} م`
        : `${hours}:${minutes.toString().padStart(2, '0')} ص`;
    }
    return hours >= 12
      ? `${hours === 12 ? 12 : hours - 12}:${minutes.toString().padStart(2, '0')} PM`
      : `${hours}:${minutes.toString().padStart(2, '0')} AM`;
  };

  // 📝 Input handler
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // ✅ Booking confirmation
  const handleConfirmBooking = () => {
    if (formData.firstName && formData.lastName && formData.phoneNumber && formData.paymentMethod && acceptedTerms) {
      sendEmailNotifications();
      setShowSuccessPopup(true);
      setTimeout(() => navigate('/'), 3000);
    }
  };

  // 📧 Send email via EmailJS
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

        {/* Page Content ... (rest of your code stays the same) */}
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
