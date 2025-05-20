import { useEffect } from "react"

export function Toast({ message, onUndo, onClose, duration = 4000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  return (
    <div className="toast">
      <span>{message}</span>
      <button className="btn" onClick={onUndo} style={{ marginLeft: "1em" }}>Undo</button>
    </div>
  )
}