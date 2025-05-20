import { useState } from "react"

export function EditTodoPopup({ todo, onClose, onSave }) {
  const [title, setTitle] = useState(todo.title)
  const [date, setDate] = useState(todo.date)
  const [time, setTime] = useState(todo.time)
  const [priority, setPriority] = useState(todo.priority)

  function handleSubmit(e) {
    e.preventDefault()
    onSave({ ...todo, title, date, time, priority })
    onClose()
  }

  return (
    <div className="popup-backdrop">
      <div className="popup">
        <form onSubmit={handleSubmit} className="new-item-form">
          <h2>Edit Todo</h2>
          <label className="form-row">
            Title </label>
            <input value={title} onChange={e => setTitle(e.target.value)} />
         
          <fieldset>
          <legend>Date and Time</legend>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            <input type="time" value={time} onChange={e => setTime(e.target.value)} />
          </fieldset>
          <label>
            Priority
             </label>
            <select value={priority} onChange={e => setPriority(e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

          <div className="popup-buttons">
            <button type="button" className="btn btn-danger" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn">Save</button>
            
          </div>
        </form>
      </div>
    </div>
  )
}