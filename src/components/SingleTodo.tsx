import { useEffect, useRef, useState } from "react"
import type { Todo } from "../model"
import {draggable, dropTargetForElements} from '@atlaskit/pragmatic-drag-and-drop/element/adapter' 
import {combine} from '@atlaskit/pragmatic-drag-and-drop/combine'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'
import { createPortal } from "react-dom"
 

type Props = {
    v: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
}
const SingleTodo:React.FC<Props> = ({v, todos, setTodos}) => {
    const [ edit, setEdit ] = useState<boolean>(false)
    const [ todosEdit, setTodosEdit] = useState<string>(v.todo) 
    const [isDragging, setDragging] = useState<boolean>(false)
    const [preview, setPreview] = useState<HTMLElement | null>(null)

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

    const inputRef = useRef<HTMLInputElement>(null)
    
    useEffect(() => {
        inputRef.current?.focus();
    },[edit])
    
    const ref = useRef<HTMLFormElement>(null)
    useEffect(() => {
        const element = ref.current;
        if(!element){
            return
        }  

        return combine(
        draggable({
            element,
            getInitialData() {
                return { ...v } as Record<string, unknown>;
            },
            onDragStart() {
                setDragging(true);  
            },
            onGenerateDragPreview: ({ nativeSetDragImage }) => {
                setCustomNativeDragPreview({
                    render({ container }) {
                        setPreview(container)
                        // ReactDOM.render(<Preview item={item} />, container);
                        // return function cleanup() {
                        //     ReactDOM.unmountComponentAtNode(container);
                        // };
                    },
                    nativeSetDragImage,
                });
            },
            onDrop() {
                setDragging(false) 
                setPreview(null)
            }, 
        }),
        dropTargetForElements({
            element,
            getData(){
                return { ...v } as Record<string, unknown>;
            }, 
            onDrop({source, self}){
                console.log(source.data.id, self.data.id) 
            }
        })
    )  
    },[v])

  return (
    <form ref={ref} className={`todo__list ${isDragging ? "opacity-50" : ""}`} onSubmit={(e) => handleSubmit(e, v.id)}>
        {
            edit ? (
                <input ref={inputRef} value={todosEdit} onChange={(e)=> setTodosEdit(e.target.value)}/>
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
        {preview && createPortal(<Preview v={v}/>, preview)}
      </div>
    </form>
  )
}

export default SingleTodo

const Preview = ({v} : {v: Todo}) => {
    return(
        <div>
            {v.todo}
            {v.id}
        </div>
    )
}
