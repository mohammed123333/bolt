import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';

const PersonalInfoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { visitType, date, time } = location.state || {};

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    countryCode: '+962',
    phoneNumber: '',
    insurance: ''
  });
  
  const [acceptedTerms, setAcceptedTerms] = useState(false);

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

  const insuranceOptions = [
    'الضمان الاجتماعي',
    'التأمين الصحي العسكري',
    'شركة الأردن للتأمين',
    'الشركة الأردنية الفرنسية للتأمين',
    'شركة المتحدة للتأمين',
    'شركة الدلتا للتأمين',
    'بدون تأمين'
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-JO', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const displayTime = hour >= 12 
      ? `${hour === 12 ? 12 : hour - 12}:${minutes} م`
      : `${hour}:${minutes} ص`;
    return displayTime;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleConfirmBooking = () => {
    if (formData.firstName && formData.lastName && formData.phoneNumber && acceptedTerms) {
      // Send WhatsApp messages
      sendWhatsAppMessages();
      
      // Navigate to confirmation page or show success message
      alert('تم تأكيد الحجز بنجاح! سيتم إرسال رسالة تأكيد عبر الواتساب.');
      navigate('/');
    }
  };

  const sendWhatsAppMessages = () => {
    const fullPhoneNumber = formData.countryCode + formData.phoneNumber;
    const doctorPhone = '+962795025555';
    
    // Message to patient
    const patientMessage = `طب جو: تم تأكيد حجز ${visitType === 'clinic' ? 'زيارة العيادة' : 'زيارة منزلية'} في ${formatDate(date)} عند ${formatTime(time)} مع دكتور/ة مهند الزعبي، للتواصل مع خدمة العملاء: +962798376025

Tib Jo: Your ${visitType === 'clinic' ? 'clinic visit' : 'home visit'} appointment has been confirmed on ${formatDate(date)} at ${formatTime(time)} with Dr. Muhaned Alzoubi. For customer service: +962798376025`;

    // Message to doctor
    const doctorMessage = `طب جو: لدى الدكتور مهند الزعبي حجز يوم ${formatDate(date)},
الساعة: ${formatTime(time)},
التأمين: ${formData.insurance || 'غير محدد'},
اسم المريض: ${formData.firstName} ${formData.lastName},
رقم المريض: ${fullPhoneNumber}

Tib Jo: Dr. Muhaned Alzoubi has an appointment on ${formatDate(date)},
Time: ${formatTime(time)},
Insurance: ${formData.insurance || 'Not specified'},
Patient Name: ${formData.firstName} ${formData.lastName},
Patient Phone: ${fullPhoneNumber}`;

    // Open WhatsApp links (in real implementation, you'd use a proper WhatsApp API)
    const patientWhatsAppUrl = `https://wa.me/${fullPhoneNumber.replace('+', '')}?text=${encodeURIComponent(patientMessage)}`;
    const doctorWhatsAppUrl = `https://wa.me/${doctorPhone.replace('+', '')}?text=${encodeURIComponent(doctorMessage)}`;
    
    // In a real implementation, you would send these messages through a backend service
    console.log('Patient WhatsApp URL:', patientWhatsAppUrl);
    console.log('Doctor WhatsApp URL:', doctorWhatsAppUrl);
  };

  const handleChangeTime = () => {
    navigate('/DrMuhanedAlzoubi/booking');
  };

  const handleTermsClick = () => {
    navigate('/terms-conditions');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">ملخص الحجز</h3>
              
              <div className="text-center mb-6">
                <img 
                  src="/images/IMG_8538.jpeg" 
                  alt="د. مهند الزعبي"
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                />
                <h4 className="font-bold text-gray-900">د. مهند الزعبي</h4>
                <p className="text-blue-600 text-sm">أخصائي جراحة العظام والمفاصل</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">التقييم:</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">الموقع:</span>
                  <span className="text-gray-900 text-sm">عمّان - الدوار الخامس</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">التاريخ:</span>
                  <span className="text-gray-900 text-sm">{formatDate(date)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">الوقت:</span>
                  <span className="text-gray-900 text-sm">{formatTime(time)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">نوع الاستشارة:</span>
                  <span className="text-gray-900 text-sm">
                    {visitType === 'clinic' ? 'زيارة العيادة' : 'زيارة منزلية'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">السعر:</span>
                  <span className="text-gray-900 font-bold">
                    {visitType === 'clinic' ? '30' : '35'} دينار أردني
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">رقم الهاتف:</span>
                  <span className="text-gray-900 text-sm">+962 7 9837 6025</span>
                </div>
              </div>

              <button
                onClick={handleChangeTime}
                className="w-full mt-6 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-300 font-medium"
              >
                اختر وقت آخر
              </button>
            </div>
          </div>

          {/* Personal Information Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">المعلومات الشخصية</h2>

              <div className="space-y-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الأول</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="أحمد"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">العائلة</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="محمد"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                  <div className="flex space-x-2 space-x-reverse">
                    <select
                      value={formData.countryCode}
                      onChange={(e) => handleInputChange('countryCode', e.target.value)}
                      className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.code} {country.country}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="7 9999 9999"
                    />
                  </div>
                </div>

                {/* Insurance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اختر التأمين (اختياري)</label>
                  <select
                    value={formData.insurance}
                    onChange={(e) => handleInputChange('insurance', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">اختر شركة التأمين</option>
                    {insuranceOptions.map((insurance) => (
                      <option key={insurance} value={insurance}>
                        {insurance}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3 space-x-reverse">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    لقد قرأت و أقبل{' '}
                    <button
                      onClick={handleTermsClick}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      الأحكام و الشروط
                    </button>
                  </label>
                </div>

                {/* Confirm Button */}
                <button
                  onClick={handleConfirmBooking}
                  disabled={!formData.firstName || !formData.lastName || !formData.phoneNumber || !acceptedTerms}
                  className={`w-full py-4 px-6 rounded-lg font-medium text-lg transition-all ${
                    formData.firstName && formData.lastName && formData.phoneNumber && acceptedTerms
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  تأكيد الحجز
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoPage;