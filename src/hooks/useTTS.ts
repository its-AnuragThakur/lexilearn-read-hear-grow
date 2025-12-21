import { useState, useEffect, useCallback, useRef } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';

interface TTSOptions {
  text: string;
  onEnd?: () => void;
  onStart?: () => void;
  onPause?: () => void;
  onResume?: () => void;
}

export function useTTS() {
  const { preferences } = useAccessibility();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [currentVoice, setCurrentVoice] = useState<SpeechSynthesisVoice | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const callbacksRef = useRef<{
    onEnd?: () => void;
    onStart?: () => void;
    onPause?: () => void;
    onResume?: () => void;
  }>({});

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      
      // Set preferred voice
      if (preferences.tts_voice) {
        const preferred = availableVoices.find(v => v.name === preferences.tts_voice);
        if (preferred) {
          setCurrentVoice(preferred);
        }
      } else {
        // Default to English voice
        const englishVoice = availableVoices.find(v => v.lang.startsWith('en-'));
        if (englishVoice) {
          setCurrentVoice(englishVoice);
        }
      }
    };

    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
    
    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, [preferences.tts_voice]);

  const speak = useCallback(({ text, onEnd, onStart, onPause, onResume }: TTSOptions) => {
    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    callbacksRef.current = { onEnd, onStart, onPause, onResume };

    // Set voice
    if (currentVoice) {
      utterance.voice = currentVoice;
    }

    // Set rate based on user preference (0.5 - 2.0)
    utterance.rate = preferences.tts_speed;

    // Event handlers
    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      onStart?.();
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      onEnd?.();
    };

    utterance.onerror = (event) => {
      console.error('TTS Error:', event.error);
      setIsPlaying(false);
      setIsPaused(false);
    };

    speechSynthesis.speak(utterance);
  }, [currentVoice, preferences.tts_speed]);

  const pause = useCallback(() => {
    if (isPlaying && !isPaused) {
      speechSynthesis.pause();
      setIsPaused(true);
      callbacksRef.current.onPause?.();
    }
  }, [isPlaying, isPaused]);

  const resume = useCallback(() => {
    if (isPaused) {
      speechSynthesis.resume();
      setIsPaused(false);
      callbacksRef.current.onResume?.();
    }
  }, [isPaused]);

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  const togglePlayPause = useCallback(() => {
    if (isPaused) {
      resume();
    } else if (isPlaying) {
      pause();
    }
  }, [isPlaying, isPaused, pause, resume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  return {
    speak,
    pause,
    resume,
    stop,
    togglePlayPause,
    isPlaying,
    isPaused,
    voices,
    currentVoice,
    setCurrentVoice,
  };
}
