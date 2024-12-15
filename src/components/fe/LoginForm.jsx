import { useState } from 'react';
import { Box, Button, Input, VStack, HStack, Text, Separator } from '@chakra-ui/react';
import { Toaster, toaster } from "@/components/ui/toaster";
import { Field } from '@/components/ui/field';
import { FcGoogle } from "react-icons/fc";
import useStore from '@/store/useStore';
import { loginUser, fetchUserProfile } from '@/api';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setIsAuthenticated = useStore((state) => state.setIsAuthenticated);
  const setUserProfile = useStore((state) => state.setUserProfile);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginUser(username, password);
      setIsAuthenticated(true);
      const userProfile = await fetchUserProfile();
      setUserProfile(userProfile);
      toaster.create({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toaster.create({
        title: 'Login failed',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack gap={5} spacing={4} align="stretch" as="form" onSubmit={handleLogin}>
      <Toaster />
      <Field id="username" label="Username">
        <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </Field>
      <Field id="password" label="Password">
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Field>
      <Button type="submit" width="100%">Login</Button>
      <HStack>
        <Separator />
        <Text flexShrink="0">OR</Text>
        <Separator />
      </HStack>
      <Button colorScheme="red" width="100%">Login with Google <FcGoogle /> </Button>
    </VStack>
  );
}