import { memo, useRef, useEffect, useState, useCallback } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const HAS_SPEECH = typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

export const SearchBar = memo(function SearchBar({ value, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const startListening = useCallback(() => {
    if (!HAS_SPEECH) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "zh-TW";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join("");
      onChange(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.onerror = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [onChange]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const toggleVoice = useCallback(() => {
    if (isListening) stopListening();
    else startListening();
  }, [isListening, startListening, stopListening]);

  return (
    <div className="search-bar">
      <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        ref={inputRef}
        type="text"
        placeholder="搜尋魔物名稱 / 拼音 / English...（Ctrl+K）"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
      {HAS_SPEECH && (
        <button
          className={`voice-btn ${isListening ? "listening" : ""}`}
          onClick={toggleVoice}
          aria-label={isListening ? "停止語音輸入" : "語音輸入"}
          title={isListening ? "停止語音輸入" : "語音輸入"}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        </button>
      )}
      {value && (
        <button className="search-clear" onClick={() => onChange("")} aria-label="清除搜尋">
          ✕
        </button>
      )}
    </div>
  );
});
