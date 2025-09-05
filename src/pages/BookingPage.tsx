import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { doctorData } from '../data/doctorData';
import LanguageToggle from '../components/LanguageToggle';
import React, { useState, useEffect } from 'react';  // add useEffect





const BookingPage = () => {
  // inside BookingPage
useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, []);
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { doctorId } = useParams<{ doctorId: string }>();
  
  const doctor = doctorData[doctorId as keyof typeof doctorData];
  
  const [selectedVisitType, setSelectedVisitType] = useState<'clinic' | 'home'>('clinic');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

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
          display: date.toLocaleDateString('ar-JO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
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
      const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
      const displayTime = currentHour >= 12
        ? `${currentHour === 12 ? 12 : currentHour - 12}:${currentMinute.toString().padStart(2, '0')} م`
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
        state: { visitType: selectedVisitType, date: selectedDate, time: selectedTime }
      });
    }
  };

  const availableDates = generateAvailableDates();
  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : [];

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <img src="/images/logo.png" alt="طب جو" className="h-16 w-auto" />
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
                <h3 className="text-lg lg:text-xl font-bold text-gray-900">
                  {data.name}
                </h3>
                <p className="text-blue-600 font-medium text-sm lg:text-base">
                  {data.specialty}
                </p>
              </div>

              <div className="space-y-2 lg:space-y-3 text-sm lg:text-base">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('rating')}:</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('location')}:</span>
                  <span className={`text-gray-900 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {doctor.location[language]}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('price')}:</span>
                  <span className={`text-gray-900 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {selectedVisitType === 'clinic' ? doctor.priceClinic : doctor.priceHome} {t('jordanianDinar')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 lg:mb-8">{t('bookingTitle')}</h2>

              {/* Visit Type */}
              <div className="mb-6 lg:mb-8">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">{t('visitType')}</h3>
                <div className={`flex ${language === 'ar' ? 'space-x-4 space-x-reverse' : 'space-x-4'}`}>
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
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">{t('selectDate')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-3 max-h-60 overflow-y-auto">
                  {availableDates.map(dateOption => (
                    <button
                      key={dateOption.date}
                      onClick={() => setSelectedDate(dateOption.date)}
                      className={`p-2 lg:p-3 rounded-lg border-2 text-right transition-all text-sm lg:text-base ${
                        selectedDate === dateOption.date
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 text-gray-700 hover:border-blue-300'
                      }`}
                    >
                      {language === 'ar' ? dateOption.display : new Date(dateOption.date).toLocaleDateString('en-US', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time */}
              {selectedDate && (
                <div className="mb-6 lg:mb-8">
                  <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">{t('selectTime')}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3 max-h-60 overflow-y-auto">
                    {timeSlots.map(timeOption => (
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
      </div>
    </div>
  );
};

export default BookingPage;