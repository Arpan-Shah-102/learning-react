import { useAutoScroll } from '../hooks/useAutoScroll';
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css'

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useAutoScroll([chatMessages]);

  if (chatMessages.length === 0) {
    return (
      <div
        className="flex-container message-container"
        ref={chatMessagesRef}
      >
        <p
          className="empty-message"
        >
          Welcome to the chatbot project! Send a message using the textbox below.
        </p>
      </div>
    );
  }
  return (
    <div
      className="flex-container message-container"
      ref={chatMessagesRef}
    >
      {chatMessages.map((chatMessage, index) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            time={chatMessage.time}
            key={index}
          />
        );
      })}
    </div>
  );
}

export default ChatMessages;