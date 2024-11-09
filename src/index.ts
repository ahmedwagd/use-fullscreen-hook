import { useState, useCallback, useEffect, RefObject } from 'react';

type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
};

type FullscreenDocument = Document & {
  webkitExitFullscreen?: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
  webkitFullscreenElement?: Element | null;
  mozFullScreenElement?: Element | null;
  msFullscreenElement?: Element | null;
};

interface FullscreenApi {
  isFullscreen: boolean;
  enter: () => void;
  exit: () => void;
  toggle: () => void;
}

function useFullscreen(elementRef: RefObject<FullscreenElement>): FullscreenApi {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const isElementInFullscreen = () => {
    const doc = document as FullscreenDocument;
    return !!(
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement
    );
  };

  const enter = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;

    const requestFullscreen = async () => {
      try {
        if (element.requestFullscreen) {
          await element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
          await element.webkitRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
          await element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          await element.msRequestFullscreen();
        }
        setIsFullscreen(true);
      } catch (error) {
        console.error('Failed to enter fullscreen:', error);
      }
    };

    requestFullscreen();
  }, [elementRef]);

  const exit = useCallback(() => {
    const doc = document as FullscreenDocument;

    const exitFullscreen = async () => {
      try {
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        } else if (doc.mozCancelFullScreen) {
          await doc.mozCancelFullScreen();
        } else if (doc.msExitFullscreen) {
          await doc.msExitFullscreen();
        }
        setIsFullscreen(false);
      } catch (error) {
        console.error('Failed to exit fullscreen:', error);
      }
    };

    exitFullscreen();
  }, []);

  const toggle = useCallback(() => {
    if (isFullscreen) {
      exit();
    } else {
      enter();
    }
  }, [isFullscreen, enter, exit]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(isElementInFullscreen());
    };

    // Add event listeners for fullscreen changes
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    // Check initial fullscreen state
    setIsFullscreen(isElementInFullscreen());

    // Cleanup event listeners
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  return {
    isFullscreen,
    enter,
    exit,
    toggle,
  };
}

export default useFullscreen;
