import React, {
  useState,
  useEffect,
} from 'react';

import TodoItem from '../item';
import TodoInput from '../input';
import ListInput from './input';

import {
  TodoData,
  TodoListData,
} from '@/types';

import styles from './index.module.scss';

interface TodoListProps {
  data: TodoListData,
  run: (action, target, data) => void,
}

function TodoList({
  data,
  run,
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

    for (const item of data.todos) {
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

  /* // add todo
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
  }; */

  return (
    <div
        className={ styles.list }>
      {
        data.id && (
          <>
            <ListInput
                id={ data.id }
                name={ data.name }
                onChange={ (value) => run('update-list', data.id, {
                  name: value,
                }) }
                onDelete={ () => run('delete-list', data.id) } />
            {
              ids.map((id) => (
                <TodoItem
                    key={ id }
                    data={ todos[id] }
                    onChange={ (todo) => run('update-todo', id, todo) }
                    onDelete={ () => run('delete-todo', id) } />
              ))
            }
            <TodoInput
                onSubmit={ (text) => run('add-todo', null, {
                  text,
                }) } />
          </>
        )
      }
      {
        !data.id && (
          <ListInput
              onChange={ (value) => run('add-list', null, {
                name: value,
              }) } />
        )
      }
    </div>
  );
}

export default TodoList;
