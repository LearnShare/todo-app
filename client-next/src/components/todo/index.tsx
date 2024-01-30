import React from 'react';
import {
  Heading,
  Flex,
  Button,
  IconButton,
  TextFieldRoot,
  TextFieldInput,
  TextFieldSlot,
} from '@radix-ui/themes';
import {
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';

import ListLink from './list/link';

import styles from './index.module.scss';

function Todo() {
  return (
    <div
        className={ styles.layout }>
      <div
          className={ styles.content }>
        <Heading
            size="6"
            weight="medium">Todo App</Heading>
        <Flex
            mt="3"
            direction="row"
            gap="1">
          <Button
              size="1">Recent</Button>
          <Button
              size="1">Finished</Button>
          <Button
              size="1">Archived</Button>
        </Flex>
        <Flex
            mt="3"
            direction="column"
            gap="2">
          <TextFieldRoot>
            <TextFieldInput
                size="3"
                placeholder="Add new List" />
            <TextFieldSlot>
              <IconButton
                  variant="soft">
                <DoubleArrowRightIcon
                    width="18"
                    height="18" />
              </IconButton>
            </TextFieldSlot>
          </TextFieldRoot>
          <ListLink
              id={ 1 }
              name="List 1" />
          <ListLink
              id={ 2 }
              name="List 2" />
        </Flex>
      </div>
    </div>
  );
}

export default Todo;
