import { Box, Button, Input, Separator, VStack, HStack, Text } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  return (
    <VStack gap={5} spacing={4} align="stretch">
      <Field id="username" label = "Username">
        <Input type="text" />
      </Field>
      <Field id="password" label = "Password">
        <Input type="password" />
      </Field>
      <Button width="100%">Login</Button>
      <HStack>
        <Separator />
        <Text flexShrink="0">OR</Text>
        <Separator />
      </HStack>
      <Button colorScheme="red" width="100%">Login with Google <FcGoogle/> </Button>
    </VStack>
  );
}