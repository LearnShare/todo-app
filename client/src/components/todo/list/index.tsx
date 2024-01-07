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
                    onChange={ (todo) => run('update-todo', data.id, todo) }
                    onDelete={ () => run('delete-todo', data.id, {
                      id,
                    }) } />
              ))
            }
            <TodoInput
                onSubmit={ (text) => run('add-todo', data.id, {
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
