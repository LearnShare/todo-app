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

  // delete todo
  const deleteTodo = (id: number) => {
    const index = ids.indexOf(id);

    if (index < 0) {
      throw new Error(`Item [${ id }] not exists`);
      return;
    }

    setIds((oldValue) => {
      const list = [
        ...oldValue,
      ];
      list.splice(index, 1);

      return list;
    });

    setData((oldValue) => {
      const idData = {
        ...oldValue,
      };
      delete idData[id];

      return idData;
    });
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
              onChange={ (todo) => updateTodo(todo) }
              onDelete={ () => deleteTodo(id) } />
        ))
      }
      <TodoInput
          onSubmit={ (text) => addTodo(text) } />
    </div>
  );
}

export default Todo;
