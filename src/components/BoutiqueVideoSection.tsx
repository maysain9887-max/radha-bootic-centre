import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, MapPin, Clock, Scissors } from 'lucide-react';

interface BoutiqueVideoSectionProps {
  onOpenBooking: () => void;
  videoRefExternal?: React.RefObject<HTMLVideoElement | null>;
}

export const BoutiqueVideoSection: React.FC<BoutiqueVideoSectionProps> = ({
  videoRefExternal,
}) => {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const videoRef = videoRefExternal || localVideoRef;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onVolumeChange = () => setIsMuted(video.muted);

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('volumechange', onVolumeChange);

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('volumechange', onVolumeChange);
    };
  }, [videoRef]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  return (
    <section
      id="studio-3d"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFF8F0] via-[#FAF3EC] to-[#FFF8F0] border-y border-[#0F4C3F]/10 overflow-hidden"
    >
      {/* Decorative ambient blurs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#E91E63]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#0F4C3F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0F4C3F]">
            Radha Bootic Centre — Exclusive Video Tour
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Watch our official boutique introduction: 15 Years of Trust, 4,000+ Happy Sisters, Blouse Stitching from Rs. 100, and Jaipur's Most Trusted Ladies Tailoring!
          </p>
        </div>

        {/* Video Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Main Video Player Column */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-black group">
              {/* HTML5 Video */}
              <video
                ref={videoRef}
                src="/assets/aistudio/gemini_generated_video_b3867765_b3972bbc.mp4"
                playsInline
                preload="metadata"
                onClick={togglePlay}
                onTimeUpdate={handleTimeUpdate}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full aspect-9/16 max-h-[640px] object-cover cursor-pointer bg-black"
              />

              {/* Top Video Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-white text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>Radha Bootic Centre • Jaipur</span>
              </div>

              {/* Play/Pause Center Overlay (when paused) */}
              {!isPlaying && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 bg-black/35 flex items-center justify-center cursor-pointer transition-opacity z-10"
                >
                  <button
                    type="button"
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#E91E63] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition transform border-4 border-white cursor-pointer"
                    aria-label="Play Video"
                  >
                    <Play className="w-8 h-8 sm:w-9 sm:h-9 ml-1 fill-white" />
                  </button>
                </div>
              )}

              {/* Bottom Custom Video Controls */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 z-20 opacity-90 group-hover:opacity-100 transition">
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-white/30 rounded-full mb-3 overflow-hidden cursor-pointer">
                  <div
                    className="h-full bg-[#E91E63] transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-white text-xs">
                  <button
                    onClick={togglePlay}
                    className="p-1.5 rounded-lg hover:bg-white/20 transition flex items-center gap-1.5 font-semibold cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                    <span>{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleMute}
                      className="p-1.5 rounded-lg hover:bg-white/20 transition cursor-pointer"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={toggleFullScreen}
                      className="p-1.5 rounded-lg hover:bg-white/20 transition cursor-pointer"
                      title="Full Screen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Highlights Column */}
          <div className="lg:col-span-5 space-y-5">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F4C3F] leading-tight">
              Every Sister's First Choice — Perfect Fitting & Honest Rates
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed">
              Featured in our video tour: Designer blouses, wedding lehengas, kurti suits, custom embroidery, and professional ladies tailoring classes!
            </p>

            {/* Video Rate Cards Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white border border-[#0F4C3F]/15 shadow-xs">
                <span className="text-[11px] text-gray-500 font-medium block">Blouse Stitching</span>
                <span className="text-base font-bold text-[#0F4C3F]">Rs. 100 – 200</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-[#0F4C3F]/15 shadow-xs">
                <span className="text-[11px] text-gray-500 font-medium block">Lehenga Stitching</span>
                <span className="text-base font-bold text-[#0F4C3F]">Rs. 700 – 1,000</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-[#0F4C3F]/15 shadow-xs">
                <span className="text-[11px] text-gray-500 font-medium block">Suit & Kurti</span>
                <span className="text-base font-bold text-[#0F4C3F]">Rs. 300</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#E91E63]/10 border border-[#E91E63]/20 shadow-xs">
                <span className="text-[11px] text-[#E91E63] font-bold block">Tailoring Classes</span>
                <span className="text-base font-bold text-[#E91E63]">Rs. 1,000 / month</span>
              </div>
            </div>

            {/* Location & Timings Badge */}
            <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0F4C3F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-900">Visit Boutique:</span>
                  <p className="text-gray-600 font-medium">Plot No. 35, Near 7A, Manohar Vihar, Agra Road, Jaipur</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-900">Hours:</span>
                  <p className="text-gray-600">Monday to Saturday: 10:00 AM – 8:30 PM</p>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={togglePlay}
                className="btn-shimmer inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E91E63] hover:bg-[#c2185b] text-white text-xs font-bold shadow-md hover:shadow-lg transition transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                {isPlaying ? 'Pause Video' : 'Play Video'}
              </button>
              <a
                href="https://wa.me/919950055657?text=Namaste%20Radha%20Bootic%20Centre,%20I%20watched%20your%20video%20tour%20and%20want%20to%20enquire%20about%20your%20stitching%20services."
                target="_blank"
                rel="noreferrer"
                className="btn-shimmer inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0F4C3F] hover:bg-[#0A382E] text-white text-xs font-bold shadow-md hover:shadow-lg transition transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Scissors className="w-4 h-4 text-[#D4AF37]" />
                Enquire on WhatsApp (+91 99500 55657)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
