import React, {
  useState,
  useRef,
} from 'react';

import {
  TodoData,
} from '@/types';

interface TodoItemProps {
  data: TodoData,
  onChange: (todo: TodoData) => void,
}

function TodoItem(
  {
    data,
    onChange,
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

  const textInput: HTMLInputElement = useRef(null);

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

  // checkbox onChange event
  const checkboxOnChange = (checked) => {
    setDone(checked);

    todoOnChange({
      done: checked,
    });
  };

  return (
    <div className="todo-item">
      <input
          type="checkbox"
          checked={ done }
          onChange={ (event) => checkboxOnChange(event.target.checked) } />
      <input
          ref={ textInput }
          type="text"
          value={ text }
          onChange={ (event) => setText(event.target.value) }
          onKeyDown={ (event) => inputOnKeyDown(event) }
          onBlur={ () => todoOnChange() } />
    </div>
  );
}

export default TodoItem;
