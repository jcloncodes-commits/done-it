import type { Todo } from "../model";
import SingleTodo from "./SingleTodo";

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodosList:React.FC<Props> = ({todos, setTodos}) => {
    
    return (
        <div className="todo">
            {todos.map((v) => ( 
                <SingleTodo  v={v} key={v.id} todos={todos} setTodos={setTodos}/>
            ))}
        </div>
  )
}

export default TodosList
