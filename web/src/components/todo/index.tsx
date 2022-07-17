import React, {
  useState,
} from 'react';

import TodoInput from './input/index';
import TodoItem from './item/index';

import './index.scss';

interface TodoData {
  id: number,
  text: string,
  done: boolean,
}

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
    console.log(text);
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
    // TODO update todo
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

export {
  TodoData,
};
