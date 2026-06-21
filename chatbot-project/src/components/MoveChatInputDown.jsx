import './MoveChatInputDown.css'

export function MoveChatInputDown({ bottom, setBottom }) {
  function toggleBottom() {
    setBottom(!bottom);
  }

  return (
    <>
      <p
        className="move-text-input"
        onClick={toggleBottom}
      >
        Move textbox to {bottom ? 'top' : 'bottom'}
      </p>
    </>
  )
}