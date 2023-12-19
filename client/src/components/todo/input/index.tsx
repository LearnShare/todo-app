import React, {
  useState,
} from 'react';

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
    <input
        type="text"
        value={ text }
        onChange={ (event) => setText(event.target.value) }
        onKeyDown={ (event) => inputOnKeyDown(event) } />
  );
}

export default TodoInput;
