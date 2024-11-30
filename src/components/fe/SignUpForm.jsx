import { Box, Button, Input, VStack, HStack, Text, Separator } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { FcGoogle } from "react-icons/fc";

export default function SignUpForm() {
  return (
    <VStack gap={5} spacing={4} align="stretch">
      <Field id="username" label = "Username">
        <Input type="text" />
      </Field>
      <Field id="email" label = "Email">
        <Input type="email" />
      </Field>
      <Field id="password" label = "Password">
        <Input type="password" />
      </Field>
      <Button colorScheme="teal" widtoh="100%">Create Account</Button>
      <HStack>
        <Separator />
        <Text flexShrink="0">OR</Text>
        <Separator />
      </HStack>
      <Button colorScheme="red" width="100%">Continue with Google <FcGoogle/> </Button>
    </VStack>
  );
}