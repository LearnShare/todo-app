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
          gap="3">
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
              placeholder="Email" />
        </Box>
        <Box>
          <TextFieldInput
              placeholder="Password"
              type="password" />
        </Box>
        <Box>
          <TextFieldInput
              placeholder="Re-enter Password"
              type="password" />
        </Box>
        <Flex
            justify="end"
            mt="4">
          <Button>Create account</Button>
        </Flex>
      </Flex>
    </div>
  );
}

export default PageSignUp;
