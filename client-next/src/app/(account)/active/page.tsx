import React from 'react';
import {
  Flex,
  Box,
  Heading,
  Text,
  Link,
  TextFieldInput,
  Button,
} from '@radix-ui/themes';

function PageActive() {
  return (
    <div className="page-active">
      <Flex
          direction="column"
          gap="4">
        <Heading
            as="h1"
            weight="medium"
            size="6">Active your account</Heading>
        <Flex
            justify="end"
            gap="1">
          <Text>Not receving your code?</Text>
          <Link
              href="/active">Resend</Link>
        </Flex>
        <Box>
          <TextFieldInput
              size="3"
              placeholder="Code" />
        </Box>
        <Flex
            justify="end"
            mt="4">
          <Button
              size="3">Continue</Button>
        </Flex>
      </Flex>
    </div>
  );
}

export default PageActive;
