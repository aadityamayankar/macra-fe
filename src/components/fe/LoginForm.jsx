import { useState, useEffect } from 'react';
import { Box, Button, Input, VStack, HStack, Text, Separator } from '@chakra-ui/react';
import { Toaster, toaster } from "@/components/ui/toaster";
import { Field } from '@/components/ui/field';
import { FcGoogle } from "react-icons/fc";
import useStore from '@/store/useStore';
import { loginUser, fetchUserProfile } from '@/api';
import { getGoogleAuthUrl } from '@/utils';
import { isValidEmail, areFieldsFilled } from '@/utils';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const setIsAuthenticated = useStore((state) => state.setIsAuthenticated);
  const setUserProfile = useStore((state) => state.setUserProfile);

  useEffect(() => {
    setIsFormValid(isValidEmail(username) && areFieldsFilled([username, password]));
  }, [username, password]);

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

  const handleGoogleLogin = () => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      const googleAuthUrl = getGoogleAuthUrl(currentUrl);
      window.location.href = googleAuthUrl;
    }
  };

  return (
    <VStack gap={5} spacing={4} align="stretch" as="form" onSubmit={handleLogin}>
      <Toaster />
      <Field id="username" label="Email">
        <Input type="email" value={username} onChange={(e) => setUsername(e.target.value)} />
      </Field>
      <Field id="password" label="Password">
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Field>
      <Button type="submit" width="100%" disabled={!isFormValid}>Login</Button>
      <HStack>
        <Separator />
        <Text flexShrink="0">OR</Text>
        <Separator />
      </HStack>
      <Button colorScheme="red" width="100%" onClick={handleGoogleLogin}>
        Continue with Google <FcGoogle />
      </Button>
    </VStack>
  );
}