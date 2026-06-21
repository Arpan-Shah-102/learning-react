import { useState, useRef, useEffect } from 'react'
import { ChatInput } from './components/ChatInput'
import ChatMessages from './components/ChatMessages'
import { MoveChatInputDown } from './components/MoveChatInputDown'
import './App.css'

function App() {
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem('messages')) || []
  );
  const [bottom, setBottom] = useState(false);
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  if (bottom) {
    return (
      <>
        <ChatMessages
          chatMessages={chatMessages}
        />
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          bottom={bottom}
        />
        <MoveChatInputDown
          bottom={bottom}
          setBottom={setBottom}
        />
      </>
    );
  }
  return (
    <>
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        bottom={bottom}
      />
      <ChatMessages
        chatMessages={chatMessages}
      />
      <MoveChatInputDown
        bottom={bottom}
        setBottom={setBottom}
      />
    </>
  );
}

export default App
