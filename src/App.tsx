import { useState } from 'react'
import './App.css'
import InputField from './components/InputField'
import type { Todo } from './model'
import TodosList from './components/TodosList'

const App: React.FC = () => {
 const [todo, setTodo] = useState<string>("")
 const [todos, setTodos] = useState<Todo[]>([])

 const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(todo){
      setTodos([...todos, { id: Date.now(), todo: todo, isOngoing: false, isDone: false}])
      setTodo("")
    } 
 }
 
  return (
    <div className="App">
      <div className="brand">
        <h1><span style={{textDecoration:"line-through"}}>Im</span>possible</h1>
        <p>Breakdown your goal to tiny habits that lead to compound effects</p>
      </div>
      <InputField todo={todo} setTodo={setTodo} handleSubmit={handleSubmit}/>
      <TodosList todos={todos} setTodos={setTodos}/>
    </div>
  )
}

export default App
