import { useState } from "react"
import type { Todo } from "../model"

type Props = {
    v: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
}
const SingleTodo:React.FC<Props> = ({v, todos, setTodos}) => {
    const [ edit, setEdit ] = useState<boolean>(false)
    const [ todosEdit, setTodosEdit] = useState<string>(v.todo) 

    const handleDone = (id: number) => {
        setTodos(
            todos.map((todo) =>
                 todo.id === id ? {...todo, isDone: !todo.isDone } : todo))
    }
    const handleDelete = (id: number) => {
        setTodos(
            todos.filter((todo) => todo.id !== id)
        )
    }

    const handleSubmit = (e:React.FormEvent, id: number) => {
        e.preventDefault()
        setTodos(
            todos.map((todo) =>
            todo.id === id ? {...todo, todo: todosEdit, isDone: false} : todo )
        );
        setEdit(false);
    } 
  return (
    <form className="todo__list" onSubmit={(e) => handleSubmit(e, v.id)}>
        {
            edit ? (
                <input value={todosEdit} onChange={(e)=> setTodosEdit(e.target.value)}/>
            ) : ( v.isDone ?  (
                <s className="todo__list_text">{v.todo}</s>
            ) : (
                <span className="todo__list_text">{v.todo}</span>
            ))

        } 


      <div className="todo__action">
        <button type="button" onClick={()=> {
            if(!v.isDone) {
                setEdit((prev) => !prev);
            }    
        }}>Edit</button>
        
        <button onClick={()=>handleDone(v.id)}>Mark as Done</button>
        <button onClick={()=>handleDelete(v.id)}>Delete</button>
      </div>
    </form>
  )
}

export default SingleTodo
