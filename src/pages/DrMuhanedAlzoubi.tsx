import React from 'react';
import { Star, DollarSign, Home, Clock, MapPin, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DrMuhanedAlzoubi = () => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate('/DrMuhanedAlzoubi/booking');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Doctor Image */}
          <div className="relative h-80 bg-gradient-to-br from-blue-100 to-indigo-200">
            <img 
              src="/images/IMG_8538.jpeg" 
              alt="د. مهند الزعبي"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            {/* Doctor Name */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">د. مهند الزعبي</h1>
            <p className="text-xl text-blue-600 font-semibold mb-6">أخصائي جراحة العظام والمفاصل</p>

            {/* Rating */}
            <div className="flex items-center mb-6">
              <span className="text-lg font-medium text-gray-700 ml-3">التقييم:</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>

            {/* Pricing and Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-gray-600 ml-3" />
                <span className="text-gray-700">30 دينار أردني</span>
              </div>
              
              <div className="flex items-center">
                <Home className="w-5 h-5 text-gray-600 ml-3" />
                <span className="text-gray-700">35 دينار أردني - زيارة منزلية</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-600 ml-3" />
                <span className="text-gray-700">30 دقيقة - مدة الانتظار</span>
              </div>
              
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-600 ml-3" />
                <span className="text-gray-700">عمّان - الدوار الخامس</span>
              </div>
              
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-600 ml-3" />
                <span className="text-gray-700 break-all">+962 7 9837 6025 - للحجز المباشر</span>
              </div>
            </div>

            {/* Specializations */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">التخصصات</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full ml-3"></div>
                  <span className="text-gray-700">استبدال مفصل الورك</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full ml-3"></div>
                  <span className="text-gray-700">عملية إستبدال مفصل الركبة</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full ml-3"></div>
                  <span className="text-gray-700">تجديد مفصل الورك</span>
                </li>
              </ul>
            </div>

            {/* Book Appointment Button */}
            <button
              onClick={handleBookAppointment}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium text-lg"
            >
              احجز موعدك
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrMuhanedAlzoubi;