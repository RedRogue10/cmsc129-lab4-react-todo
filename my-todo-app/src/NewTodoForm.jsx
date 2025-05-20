import { useState } from "react"

export function NewTodoForm({ onSubmit}) {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const[priority, setPriority] = useState("low")
    
  function handleSubmit(e) {
    e.preventDefault()
    if (title === "") return
    if (date === "") return
    if (time === "") return
    onSubmit(title, date, time, priority)

    setTitle("")
    setDate("")
    setTime("")
    setPriority("low")
}

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Task</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text"
          id="item"
        />
      </div>
        <fieldset>
        <legend>Date and Time</legend>        
        <input type="date"
        value={date}
        onChange={e => setDate(e.target.value)}/>
        <input type="time"
        value = {time}
        onChange={e => setTime(e.target.value)}/>
        </fieldset>
        <label htmlFor="priority">Priority</label>
        <select id="priority" value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          </select>

      
      <button className="btn">Add</button>
    </form>
  )
}