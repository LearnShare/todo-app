import React, {
  useState,
  useEffect,
} from 'react';

import TodoItem from '../item';
import TodoInput from '../input';

import {
  TodoData,
  TodoListData,
} from '@/types';

import styles from './index.module.scss';

interface TodoListProps {
  data: TodoListData,
}

function TodoList({
  data,
}: TodoListProps) {
  // todo ids
  const [
    ids,
    setIds,
  ] = useState<number[]>([]);
  // todo data
  const [
    todos,
    setTodos,
  ] = useState<{
    [number]: TodoData,
  }[]>({});

  const parseData = () => {
    const idList = [];
    const todosData = {};

    for (const item of data.todo) {
      idList.push(item.id);
      todosData[item.id] = item;
    }

    setIds(idList);
    setTodos(todosData);
  };
  useEffect(() => {
    parseData();
  }, [
    data,
  ]);

  // add todo
  const addTodo = (text: string) => {
    TodoAPI.add(text)
      .then((res) => {
        const newItem = res.data;

        setIds((oldValue) => ([
          ...oldValue,
          newItem.id,
        ]));

        setData((oldValue) => ({
          ...oldValue,
          [newItem.id]: newItem,
        }));
      });
  };

  // update todo
  const updateTodo = (item: TodoData) => {
    const {
      id,
      text,
      done,
    } = item;

    TodoAPI.update(id, {
      text,
      done,
    })
      .then((res) => {
        const updatedItem = res.data;

        setData((oldValue) => ({
          ...oldValue,
          [id]: updatedItem,
        }));
      });
  };

  // delete todo
  const deleteTodo = (id: number) => {
    const index = ids.indexOf(id);

    if (index < 0) {
      throw new Error(`Item [${ id }] not exists`);
      return;
    }

    TodoAPI.del(id)
      .then(() => {
        setIds((oldValue) => {
          const list = [
            ...oldValue,
          ];
          list.splice(index, 1);

          return list;
        });

        setTodos((oldValue) => {
          const idData = {
            ...oldValue,
          };
          delete idData[id];

          return idData;
        });
      });
  };

  return (
    <div
        className={ styles.list }>
      <h2>{ data.name }</h2>
      {
        ids.map((id) => (
          <TodoItem
              key={ id }
              data={ todos[id] }
              onChange={ (todo) => updateTodo(todo) }
              onDelete={ () => deleteTodo(id) } />
        ))
      }
      <TodoInput
          onSubmit={ (text) => addTodo(text) } />
    </div>
  );
}

export default TodoList;
