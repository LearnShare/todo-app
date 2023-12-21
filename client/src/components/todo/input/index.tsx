import React, {
  useState,
} from 'react';

import {
  Icon,
} from '@/components';

import styles from './index.module.scss';

interface TodoInputProps {
  onSubmit: (text: string) => void,
}

function TodoInput(
  {
    onSubmit,
  }: TodoInputProps,
) {
  const [
    text,
    setText,
  ] = useState('');

  // input onKeyDown event
  const inputOnKeyDown = (event) => {
    // submit on Enter
    if (event.key === 'Enter'
        && text.length > 0) {
      onSubmit(text);

      setText('');
    }
  };

  return (
    <div
        className={ styles.input }>
      <Icon name="add" />
      <input
          type="text"
          placeholder="Add one"
          value={ text }
          onChange={ (event) => setText(event.target.value) }
          onKeyDown={ (event) => inputOnKeyDown(event) } />
    </div>
  );
}

export default TodoInput;
