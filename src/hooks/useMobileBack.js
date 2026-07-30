// src/hooks/useMobileBack.js
import { useEffect } from 'react';

export function useMobileBack(isOpen, closeAction) {
  useEffect(() => {
    if (!isOpen) return;
    window.history.pushState({ popupOpen: true }, "");
    const handlePopState = () => { closeAction(); };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isOpen, closeAction]);
}