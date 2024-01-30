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

function PageSignIn() {
  return (
    <div className="page-sign-in">
      <Flex
          direction="column"
          gap="4">
        <Heading
            as="h1"
            weight="medium"
            size="6">Sign In</Heading>
        <Flex
            justify="end"
            gap="1">
          <Text>New to TODO?</Text>
          <Link
              href="/sign-up">Sign up</Link>
        </Flex>
        <Box>
          <TextFieldInput
              size="3"
              placeholder="Email" />
        </Box>
        <Box>
          <TextFieldInput
              size="3"
              placeholder="Password"
              type="password" />
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

export default PageSignIn;
