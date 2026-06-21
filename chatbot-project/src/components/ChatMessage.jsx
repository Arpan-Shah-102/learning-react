// import UserIcon from '../assets/user.png'
import RobotIcon from '../assets/robot.png'
const UserIcon = 'https://supersimple.dev/images/profile-1.jpg';
import './ChatMessage.css'

export function ChatMessage({ message, sender, time }) {
  return(
    <div className={`flex-container ${sender}`}>
      {sender === 'robot' && (
        <img width="50" src={RobotIcon} alt="Robot Icon" />
      )}
      <p>
        {message} <br />
        <span className="time">{time}</span>
      </p>
      {sender === 'user' && (
        <img width="50" src={UserIcon} alt="User Icon" />
      )}
    </div>
  );
}