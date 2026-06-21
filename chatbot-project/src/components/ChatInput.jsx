import { useState, useEffect } from 'react'
import { Chatbot } from 'supersimpledev'
import dayjs from 'dayjs';
import './ChatInput.css'

export function ChatInput({ chatMessages, setChatMessages, bottom }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    Chatbot.addResponses({
      "what is your name": "My name is Chatbot.",
      "what can you do": "I can chat with you and answer your questions.",
      "how are you": "I'm doing great, thanks for asking!",
      "what is the meaning of life": "The meaning of life is a philosophical question that has been debated throughout history. Some believe it is to seek happiness, while others believe it is to fulfill a purpose or destiny. Ultimately, the meaning of life is subjective and can vary from person to person.",
      "are you always so stupid": "Yes!!"
    });
  }, []);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (inputText === '' || isLoading) {
      return;
    }
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        time: dayjs().format('h:mm A')
      }
    ];

    setChatMessages(newChatMessages);
    setInputText('');
    setIsLoading(true);
    setChatMessages([
      ...newChatMessages,
      {
        message: (
          <img
            height="40px"
            style={{margin: '-10px'}}
            src="https://supersimple.dev/images/loading-spinner.gif"
            alt="Loading Spinner"
          />
        ),
        sender: "robot"
      }
    ]);
    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        time: dayjs().format('h:mm A')
      }
    ]);
    setIsLoading(false);
  }

  function handleKeyDown(event) {
    if (event.value === '' || isLoading) {
      return;
    }
    if (event.key === 'Enter') {
      sendMessage();
    } else if (event.key === 'Escape') {
      setInputText('');
    }
  }

  function clearMessages() {
    localStorage.removeItem('messages');
    setChatMessages([]);
  }

  return (
    <div className={`flex-container input-container${bottom ? ' bottom' : ''}`}>
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        type="text"
        value={inputText}
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={sendMessage}
        className='send-button'
      >Send</button>
      <button onClick={clearMessages}>Clear</button>
    </div>
  );
}