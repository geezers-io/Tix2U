import Link from 'next/link';
import { FC, useState } from 'react';
import { PersonCircle, BoxArrowInRight, Search, BoxArrowInLeft, List, BagHeart } from 'react-bootstrap-icons';
import {
  Box,
  Image,
  Flex,
  HStack,
  Text,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
} from '@chakra-ui/react';
import { categories } from '@/constants/detail';
import { useCustomToast } from '@/hooks/useCustomToast';
import { useSupabase } from '@/providers/SupabaseProvider.tsx';

const PageHeader: FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toast = useCustomToast();
  const { supabase, user } = useSupabase();

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.info('로그아웃 하였어요');
    } catch {
      toast.error('로그아웃에 실패했어요.');
    } finally {
      window.location.href = '/';
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(prev => !prev);
  };

  return (
    <>
      <Box
        as="header"
        w="100%"
        h={{ base: 'auto', md: '100px' }}
        position="sticky"
        top={0}
        paddingTop={{ base: 0, md: '8px' }}
        boxShadow="0 2px 2px -2px rgba(0,0,0,.3)"
        backgroundColor="white"
        zIndex={999}
        display="flex"
        flexDirection="column"
        paddingX="4"
      >
        <Flex
          h="100%"
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          pl={{ base: 2, md: 10 }}
          pr={{ base: 2, md: 10 }}
        >
          <Link href="/" passHref>
            <a>
              <Image src="/name_logo.png" alt="" width="200px" height="60px" objectFit="contain" />
            </a>
          </Link>

          <Box flex={1}>
            <HStack display={{ base: 'none', xl: 'flex' }} pl="10" spacing={{ base: 2, md: 10 }}>
              {categories.map(category => (
                <Link key={`${category.english} - ${category.korean}`} href={`/${category.english}`} passHref>
                  <a>
                    <Text fontWeight="bold" letterSpacing="0.1em" fontSize="md">
                      {category.korean}
                    </Text>
                  </a>
                </Link>
              ))}
            </HStack>

            <IconButton
              display={{ base: 'flex', xl: 'none' }}
              icon={<List />}
              aria-label="Open Navigation Drawer"
              onClick={toggleDrawer}
            />
          </Box>

          <HStack spacing={10} align="center" mt={{ base: 2, md: 0 }}>
            <Link href="/search" passHref>
              <a>
                <Flex flexDirection="column" alignItems="center">
                  <Search />
                  <Text
                    fontWeight="bold"
                    letterSpacing="0.1em"
                    cursor="pointer"
                    align="center"
                    fontSize={{ base: 'sm', xl: 'md' }}
                    _hover={{ textDecoration: 'none' }}
                    _focus={{ boxShadow: 'none' }}
                  >
                    SEARCH
                  </Text>
                </Flex>
              </a>
            </Link>

            {!!user && (
              <>
                <Flex flexDirection="column" alignItems="center">
                  <BoxArrowInLeft />
                  <Text
                    fontWeight="bold"
                    letterSpacing="0.1em"
                    _hover={{ textDecoration: 'underline' }}
                    fontSize={{ base: 'sm', xl: 'md' }}
                    onClick={signOut}
                    cursor="pointer"
                    align="center"
                  >
                    LOGOUT
                  </Text>
                </Flex>
                <Link href="/my" passHref>
                  <a>
                    <Flex flexDirection="column" alignItems="center">
                      <PersonCircle />
                      <Text fontWeight="bold" letterSpacing="0.1em" fontSize={{ base: 'sm', xl: 'md' }} align="center">
                        MYPAGE
                      </Text>
                    </Flex>
                  </a>
                </Link>
                <Link href="/carts" passHref>
                  <a>
                    <Flex flexDirection="column" alignItems="center">
                      <BagHeart />
                      <Text fontWeight="bold" letterSpacing="0.1em" fontSize={{ base: 'sm', xl: 'md' }} align="center">
                        LIST
                      </Text>
                    </Flex>
                  </a>
                </Link>
              </>
            )}

            {!user && (
              <Link href="/login" passHref>
                <a>
                  <Flex flexDirection="column" alignItems="center">
                    <BoxArrowInRight />
                    <Text
                      fontWeight="bold"
                      letterSpacing="0.1em"
                      fontSize={{ base: 'sm', xl: 'md' }}
                      _hover={{ textDecoration: 'none' }}
                      _focus={{ boxShadow: 'none' }}
                    >
                      LOGIN
                    </Text>
                  </Flex>
                </a>
              </Link>
            )}
          </HStack>

          <Drawer placement="right" onClose={toggleDrawer} isOpen={isDrawerOpen}>
            <DrawerOverlay display={{ base: 'block', xl: 'none' }} />
            <DrawerContent display={{ base: 'block', xl: 'none' }}>
              <DrawerCloseButton />
              <DrawerHeader>Category</DrawerHeader>
              <DrawerBody>
                <VStack align="start">
                  {categories.map(value => (
                    <Link key={`${value.english}-${value.korean}`} href={`/${value.english}`} passHref>
                      <a>
                        <Text fontWeight="bold" letterSpacing="0.1em" fontSize={{ base: 'sm', xl: 'md' }}>
                          {value.korean}
                        </Text>
                      </a>
                    </Link>
                  ))}
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Box>
    </>
  );
};

export default PageHeader;
