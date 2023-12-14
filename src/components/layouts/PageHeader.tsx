import { FC, useEffect, useState } from 'react';
import { PersonCircle, BoxArrowInRight, Cart, Search, BoxArrowInLeft, List } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Image,
  Flex,
  Spacer,
  HStack,
  Text,
  Center,
  useMediaQuery,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  ColorModeScript,
} from '@chakra-ui/react';
import supabase from '@/api/lib/supabase';
import { category } from '@/constants/detail';
import { useCustomToast } from '@/hooks/useCustomToast';

const PageHeader: FC = () => {
  const [isLargerThanMd] = useMediaQuery('(min-width: 90em)');
  const [session, setSession] = useState<string | undefined>(undefined);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toast = useCustomToast();
  const navigate = useNavigate();

  const fetchLogin = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      if (data) {
        setSession(data.session?.access_token);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.info('로그아웃 하였어요');
      navigate('/');
    } catch {
      toast.error('로그아웃에 실패했어요.');
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    fetchLogin();
  }, [session]);

  return (
    <>
      <ColorModeScript />

      <Box
        as="header"
        w="100%"
        h="100px"
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
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="space-between"
          h="100%"
          pl={{ base: 2, md: 10 }}
          pr={{ base: 2, md: 10 }}
        >
          <Link to="/">
            <Image src="/name_logo.png" h={{ base: '40px', md: '60px' }} />
          </Link>

          {isLargerThanMd ? (
            <HStack pl="10" spacing={{ base: 2, md: 10 }}>
              {category &&
                category.map(value => (
                  <Link key={`${value.english} - ${value.korean}`} to={`/${value.english}`}>
                    <Text fontWeight="bold" letterSpacing="0.1em" fontSize={isLargerThanMd ? 'md' : 'sm'}>
                      {value.korean}
                    </Text>
                  </Link>
                ))}
            </HStack>
          ) : (
            <HStack spacing={10} align="center">
              <IconButton icon={<List />} aria-label="Open Navigation Drawer" onClick={toggleDrawer} />
            </HStack>
          )}

          <Spacer display={{ base: 'none', md: 'block' }} />

          <HStack spacing={10} align="center">
            <Link to="/search">
              <Text fontWeight="bold" letterSpacing="0.1em" cursor="pointer" fontSize={isLargerThanMd ? 'md' : 'sm'}>
                <Center>
                  <Search /> SEARCH
                </Center>
              </Text>
            </Link>

            {!!session && (
              <>
                <Text
                  fontWeight="bold"
                  letterSpacing="0.1em"
                  _hover={{ textDecoration: 'underline' }}
                  fontSize={isLargerThanMd ? 'md' : 'sm'}
                  onClick={signOut}
                  cursor="pointer"
                >
                  <Center>
                    <BoxArrowInLeft /> LOGOUT
                  </Center>
                </Text>

                <Link to="/my">
                  <Text fontWeight="bold" letterSpacing="0.1em" fontSize={isLargerThanMd ? 'md' : 'sm'}>
                    <Center>
                      <PersonCircle /> MYPAGE
                    </Center>
                  </Text>
                </Link>
                <Link to="/cart">
                  <Text fontWeight="bold" letterSpacing="0.1em" fontSize={isLargerThanMd ? 'md' : 'sm'}>
                    <Center>
                      <Cart /> CART
                    </Center>
                  </Text>
                </Link>
              </>
            )}

            {!session && (
              <Link to="/login">
                <Text
                  fontWeight="bold"
                  letterSpacing="0.1em"
                  _hover={{ textDecoration: 'underline' }}
                  fontSize={isLargerThanMd ? 'md' : 'sm'}
                >
                  <Center>
                    <BoxArrowInRight /> LOGIN
                  </Center>
                </Text>
              </Link>
            )}
          </HStack>

          {!isLargerThanMd && (
            <Drawer placement="right" onClose={toggleDrawer} isOpen={isDrawerOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Category</DrawerHeader>
                <DrawerBody>
                  <VStack align="start">
                    {category &&
                      category.map(value => (
                        <Link key={`${value.english} - ${value.korean}`} to={`/${value.english}`}>
                          <Text fontWeight="bold" letterSpacing="0.1em" fontSize={isLargerThanMd ? 'md' : 'sm'}>
                            {value.korean}
                          </Text>
                        </Link>
                      ))}
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default PageHeader;
