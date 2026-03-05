import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { MdCall, MdClose } from 'react-icons/md';

const PHONE_NUMBER = '+919422283890';
const PHONE_DIGITS = PHONE_NUMBER.replace(/\D/g, '');

const FloatingContactButtons = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isHoveringCall, setIsHoveringCall] = useState(false);
  const [isMobileHintVisible, setIsMobileHintVisible] = useState(false);

  const whatsappUrl = `https://wa.me/${PHONE_DIGITS}`;
  const callUrl = `tel:+${PHONE_DIGITS}`;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 639px)');

    const handleScreenChange = (event: MediaQueryListEvent) => {
      setIsSmallScreen(event.matches);
    };

    setIsSmallScreen(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleScreenChange);

    return () => {
      mediaQuery.removeEventListener('change', handleScreenChange);
    };
  }, []);

  useEffect(() => {
    if (!isSmallScreen) {
      setIsMobileHintVisible(false);
      return;
    }

    let hideTimeout: ReturnType<typeof setTimeout> | null = null;

    const showMessageTemporarily = () => {
      setIsMobileHintVisible(true);

      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }

      hideTimeout = setTimeout(() => {
        setIsMobileHintVisible(false);
      }, 3000);
    };

    const intervalId = setInterval(showMessageTemporarily, 10000);

    return () => {
      clearInterval(intervalId);

      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [isSmallScreen]);

  const shouldShowCallHint = isHoveringCall || isMobileHintVisible;
  const shouldShakeCallIconMobile = isSmallScreen && isMobileHintVisible;
  const shouldShakeCallIconDesktop = !isSmallScreen && isHoveringCall;
  const handleCloseCallHint = () => {
    setIsMobileHintVisible(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-12 h-12 rounded-full bg-green-500 text-white shadow-lg hover:scale-105 transition-transform duration-200 flex items-center justify-center"
      >
        <FaWhatsapp size={28} />
      </a>

      <div
        className="relative"
        onMouseEnter={() => setIsHoveringCall(true)}
        onMouseLeave={() => setIsHoveringCall(false)}
      >
        <div
          className={`absolute right-14 top-1/2 -translate-y-1/2 rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-text-dark shadow-md transition-all duration-300 ease-out ${shouldShowCallHint ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}
        >
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span>Call now</span>
            {isSmallScreen && (
              <button
                type="button"
                onClick={handleCloseCallHint}
                aria-label="Close call message"
                className="text-gray-500 hover:text-text-dark transition-colors"
              >
                <MdClose size={16} />
              </button>
            )}
          </div>
        </div>

        <a
          href={callUrl}
          aria-label="Call now"
          className={`w-12 h-12 rounded-full bg-primary text-white shadow-lg hover:scale-105 transition-transform duration-200 flex items-center justify-center ${shouldShakeCallIconMobile ? 'call-icon-shake' : ''} ${shouldShakeCallIconDesktop ? 'call-icon-shake-once' : ''}`}
        >
          <MdCall size={26} />
        </a>
      </div>
    </div>
  );
};

export default FloatingContactButtons;