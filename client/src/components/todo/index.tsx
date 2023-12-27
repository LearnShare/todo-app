import React, {
  useState,
  useEffect,
} from 'react';

import TodoAPI from '@/api/todo';

import TodoItem from './item';
import TodoInput from './input';

import {
  TodoData,
} from '@/types';

import styles from './index.module.scss';

function Todo() {
  // request status
  const [
    loading,
    setLoading,
  ] = useState(false);
  // const [
  //   saving,
  //   setSaving,
  // ] = useState(false);

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

  // get todo list
  const getList = () => {
    if (loading) {
      return;
    }

    setLoading(true);

    TodoAPI.list()
      .then((res) => {
        const idList = [];
        const todoData = {};

        for (const item of res.data) {
          idList.push(item.id);
          todoData[item.id] = item;
        }

        setIds(idList);
        setData(todoData);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getList();
  }, []);

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

        setData((oldValue) => {
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
