import React, { useState } from 'react';
import { Star, DollarSign, MapPin, Phone, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookingPage = () => {
  const navigate = useNavigate();
  const [selectedVisitType, setSelectedVisitType] = useState<'clinic' | 'home'>('clinic');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Generate available dates (next 30 days, excluding Fridays)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip Fridays (day 5)
      if (date.getDay() !== 5) {
        dates.push({
          date: date.toISOString().split('T')[0],
          display: date.toLocaleDateString('ar-JO', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
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
    
    // Thursday (4) has different hours: 12:30 PM - 2:45 PM
    // Other days: 12:30 PM - 6:45 PM
    const startHour = 12;
    const startMinute = 30;
    const endHour = dayOfWeek === 4 ? 14 : 18; // 2 PM or 6 PM
    const endMinute = 45;
    
    let currentHour = startHour;
    let currentMinute = startMinute;
    
    while (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute)) {
      const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
      const displayTime = currentHour >= 12 
        ? `${currentHour === 12 ? 12 : currentHour - 12}:${currentMinute.toString().padStart(2, '0')} م`
        : `${currentHour}:${currentMinute.toString().padStart(2, '0')} ص`;
      
      slots.push({
        time: timeString,
        display: displayTime
      });
      
      // Add 15 minutes
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
      navigate('/DrMuhanedAlzoubi/personal-info', {
        state: {
          visitType: selectedVisitType,
          date: selectedDate,
          time: selectedTime
        }
      });
    }
  };

  const availableDates = generateAvailableDates();
  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : [];

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Doctor Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <img 
                  src="/images/IMG_8538.jpeg" 
                  alt="د. مهند الزعبي"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900">د. مهند الزعبي</h3>
                <p className="text-blue-600 font-medium">أخصائي جراحة العظام والمفاصل</p>
              </div>

              <div className="space-y-3">
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
                  <span className="text-gray-900">عمّان - الدوار الخامس</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">السعر:</span>
                  <span className="text-gray-900">
                    {selectedVisitType === 'clinic' ? '30' : '35'} دينار أردني
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">احجز موعدك</h2>

              {/* Visit Type Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">نوع الزيارة</h3>
                <div className="flex space-x-4 space-x-reverse">
                  <button
                    onClick={() => setSelectedVisitType('clinic')}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      selectedVisitType === 'clinic'
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-700 hover:border-blue-300'
                    }`}
                  >
                    زيارة العيادة
                  </button>
                  <button
                    onClick={() => setSelectedVisitType('home')}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      selectedVisitType === 'home'
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-700 hover:border-blue-300'
                    }`}
                  >
                    زيارة منزلية
                  </button>
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">اختر التاريخ</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                  {availableDates.map((dateOption) => (
                    <button
                      key={dateOption.date}
                      onClick={() => setSelectedDate(dateOption.date)}
                      className={`p-3 rounded-lg border-2 text-right transition-all ${
                        selectedDate === dateOption.date
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 text-gray-700 hover:border-blue-300'
                      }`}
                    >
                      {dateOption.display}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">اختر الوقت</h3>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3 max-h-60 overflow-y-auto">
                    {timeSlots.map((timeOption) => (
                      <button
                        key={timeOption.time}
                        onClick={() => setSelectedTime(timeOption.time)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedTime === timeOption.time
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-300 text-gray-700 hover:border-blue-300'
                        }`}
                      >
                        {timeOption.display}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Continue Button */}
              <button
                onClick={handleContinueBooking}
                disabled={!selectedDate || !selectedTime}
                className={`w-full py-4 px-6 rounded-lg font-medium text-lg transition-all ${
                  selectedDate && selectedTime
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                احجز موعدك
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;