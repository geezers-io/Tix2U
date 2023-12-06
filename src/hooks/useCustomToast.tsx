import { ReactNode, useMemo } from 'react';
import { useToast, UseToastOptions } from '@chakra-ui/react';
import { getErrorMessage } from '@/api/helper';

export function useCustomToast() {
  const toast = useToast({
    position: 'top',
    duration: 4000,
    isClosable: true,
    containerStyle: { minWidth: 'unset' },
  });

  return useMemo(
    () => ({
      ...toast,

      info: (description: string) => {
        toast({
          status: 'info',
          colorScheme: 'blue',
          description,
        });
      },
      success: (description: string) => {
        toast({
          status: 'success',
          colorScheme: 'blue',
          description,
        });
      },
      warning: (description: ReactNode, options?: Omit<UseToastOptions, 'status' | 'colorScheme' | 'description'>) => {
        return toast({
          status: 'warning',
          colorScheme: 'red',
          description: description,
          ...options,
        });
      },
      error: (e: unknown, options?: Omit<UseToastOptions, 'status' | 'colorScheme' | 'title' | 'description'>) => {
        return toast({
          status: 'error',
          colorScheme: 'red',
          title: 'Error',
          description: getErrorMessage(e),
          ...options,
        });
      },
    }),
    [toast],
  );
}
