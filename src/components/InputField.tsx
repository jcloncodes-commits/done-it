import { useRef } from 'react';
import './Input.css'

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.FormEvent) => void;  
}

const InputField: React.FC<Props> = ({todo, setTodo, handleSubmit}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div className='input__container'>
      <div className='input__content'>
        <p>Add habit</p>
        <form className="input" 
          onSubmit={(e)=> {
              handleSubmit(e);
              inputRef.current?.blur();
            }}>
            <input ref={inputRef} type="input" placeholder="Enter a task" value={todo} onChange={(e)=>setTodo(e.target.value)} className="input__box"/>
            <button type="submit" className="input__submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default InputField
