import { useState, useEffect } from 'react';
import TodoItem from './TodoItem.jsx' 
import styled from 'styled-components';

const Container = styled.div`
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    color: #333;
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 20px;
`;
const StyledInput = styled.input`
    width: 70%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    outline: none;
    
    &:focus {
        border-color: #007bff; // CSS와 동일하게 가상 선택자 사용 가능!
    }
`;

const AddButton = styled.button`
    width: 25%;
    margin-left: 5%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`


const TodoInput = () => {
     //1.할일목록상태 초기값
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("my-todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    })
  
    //2. 입력창상태
    const [inputValue, setInputValue] = useState("");


    useEffect(() => {
        localStorage.setItem("my-todos", JSON.stringify(todos));    
    }, [todos])


    //3. 할일추가
    const handleAdd = () => {
        if(inputValue.trim() === "") return; //빈 값 방지
        const newTodo = {
            id: Date.now(),
            task: inputValue,
            isDone: false,
        }
        setTodos([...todos, newTodo]);
        setInputValue(""); // 입력창비우기    
    }

    const handleKeyPress = (e) => {
        if(e.key === "Enter") {
            handleAdd();
        }
    }

    const handleToggle = (id) => {
        setTodos(
            todos.map((item) => (
                item.id===id ? {...item, isDone:!item.isDone} : item
            ))
        )
    }

    const handleDelete = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    }





  return (
    <Container>
        <Title>My Todo List</Title>
        <div>
            <StyledInput type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="할 일을 입력하세요" onKeyDown={handleKeyPress} />
            <button onClick={handleAdd}>추가</button>                
        </div>
        { todos.map((item) => (
            <TodoItem key={item.id} item={item} onToggle={handleToggle} onDelete={handleDelete}/>

        ))}
    </Container>
  )
}

export default TodoInput