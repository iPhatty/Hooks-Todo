import React, { useState } from 'react';
import './App.css';

function Todo({ todo, index, completeTodo, deleteTodo }) {
  const style = {
    textDecoration: todo.isComplete ? 'line-through' : null
  };

  return (
    <div style={style} className="todo">
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>{!todo.isComplete ? 'Complete' : 'Undo'}</button>
        <button onClick={() => deleteTodo(index)}>Delete</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState([
    { text: 'Learn react hooks', isComplete: false },
    { text: 'Wait for new fridge', isComplete: false },
    { text: 'Technical test', isComplete: false }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text, isComplete: false }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isComplete = !newTodos[index].isComplete;
    setTodos(newTodos);
  };

  const deleteTodo = index => {
    const newTodos = [...todos].filter((todo, i) => {
      return i !== index;
    });
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => {
          return (
            <Todo
              key={index}
              index={index}
              todo={todo}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}
            />
          );
        })}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
