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
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false}])
      setTodo("")
    } 
 }
 
  return (
    <div className="App">
      <span className="heading">Done It</span>
      <InputField todo={todo} setTodo={setTodo} handleSubmit={handleSubmit}/>
      <TodosList todos={todos} setTodos={setTodos}/>
    </div>
  )
}

export default App
