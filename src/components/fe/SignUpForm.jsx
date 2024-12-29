import { useState, useEffect } from 'react';
import { Box, Button, Input, VStack, HStack, Text, Separator } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { FcGoogle } from "react-icons/fc";
import { Toaster, toaster } from "@/components/ui/toaster";
import { registerUser, fetchUserProfile } from '@/api';
import useStore from '@/store/useStore';
import { getGoogleAuthUrl } from '@/utils';
import { isValidEmail, areFieldsFilled } from '@/utils';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const setIsAuthenticated = useStore((state) => state.setIsAuthenticated);
  const setUserProfile = useStore((state) => state.setUserProfile);

  useEffect(() => {
    setIsFormValid(isValidEmail(email) && areFieldsFilled([email, password]));
  }, [email, password]);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerUser(email, password);
      setIsAuthenticated(true);
      const userProfile = await fetchUserProfile();
      setUserProfile(userProfile);
      toaster.create({
        title: 'Registration successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toaster.create({
        title: 'Registration failed',
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
    <VStack gap={5} spacing={4} align="stretch" as="form" onSubmit={handleRegister}>
      <Toaster />
      <Field id="email" label="Email">
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Field>
      <Field id="password" label="Password">
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Field>
      <Button type="submit" colorScheme="teal" width="100%" disabled={!isFormValid}>Create Account</Button>
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