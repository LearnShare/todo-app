import React from 'react';

import styles from './index.module.scss';

function TodoLayout({
  children,
}: {
  children: React.ReactDOM,
}) {
  return (
    <div
        className={ styles.layout }>
      <div
          className={ styles.content }>
        { children }
      </div>
    </div>
  );
}

export default TodoLayout;
