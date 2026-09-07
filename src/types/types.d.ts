declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, unknown>) => void;
      identify: (id: string, data?: Record<string, unknown>) => void;
    };
  }
}

export {};
