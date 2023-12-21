import React, {
  useState,
  useRef,
} from 'react';
import clsx from 'clsx';

import {
  TodoData,
} from '@/types';

import {
  Icon,
} from '@/components';

import styles from './index.module.scss';

interface TodoItemProps {
  data: TodoData,
  onChange?: (todo: TodoData) => void,
  onDelete?: () => void,
}

function TodoItem(
  {
    data,
    onChange,
    onDelete,
  }: TodoItemProps,
) {
  const [
    text,
    setText,
  ] = useState(data.text);
  const [
    done,
    setDone,
  ] = useState(data.done);

  const textInput = useRef(null);

  // call onChange when updated
  const todoOnChange = (changed) => {
    const {
      id,
    } = data;

    onChange({
      id,
      text,
      done,
      ...changed,
    });
  };

  // input onKeyDown event
  const inputOnKeyDown = (event: KeyboardEvent) => {
    // submit on Enter
    if (event.key === 'Enter') {
      todoOnChange();

      if (textInput
          && textInput.current) {
        textInput.current
          .blur();
      }
    }
  };

  // toggle done
  const toggleDone = () => {
    setDone((oldValue) => {
      todoOnChange({
        done: !oldValue,
      });

      return !oldValue;
    });
  };

  return (
    <div
        className={ clsx(
          styles.item,
          done && styles.done,
        ) }>
      <Icon
          name={
            done
              ? 'checkbox-checked'
              : 'checkbox'
          }
          className={ clsx(styles.checkbox, 'checkbox') }
          onClick={ () => toggleDone() } />
      <input
          ref={ textInput }
          type="text"
          value={ text }
          readOnly={ done }
          onChange={ (event) => setText(event.target.value) }
          onKeyDown={ (event) => inputOnKeyDown(event) }
          onBlur={ () => todoOnChange() } />
      <Icon
          name="close"
          className={ clsx(styles.delete, 'delete') }
          onClick={ () => onDelete() } />
    </div>
  );
}

export default TodoItem;
