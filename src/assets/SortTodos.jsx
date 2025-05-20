import { useState } from "react"

export function SortTodos({ onSort }) {
  const [sortBy, setSortBy] = useState("dateAdded")
  const [order, setOrder] = useState("asc")

  function handleSort(e) {
    e.preventDefault()
    onSort(sortBy, order)
  }

  return (
    <form style={{ display: "flex", gap: "1em", alignItems: "center", marginBottom: "1em" }} onSubmit={handleSort}>
      <label>
        Sort By:
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="dateAdded">Date Added</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select> 
      </label>
      <label>
        Order:
        <select value={order} onChange={e => setOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
      <button className="btn" type="submit">Sort</button>
    </form>
  )
}