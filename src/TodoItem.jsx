export function TodoItem({ completed, id, title, date, time, priority,addDate, toggleTodo, deleteTodo, editTodo }) {
  let formattedDate = date;
  if (date) {
    try {
      formattedDate = new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch {}
  }
  let formattedTime = time;
  if (time) {
    try {
      const [hour, minute] = time.split(":");
      const d = new Date();
      d.setHours(hour, minute);
      formattedTime = d.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
    } catch {}
  }
  let formattedDateA = addDate;
  let formattedTimeA = "";
  if (addDate) {
    try {
      const d = new Date(addDate);
      formattedDateA = d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      formattedTimeA = d.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
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
        <div className="todo-title">
          {title}
          <div className="todo-timeDate">
            Due: {formattedDate} {formattedTime && `- ${formattedTime}`}
          </div>
          <div className="todo-added">
            Added: {formattedDateA} {formattedTimeA && `- ${formattedTimeA}`}
          </div>
        </div>
      </label>
      <div className="task-buttons">
        <button onClick={() => editTodo(id)} className="btn">Edit</button>
        <button onClick={() => deleteTodo(id)} className="btn btn-danger">
          Delete
        </button>
      </div>
    </li>
  )
}