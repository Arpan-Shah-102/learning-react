import { useRef, useEffect } from 'react'

export function useAutoScroll(dependencies) {
  const chatMessagesRef = useRef(null);
  useEffect(() => {
    const containerElement = chatMessagesRef.current;
    if (containerElement) {
      containerElement.scrollTop = containerElement.scrollHeight;
    }
  }, dependencies);
  return chatMessagesRef;
}