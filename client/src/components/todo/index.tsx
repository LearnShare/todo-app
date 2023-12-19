import React, {
  useState,
} from 'react';

import TodoInput from './input';
import TodoItem from './item';

import './index.scss';

function Todo() {
  // todo ids
  const [
    ids,
    setIds,
  ] = useState<number[]>([]);
  // todo data
  const [
    data,
    setData,
  ] = useState<{
    [number]: TodoData,
  }[]>({});

  // add todo
  const addTodo = (text) => {
    // use timestamp as id
    const newId = Date.now();

    setIds((oldValue) => ([
      newId,
      ...oldValue,
    ]));
    setData((oldValue) => ({
      ...oldValue,
      [newId]: {
        id: newId,
        text,
        done: false,
      },
    }));
  };

  // update todo
  const updateTodo = (todo) => {
    console.log(todo);

    const {
      id,
    } = todo;

    setData((oldValue) => ({
      ...oldValue,
      [id]: todo,
    }));
  };

  return (
    <div className="todo">
      <TodoInput
          onSubmit={ (text) => addTodo(text) } />
      {
        ids.map((id) => (
          <TodoItem
              key={ id }
              data={ data[id] }
              onChange={ (todo) => updateTodo(todo) } />
        ))
      }
    </div>
  );
}

export default Todo;
