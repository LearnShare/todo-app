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

    if ((changed.text !== undefined
      && changed.text !== data.text)
        || (changed.done !== undefined
          && changed.done !== data.done)) {
      onChange({
        id,
        text,
        done,
        ...changed,
      });
    }
  };

  // input onKeyDown event
  const inputOnKeyDown = (event: KeyboardEvent) => {
    // submit on Enter
    if (event.key === 'Enter') {
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
          tabIndex={ done ? -1 : 0 }
          onChange={ (event) => setText(event.target.value) }
          onKeyDown={ (event) => inputOnKeyDown(event) }
          onBlur={ (event) => todoOnChange({
            text: event.target.value,
          }) } />
      <Icon
          name="close"
          className={ clsx(styles.delete, 'delete') }
          onClick={ () => onDelete() } />
    </div>
  );
}

TodoItem.defaultProps = {
  onChange: () => {},
  onDelete: () => {},
};

export default TodoItem;
