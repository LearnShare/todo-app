import React, {
  useState,
  useRef,
} from 'react';
import clsx from 'clsx';

import {
  Icon,
} from '@/components';

import styles from './index.module.scss';

interface ListInputProps {
  id?: number,
  name?: string,
  onChange: () => void,
  onDelete: () => void,
}

function ListInput({
  id,
  name,
  onChange,
  onDelete,
}: ListInputProps) {
  const [
    text,
    setText,
  ] = useState(name);

  const textInput = useRef(null);

  // call onChange when updated
  const valueOnChange = (value) => {
    if (value !== undefined
        && value !== name) {
      onChange(value);
    }
  };

  // input onKeyDown event
  const inputOnKeyDown = (event: KeyboardEvent) => {
    // submit on Enter
    if (event.key === 'Enter') {
      valueOnChange(event.target.value);

      if (textInput
          && textInput.current) {
        textInput.current
          .blur();
      }

      if (!id) {
        setText('');
      }
    }
  };

  return (
    <div
        className={ styles.input }>
      <input
          ref={ textInput }
          type="text"
          value={ text }
          placeholder={
            id === null
              ? 'New list'
              : 'List name'
          }
          onChange={ (event) => setText(event.target.value) }
          onKeyDown={ (event) => inputOnKeyDown(event) } />
      {
        id && (
          <Icon
              name="delete"
              className={ clsx(styles.delete, 'delete') }
              onClick={ () => onDelete() } />
        )
      }
    </div>
  );
}

ListInput.defaultProps = {
  id: null,
  name: '',
};

export default ListInput;
