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

function PageSignUp() {
  return (
    <div className="page-sign-up">
      <Flex
          direction="column"
          gap="4">
        <Heading
            as="h1"
            weight="medium"
            size="6">Sign Up</Heading>
        <Flex
            justify="end"
            gap="1">
          <Text>Got an account?</Text>
          <Link
              href="/sign-in">Sign in</Link>
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
        <Box>
          <TextFieldInput
              size="3"
              placeholder="Re-enter Password"
              type="password" />
        </Box>
        <Flex
            justify="end"
            mt="4">
          <Button
              size="3">Create account</Button>
        </Flex>
      </Flex>
    </div>
  );
}

export default PageSignUp;
