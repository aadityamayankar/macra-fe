"use client";
import { useState, useEffect } from 'react';
import { Box, Button, Text, Link, VStack, useDisclosure } from '@chakra-ui/react';
import { DialogRoot, DialogContent, DialogHeader, DialogCloseTrigger, DialogBody, DialogFooter, DialogBackdrop, DialogTrigger } from '@/components/ui/dialog';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import useStore from '@/store/useStore';

export default function AuthDialog() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSignIn, setIsSignIn] = useState(true);
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  useEffect(() => {
    if (isAuthenticated) {
      onClose();
    }
  }, [isAuthenticated, onClose]);

  return (
    <>
      <DialogRoot isOpen={isOpen} onClose={onClose}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={onOpen}>Sign In</Button>
        </DialogTrigger>
        <DialogBackdrop />
        <DialogContent>
          <DialogHeader>{isSignIn ? 'Login' : 'Sign Up'}</DialogHeader>
          <DialogCloseTrigger />
          <DialogBody>
            {isSignIn ? <LoginForm /> : <SignUpForm />}
          </DialogBody>
          <DialogFooter>
            <VStack spacing={4} align="center" width="100%">
              <Text>
                {isSignIn ? 'New here?' : 'Already have an account?'}{' '}
                <Link color="red.600" onClick={toggleForm}>
                  {isSignIn ? 'Sign up' : 'Login'}
                </Link>
              </Text>
            </VStack>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  );
}