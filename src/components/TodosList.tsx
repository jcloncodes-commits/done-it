import { useEffect, useRef } from "react";
import type { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";


interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodosList:React.FC<Props> = ({todos, setTodos}) => {

    const activeRef = useRef<HTMLDivElement>(null);
    const completedRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    const activeEl = activeRef.current;
    const completedEl = completedRef.current;
    if (!activeEl || !completedEl) return;

    // Active list drop target
    const cleanupActive = dropTargetForElements({
      element: activeEl,
      getData: () => ({ type: "active-list" }),
      onDrop({ source }) {
        const data = source.data as Record<string, unknown>;
        const id = data.id as number;

        // When dropped on Active list → mark as not done
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? { ...t, isDone: false } : t))
        );
      },
    });

    // Completed list drop target
    const cleanupCompleted = dropTargetForElements({
      element: completedEl,
      getData: () => ({ type: "completed-list" }),
      onDrop({ source }) {
        const data = source.data as Record<string, unknown>;
        const id = data.id as number;

        // When dropped on Completed list → mark as done
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? { ...t, isDone: true } : t))
        );
      },
    });

    // Cleanup on unmount
    return () => {
      cleanupActive();
      cleanupCompleted();
    };
  }, [setTodos]);
    
    return (
        <div className="container">
            <div ref={activeRef} className="todo">
                <span className="todo__heading">Active tasks</span>
                {todos.filter((t) => !t.isDone)
                .map((v) => (
                    <SingleTodo v={v} key={v.id} todos={todos} setTodos={setTodos} />
                ))}
            </div>
            <div ref={completedRef} className="todo remove ">
                <span className="todo__heading">Completed tasks</span> 
                {todos
                    .filter((t) => t.isDone)
                    .map((v) => (
                        <SingleTodo v={v} key={v.id} todos={todos} setTodos={setTodos} />
                ))}
            </div>
        </div>
  )
}

export default TodosList
