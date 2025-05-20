export function TodoItem({ completed, id, title,date,time,priority, toggleTodo, deleteTodo,editTodo }) {
    let formattedDate = date
    if (date) {
        try {
        formattedDate = new Date(date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric"
         })
    } catch {}
  }
  let formattedTime = time
  if (time) {
    try {
      const [hour, minute] = time.split(":")
      const d = new Date()
      d.setHours(hour, minute)
      formattedTime = d.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit"
      })
    } catch {}
  }

  
    return (
    <li className={`list-item priority-${priority}`} >
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={e => toggleTodo(id, e.target.checked)}
        />
        <div className="todo-info">
        {title}
        <div className="todo-timeDate">
         Due on {formattedDate} at {formattedTime}
         </div>
         </div>
      </label>
      <div className="task-buttons">
      <button onClick={()=>editTodo(id)} className="btn">Edit</button>
      <button onClick={() => deleteTodo(id)} className="btn btn-danger">
        Delete
      </button>
      </div>
    </li>
  )
}