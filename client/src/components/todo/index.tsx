import React, {
  useState,
} from 'react';

import TodoItem from './item';
import TodoInput from './input';

import {
  TodoData,
} from '@/types';

import styles from './index.module.scss';

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
  const addTodo = (text: string) => {
    // use timestamp as id
    const newId = Date.now();

    setIds((oldValue) => ([
      ...oldValue,
      newId,
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
  const updateTodo = (todo: TodoData) => {
    const {
      id,
    } = todo;

    setData((oldValue) => ({
      ...oldValue,
      [id]: todo,
    }));
  };

  return (
    <div
        className={ styles.todo }>
      <h2>TODO</h2>
      {
        ids.map((id) => (
          <TodoItem
              key={ id }
              data={ data[id] }
              onChange={ (todo) => updateTodo(todo) } />
        ))
      }
      <TodoInput
          onSubmit={ (text) => addTodo(text) } />
    </div>
  );
}

export default Todo;
