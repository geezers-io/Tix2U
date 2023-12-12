import { FC, useEffect, useState } from 'react';
import { PersonCircle, BoxArrowInRight, Cart, Search, BoxArrowInLeft } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Image, Flex, Spacer, HStack, Text, Center, useMediaQuery } from '@chakra-ui/react';
import supabase from '@/api/lib/supabase';
import { category } from '@/constants/detail';
import { useCustomToast } from '@/hooks/useCustomToast';

const PageHeader: FC = () => {
  const [isLargerThanMd] = useMediaQuery('(min-width: 48em)');
  const [session, setSession] = useState<string | undefined>(undefined);
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

  useEffect(() => {
    fetchLogin();
  }, [session]);

  return (
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
        h="100%"
        pl={{ base: 2, md: 10 }}
        pr={{ base: 2, md: 10 }}
      >
        <Link to="/">
          <Image src="/name_logo.png" pr={10} h={{ base: '40px', md: '60px' }} />
        </Link>
        <HStack spacing={{ base: 2, md: 10 }}>
          {category &&
            category.map(value => (
              <Link to={`/${value.english}`} key={`${value.english} - ${value.korean}`}>
                <Text fontWeight="bold" letterSpacing="0.1em" fontSize={isLargerThanMd ? 'md' : 'sm'}>
                  {value.korean}
                </Text>
              </Link>
            ))}
        </HStack>

        <Spacer display={{ base: 'none', md: 'block' }} />

        <HStack spacing={10} align="center">
          <Link to="/search">
            <Text fontWeight="bold" letterSpacing="0.1em" cursor="pointer" fontSize={isLargerThanMd ? 'md' : 'sm'}>
              <Center>
                <Search /> SEARCH
              </Center>
            </Text>
          </Link>

          {/*로그인 되었을 때 */}
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

          {/*로그인되지 않았을 때 */}
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
      </Flex>
    </Box>
  );
};

export default PageHeader;
