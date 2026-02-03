import React from 'react';
import styled from 'styled-components';

const TodoText = styled.span`
    margin-left: 10px;
    text-decoration: ${props => props.completed ? 'line-through' : 'none'};
    color: ${props => props.completed ? '#aaa' : '#333'};
    transition: all 0.3s ease;
`


const TodoItem = ({item,onDelete, onToggle}) => { 
  return (
    <div className="todo-item">
        <label>
            <input type="checkbox" checked={item.isDone} onChange={() => onToggle(item.id)} />
            <TodoText completed={item.isDone}>{item.task}</TodoText>
        </label>
        <button type="button" onClick={() => onDelete(item.id)}>삭제</button>
    </div>
  )
}

export default TodoItem