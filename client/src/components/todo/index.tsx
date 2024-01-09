import React from 'react';

import TodoList from './list';

import useTodo from '@/hooks/todo';

import styles from './index.module.scss';

function TodoApp() {
  const {
    // loading,
    lists,
    run,
  } = useTodo();

  return (
    <div
        className={ styles.todo }>
      {
        lists.map((list) => (
          <TodoList
              key={ list.id }
              data={ list }
              run={ (action, target, data) => run(action, target, data) } />
        ))
      }
    </div>
  );
}

export default TodoApp;
