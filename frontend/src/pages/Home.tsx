import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, MapPin, ChevronDown, Trees, Waves, Sparkles, Hotel as HotelIcon, ArrowLeft, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroBackground from '../components/HeroBackground';
import SideNavbar from '../components/SideNavbar';
import RoomCard from '../components/RoomCard';
import BookingModal from '../components/BookingModal';
import ExtensionModal from '../components/ExtensionModal';

import { roomService } from '../services/roomService';
import { hotelService } from '../services/hotelService';
import { bookingService } from '../services/bookingService';
import { authService } from '../services/authService';

const Home: React.FC<{ onAuthClick: () => void }> = ({ onAuthClick }) => {
  const [activeView, setActiveView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(authService.isAuthenticated());
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('india');
  const [searchQuery, setSearchQuery] = useState('');
  const [vibeFilter, setVibeFilter] = useState('All');
  const [bookingRoom, setBookingRoom] = useState<any>(null);
  
  const [hotels, setHotels] = useState<any[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [rooms, setRooms] = useState<any[]>([]);
  
  const [userBookings, setUserBookings] = useState<any[]>([]);
  const [extendingBooking, setExtendingBooking] = useState<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    window.location.reload();
  };

  const locations = ['india', 'Bali, Indonesia', 'Swiss Alps, Switzerland', 'Santorini, Greece', 'Kyoto, Japan', 'Banff, Canada'];
  
  const fetchHotels = async () => {
    try {
      const response = await hotelService.getAllHotels();
      const hotelsData = response.data || [];
      setHotels(hotelsData);
      
      if (hotelsData.length > 0 && !hotelsData.some((h: any) => h.location.toLowerCase().includes(selectedLocation.toLowerCase()))) {
        // Fallback to first hotel location if india is empty
        const firstLoc = hotelsData[0].location;
        if (!locations.includes(firstLoc)) locations.push(firstLoc);
        setSelectedLocation(firstLoc);
      }
    } catch (error) {
      console.error('Failed to fetch hotels:', error);
    }
  };

  const fetchRoomsByHotel = async (hotelId: number) => {
    try {
      const response = await roomService.getRoomsByHotel(hotelId);
      const roomsData = response.data || [];
      const mappedRooms = roomsData.map((room: any) => ({
        id: room.roomId,
        type: room.roomType,
        price: room.pricePerNight,
        rating: room.hotel?.rating || 4.5,
        occupancy: 2, 
        amenities: room.hotel?.amenities ? room.hotel.amenities.split(',') : ['Free WiFi', 'AC'],
        color: room.roomType.toLowerCase().includes('elite') ? 'amber' : room.roomType.toLowerCase().includes('coastal') ? 'indigo' : 'emerald',
        icon: room.roomType.toLowerCase().includes('elite') ? Sparkles : room.roomType.toLowerCase().includes('coastal') ? Waves : Trees,
        location: room.hotel?.location || 'Unknown',
        vibe: room.roomType.toLowerCase().includes('elite') ? 'Luxury' : room.roomType.toLowerCase().includes('coastal') ? 'Coastal' : 'Nature'
      }));
      setRooms(mappedRooms);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    }
  };

  const fetchUserBookings = async () => {
    try {
      const response = await bookingService.getMyBookings();
      const bookings = response.data || [];
      setUserBookings(Array.isArray(bookings) ? bookings : []);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      setUserBookings([]);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    if (activeView === 'bookings') {
      fetchUserBookings();
    }
  }, [activeView]);

  const filteredHotels = useMemo(() => {
    return hotels.filter(hotel => {
      const matchesSearch = hotel.hotelName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = hotel.location.toLowerCase().includes(selectedLocation.toLowerCase());
      return searchQuery ? matchesSearch : matchesLocation;
    });
  }, [searchQuery, selectedLocation, hotels]);

  const handleHotelClick = (hotel: any) => {
    setSelectedHotel(hotel);
    fetchRoomsByHotel(hotel.hotelId);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsLocationOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative min-h-screen flex bg-transparent overflow-x-hidden">
      <HeroBackground />
      <SideNavbar activeView={activeView} setView={(v) => { setActiveView(v); setSelectedHotel(null); }} onProfileClick={onAuthClick} />
      
      <main className="flex-1 relative flex flex-col ml-20 md:ml-24 font-sans selection:bg-red-100 selection:text-red-600">
        <header className="sticky top-0 z-40 bg-white/40 backdrop-blur-xl border-b border-white/20 px-10 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-6 flex-1 max-w-4xl">
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsLocationOpen(!isLocationOpen)} className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm border border-slate-200 px-5 py-3 rounded-2xl hover:border-emerald-400 transition-all text-sm font-bold text-slate-700 shadow-sm">
                <MapPin size={18} className="text-emerald-500" />
                <span className="truncate max-w-[150px]">{selectedLocation}</span>
                <ChevronDown size={16} className="text-slate-400" />
              </button>
              <AnimatePresence>
                {isLocationOpen && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-0 mt-3 w-72 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-100 z-50 overflow-hidden">
                    <div className="p-2">
                      {locations.map(loc => (
                        <button key={loc} onClick={() => { setSelectedLocation(loc); setIsLocationOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-emerald-50 rounded-2xl text-sm text-slate-600 transition-colors flex items-center space-x-3 font-medium">
                          <MapPin size={14} className="text-emerald-400" />
                          <span>{loc}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex-1 flex items-center bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl px-5 py-2 shadow-sm hover:border-amber-400 transition-all group">
              <Search size={20} className="text-slate-400 group-hover:text-amber-500 transition-colors" />
              <input type="text" placeholder="Search your escape..." className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-3 px-4 outline-none font-medium text-slate-700" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>
          <div className="flex items-center space-x-6 ml-8">
            {!isLoggedIn ? (
              <>
                <button onClick={onAuthClick} className="text-sm font-black text-slate-600 hover:text-red-600 transition-colors uppercase">Login</button>
                <button onClick={onAuthClick} className="bg-red-600 text-white px-7 py-3 rounded-2xl text-sm font-black shadow-xl shadow-red-200 hover:bg-red-700 transition-all active:scale-95 uppercase tracking-tighter">Sign Up</button>
              </>
            ) : (
              <button 
                onClick={handleLogout} 
                className="bg-slate-900 text-white px-7 py-3 rounded-2xl text-sm font-black shadow-xl hover:bg-black transition-all active:scale-95 uppercase tracking-tighter"
              >
                Logout
              </button>
            )}
          </div>
        </header>

        {activeView === 'home' && (
          <>
            <section className="px-12 py-20">
              <h1 className="text-8xl md:text-[9rem] font-black text-slate-900 leading-[0.8] tracking-tighter mb-8 text-nowrap">ESCAPE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500 uppercase">the norm.</span></h1>
              <p className="text-slate-500 max-w-xl text-xl font-bold">Curated rebel stays. Reimagined luxury. Your journey starts here.</p>
            </section>

            <section className="px-12 pb-40">
              <div className="flex items-end justify-between mb-16">
                <div>
                  <h2 className="text-5xl font-black text-slate-900 tracking-tight mb-4">
                    {selectedHotel ? selectedHotel.hotelName : 'The Collections'}
                  </h2>
                  <p className="text-slate-500 text-lg font-bold">
                    {selectedHotel ? selectedHotel.location : `Available in ${selectedLocation}`}
                  </p>
                </div>
                {selectedHotel ? (
                  <button 
                    onClick={() => setSelectedHotel(null)}
                    className="flex items-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black shadow-xl hover:bg-black transition-all active:scale-95 uppercase text-xs tracking-widest"
                  >
                    <ArrowLeft size={16} />
                    <span>Back to Hotels</span>
                  </button>
                ) : (
                  <div className="flex space-x-3 bg-slate-100 p-2 rounded-3xl border border-slate-200">
                    {['All', 'Nature', 'Coastal', 'Luxury'].map(t => (
                      <button key={t} onClick={() => setVibeFilter(t)} className={`px-6 py-3 rounded-2xl text-xs font-black transition-all ${vibeFilter === t ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-white'}`}>{t}</button>
                    ))}
                  </div>
                )}
              </div>

              {!selectedHotel ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {filteredHotels.map((hotel, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => handleHotelClick(hotel)}
                      className="group cursor-pointer"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] mb-6 shadow-2xl border-4 border-white transition-all group-hover:scale-[1.02] group-hover:-rotate-1">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                        <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                          <HotelIcon size={64} strokeWidth={1} />
                        </div>
                        <div className="absolute bottom-10 left-10 right-10 z-20">
                          <div className="flex items-center space-x-2 mb-2">
                            <Star className="text-amber-400 fill-amber-400" size={16} />
                            <span className="text-white font-black text-sm">{hotel.rating || '4.8'}</span>
                          </div>
                          <h3 className="text-4xl font-black text-white leading-none tracking-tighter uppercase">{hotel.hotelName}</h3>
                          <p className="text-white/70 font-bold mt-2 flex items-center space-x-2 uppercase text-xs tracking-widest"><MapPin size={12} /> <span>{hotel.location}</span></p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {filteredHotels.length === 0 && <p className="col-span-full py-20 text-center text-slate-400 font-bold text-xl italic">No hotels found in this location...</p>}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {rooms.map((room, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                      <RoomCard {...room} onBook={() => setBookingRoom(room)} />
                    </motion.div>
                  ))}
                  {rooms.length === 0 && <p className="col-span-full py-20 text-center text-slate-400 font-bold text-xl italic">This hotel has no rooms available yet...</p>}
                </div>
              )}
            </section>
          </>
        )}

        {activeView === 'bookings' && (
          <section className="px-12 py-20">
            <h1 className="text-6xl font-black text-slate-900 mb-8 tracking-tighter uppercase">My Bookings</h1>
            <div className="grid grid-cols-1 gap-6">
              {userBookings.map((booking) => (
                <div key={booking.bookingId} className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-white flex justify-between items-center shadow-sm">
                  <div>
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md mb-2 inline-block uppercase tracking-widest">{booking.room?.roomType}</span>
                    <h3 className="text-2xl font-black text-slate-900">{booking.room?.hotel?.hotelName}</h3>
                    <div className="flex space-x-4 mt-2 text-sm font-bold text-slate-500">
                      <p>IN: {booking.checkIn}</p>
                      <p>OUT: {booking.checkOut}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">
                      {booking.status}
                    </div>
                  </div>
                </div>
              ))}
              {userBookings.length === 0 && (
                <div className="bg-white/40 backdrop-blur-lg border border-dashed border-slate-200 p-20 rounded-[3rem] text-center">
                  <p className="text-slate-400 font-bold text-xl italic uppercase tracking-widest opacity-50">No bookings yet. Start your adventure.</p>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <AnimatePresence>
        {bookingRoom && <BookingModal room={bookingRoom} isOpen={!!bookingRoom} onClose={() => setBookingRoom(null)} />}
        {extendingBooking && (
          <ExtensionModal 
            booking={extendingBooking} 
            isOpen={!!extendingBooking} 
            onClose={() => setExtendingBooking(null)} 
            onSuccess={fetchUserBookings}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
