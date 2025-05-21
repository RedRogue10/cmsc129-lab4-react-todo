import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import "./styles.css"
import { TodoList } from "./TodoList"
import { EditTodoPopup } from "./EditTodoPopup"
import { SortTodos } from "./SortTodos"
import { Toast } from "./Toast"

export default function App() {
  const [sortBy, setSortBy] = useState("dateAdded");
const [order, setOrder] = useState("asc");
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []
    return JSON.parse(localValue)
  })

  const [editingTodo, setEditingTodo] = useState(null)
  const [toast, setToast] = useState(null)
  const [lastDeleted, setLastDeleted] = useState(null)

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title, date, time, priority) {
    setTodos(currentTodos => [
      ...currentTodos,
      { id: crypto.randomUUID(), title, completed: false, date, time, priority, addDate: Date.now() },
    ])
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, completed } : todo
      )
    )
  }

function deleteTodo(id) {
    setTodos(currentTodos => {
      const todoToDelete = currentTodos.find(todo => todo.id === id)
      setLastDeleted(todoToDelete)
      setToast({
        message: `Deleted "${todoToDelete.title}"`,
      })
      return currentTodos.filter(todo => todo.id !== id)
    })
  }
  function handleUndo() {
    if (lastDeleted) {
      setTodos(currentTodos => [lastDeleted, ...currentTodos])
      setLastDeleted(null)
      setToast(null)
    }
  }

  function handleToastClose() {
    setToast(null)
    setLastDeleted(null)
  }
  function startEditTodo(id) {
    const todo = todos.find(t => t.id === id)
    setEditingTodo(todo)
  }

  function saveEditedTodo(updatedTodo) {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
    )
  }
  function getSortedTodos(todos, sortBy, order) {
  const sorted = [...todos];
  if (sortBy === "dateAdded") {
    sorted.sort((a, b) => {
      const aVal = a.addDate || 0;
      const bVal = b.addDate || 0;
      return order === "asc" ? aVal - bVal : bVal - aVal;
    });
  }else if (sortBy === "dueDate") {
    sorted.sort((a, b) => {
      const aVal = (a.date || "") + " " + (a.time || "");
      const bVal = (b.date || "") + " " + (b.time || "");
      if (aVal < bVal) return order === "asc" ? -1 : 1;
      if (aVal > bVal) return order === "asc" ? 1 : -1;
      return 0;
    });
  } else if (sortBy === "priority") {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    sorted.sort((a, b) => {
      const aVal = priorityOrder[a.priority] || 0;
      const bVal = priorityOrder[b.priority] || 0;
      return order === "asc" ? aVal - bVal : bVal - aVal;
    });
  }
  return sorted;
}

  return (
    <>
      <h1 className="header">Todo App</h1>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <SortTodos
  sortBy={sortBy}
  setSortBy={setSortBy}
  order={order}
  setOrder={setOrder}
/>
     <TodoList
  todos={getSortedTodos(todos, sortBy, order)}
  toggleTodo={toggleTodo}
  deleteTodo={deleteTodo}
  editTodo={startEditTodo}
/>
      {editingTodo && (
        <EditTodoPopup
          todo={editingTodo}
          onClose={() => setEditingTodo(null)}
          onSave={saveEditedTodo}
        />
      )}
        {toast && (
        <Toast
          message={toast.message}
          onUndo={handleUndo}
          onClose={handleToastClose}
        />
      )}
    </>
  )
}