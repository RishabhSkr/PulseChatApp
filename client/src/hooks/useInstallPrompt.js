// 🔵 BLUE BELT: Custom hook to handle PWA Install Prompt
// The browser fires "beforeinstallprompt" when PWA criteria are met.
// We capture it and let the user trigger install from OUR button.

import { useState, useEffect } from 'react';

const useInstallPrompt = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Capture the browser's install prompt event
    const handleBeforeInstall = (e) => {
      e.preventDefault(); // Stop the default browser mini-bar
      setInstallPrompt(e); // Save it for later
      console.log('[PWA] Install prompt captured');
    };

    // Detect if app was installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
      console.log('[PWA] App installed successfully!');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if already running as installed PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Function to trigger the install dialog
  const promptInstall = async () => {
    if (!installPrompt) return false;

    installPrompt.prompt(); // Show the native install dialog
    const result = await installPrompt.userChoice;
    
    if (result.outcome === 'accepted') {
      console.log('[PWA] User accepted install');
      setIsInstalled(true);
    }
    setInstallPrompt(null);
    return result.outcome === 'accepted';
  };

  return {
    isInstallable: !!installPrompt,  // true if we CAN show install prompt
    isInstalled,                      // true if already installed
    promptInstall,                    // call this to trigger install dialog
  };
};

export default useInstallPrompt;
