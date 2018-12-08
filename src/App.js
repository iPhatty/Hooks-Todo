import React, { useState } from 'react';
import './App.css';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';

function Todo({ todo, index, completeTodo, deleteTodo }) {
  const style = {
    textDecoration: todo.isComplete ? 'line-through' : null
  };

  const [target, setTarget] = useState(null);

  const isOpen = target;

  return (
    <div className="todo">
      <span onClick={e => setTarget(e.target)} style={style}>
        {todo.text}
      </span>
      <Popover
        id="Todo"
        open={isOpen}
        onClose={e => setTarget(null)}
        anchorEl={target}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
      >
        <div className="todo__popover-text">{todo.text}</div>
      </Popover>
      <div className="todo__button-container">
        <IconButton size="small" onClick={() => completeTodo(index)}>
          <Icon fontSize="small">{!todo.isComplete ? 'done' : 'undo'}</Icon>
        </IconButton>
        <IconButton aria-label="Delete" onClick={() => deleteTodo(index)}>
          <Icon fontSize="small">delete_forever</Icon>
        </IconButton>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!value.trim()) return;
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
      <Button type="submit" variant="contained">
        Submit
      </Button>
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
