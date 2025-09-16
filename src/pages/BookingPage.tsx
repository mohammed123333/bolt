import React, { useEffect, useState } from 'react';
import { Star, Phone, MessageCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { doctorData } from '../data/doctorData';
import LanguageToggle from '../components/LanguageToggle';

const BookingPage = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { doctorId } = useParams<{ doctorId: string }>();

  const doctor = doctorData[doctorId as keyof typeof doctorData];

  const [selectedVisitType, setSelectedVisitType] = useState<'clinic' | 'home'>('clinic');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // ✅ Scroll to top on mount
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

  // Generate available dates (next 30 days, skip Fridays)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      if (date.getDay() !== 5) {
        dates.push({
          date: date.toISOString().split('T')[0],
          display: date.toLocaleDateString('ar-JO', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        });
      }
    }
    return dates;
  };

  // Generate time slots
  const generateTimeSlots = (selectedDate: string) => {
    const slots = [];
    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay();

    const startHour = 12;
    const startMinute = 30;
    const endHour = dayOfWeek === 4 ? 14 : 18; // Thursday has 2 PM, others 6 PM
    const endMinute = 45;

    let currentHour = startHour;
    let currentMinute = startMinute;

    while (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute)) {
      const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute
        .toString()
        .padStart(2, '0')}`;
      const displayTime =
        currentHour >= 12
          ? `${currentHour === 12 ? 12 : currentHour - 12}:${currentMinute
              .toString()
              .padStart(2, '0')} م`
          : `${currentHour}:${currentMinute.toString().padStart(2, '0')} ص`;

      slots.push({ time: timeString, display: displayTime });

      currentMinute += 15;
      if (currentMinute >= 60) {
        currentMinute = 0;
        currentHour += 1;
      }
    }
    return slots;
  };

  const handleContinueBooking = () => {
    if (selectedDate && selectedTime) {
      navigate(`/${doctorId}/personal-info`, {
        state: { visitType: selectedVisitType, date: selectedDate, time: selectedTime },
      });
    }
  };

  const availableDates = generateAvailableDates();
  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : [];

  return (
    <div
      className="min-h-screen bg-gray-50 py-8"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4 space-x-reverse">
            <img
              src="/images/logo.png"
              alt="طب جو"
              className="h-16 w-auto cursor-pointer"
              onClick={() => navigate('/')}
            />
            <a 
              href="tel:+962797942027" 
              className={`flex items-center ${language === 'ar' ? 'space-x-2 space-x-reverse' : 'space-x-2'} bg-blue-500 hover:bg-blue-400 px-3 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105`}
              title={language === 'ar' ? 'اتصل الآن' : 'Call Now'}
            >
              <Phone size={18} className="text-white" />
              <span className="text-white font-semibold text-sm">
                {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
              </span>
            </a>
          </div>
          <LanguageToggle />
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
          {/* Doctor Card */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-6 lg:sticky lg:top-8">
              <div className="text-center mb-6">
                <img
                  src={doctor.image}
                  alt={data.name}
                  className="w-16 h-16 lg:w-24 lg:h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg lg:text-xl font-bold text-gray-900">{data.name}</h3>
                <p className="text-blue-600 font-medium text-sm lg:text-base">
                  {data.specialty}
                </p>
              </div>

              <div className="space-y-2 lg:space-y-3 text-sm lg:text-base">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('rating')}:</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('location')}:</span>
                  <span
                    className={`text-gray-900 ${
                      language === 'ar' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {doctor.location[language]}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('price')}:</span>
                  <span
                    className={`text-gray-900 ${
                      language === 'ar' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {selectedVisitType === 'clinic'
                      ? doctor.priceClinic
                      : doctor.priceHome}{' '}
                    {t('jordanianDinar')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 lg:mb-8">
                {t('bookingTitle')}
              </h2>

              {/* Visit Type */}
              <div className="mb-6 lg:mb-8">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">
                  {t('visitType')}
                </h3>
                <div
                  className={`flex ${
                    language === 'ar' ? 'space-x-4 space-x-reverse' : 'space-x-4'
                  }`}
                >
                  <button
                    onClick={() => setSelectedVisitType('clinic')}
                    className={`flex-1 py-2 lg:py-3 px-3 lg:px-4 rounded-lg border-2 transition-all text-sm lg:text-base ${
                      selectedVisitType === 'clinic'
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-700 hover:border-blue-300'
                    }`}
                  >
                    {t('clinicVisit')}
                  </button>
                  {doctor.priceHome !== '_' && doctor.priceHome ? (
                    <button
                      onClick={() => setSelectedVisitType('home')}
                      className={`flex-1 py-2 lg:py-3 px-3 lg:px-4 rounded-lg border-2 transition-all text-sm lg:text-base ${
                        selectedVisitType === 'home'
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 text-gray-700 hover:border-blue-300'
                      }`}
                    >
                      {t('homeVisit')}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex-1 py-2 lg:py-3 px-3 lg:px-4 rounded-lg border-2 border-gray-300 text-gray-400 cursor-not-allowed text-sm lg:text-base"
                    >
                      {t('homeVisit')}
                    </button>
                  )}
                </div>
              </div>

              {/* Date */}
              <div className="mb-6 lg:mb-8">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">
                  {t('selectDate')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-3 max-h-60 overflow-y-auto">
                  {availableDates.map((dateOption) => (
                    <button
                      key={dateOption.date}
                      onClick={() => setSelectedDate(dateOption.date)}
                      className={`p-2 lg:p-3 rounded-lg border-2 text-right transition-all text-sm lg:text-base ${
                        selectedDate === dateOption.date
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 text-gray-700 hover:border-blue-300'
                      }`}
                    >
                      {language === 'ar'
                        ? dateOption.display
                        : new Date(dateOption.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time */}
              {selectedDate && (
                <div className="mb-6 lg:mb-8">
                  <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">
                    {t('selectTime')}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3 max-h-60 overflow-y-auto">
                    {timeSlots.map((timeOption) => (
                      <button
                        key={timeOption.time}
                        onClick={() => setSelectedTime(timeOption.time)}
                        className={`p-2 lg:p-3 rounded-lg border-2 transition-all text-sm lg:text-base ${
                          selectedTime === timeOption.time
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-300 text-gray-700 hover:border-blue-300'
                        }`}
                      >
                        {language === 'ar' ? timeOption.display : timeOption.time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Continue */}
              <button
                onClick={handleContinueBooking}
                disabled={!selectedDate || !selectedTime}
                className={`w-full py-3 lg:py-4 px-4 lg:px-6 rounded-lg font-medium text-base lg:text-lg transition-all ${
                  selectedDate && selectedTime
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {t('bookAppointment')}
              </button>
            </div>
          </div>
        </div>

        {/* WhatsApp Button */}
        <button
          onClick={() => window.open('https://wa.me/962797942027', '_blank')}
          className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 z-50"
          title={language === 'ar' ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
