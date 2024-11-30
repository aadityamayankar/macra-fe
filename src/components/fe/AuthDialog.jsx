"use client";
import { useState } from 'react';
import { Box, Button, Text, Link, VStack, useDisclosure, DialogTrigger } from '@chakra-ui/react';
import { DialogRoot, DialogContent, DialogHeader, DialogCloseTrigger, DialogBody, DialogFooter, DialogBackdrop } from '@/components/ui/dialog';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

export default function AuthDialog() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = () => {
    setIsLogin(true);
    onClose();
  }

  return (
    <>
      <DialogRoot>
        <DialogTrigger asChild>
          <Button onClick={onOpen}>Sign In</Button>
        </DialogTrigger>
        <DialogBackdrop />
        <DialogContent>
          <DialogHeader>{isLogin ? 'Login' : 'Sign Up'}</DialogHeader>
          <DialogCloseTrigger />
          <DialogBody>
            {isLogin ? <LoginForm /> : <SignUpForm />}
          </DialogBody>
          <DialogFooter>
            <VStack spacing={4} align="center" width="100%">
              <Text>
                {isLogin ? 'New here?' : 'Already have an account?'}{' '}
                <Link color="red.600" onClick={toggleForm}>
                  {isLogin ? 'Sign up' : 'Login'}
                </Link>
              </Text>
            </VStack>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  );
}