import React, {
  useState,
} from 'react';

import {
  TodoData,
} from '../index';

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

  // call onChange with updated todo
  const todoOnChange = () => {
    const {
      id,
    } = data;
    onChange({
      id,
      text,
      done,
    });
  };

  // input onKeyDown event
  const inputOnKeyDown = (event) => {
    // submit on Enter
    if (event.key === 'enter') {
      todoOnChange();
      // TODO input blur
    }
  };

  // checkbox onChange event
  const checkboxOnChange = (event) => {
    const {
      checked,
    } = event.target;

    setDone(checked);

    todoOnChange();
  };

  return (
    <div className="todo-item">
      <input
          type="checkbox"
          checked={ done }
          onChange={ (event) => checkboxOnChange(event) } />
    <input
        type="text"
        value={ text }
        onChange={ (event) => setText(event.target.value) }
        onKeyDown={ (event) => inputOnKeyDown(event) }
        onBlur={ () => todoOnChange() } />
    </div>
  );
}

export default TodoItem;
