import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

export default function NotFound() {
  const history = useHistory();
  return (
    <Box as={VStack} textAlign='center' py={10} px={6} minH='100vh' justifyContent='center'>
      <Heading
        display='inline-block'
        as='h2'
        size='2xl'
        bgGradient='linear(to-r, ttpq.400, ttpq.600)'
        backgroundClip='text'
      >
        404
      </Heading>
      <Text fontSize='18px' mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={'gray.500'} mb={6}>
        The page you're looking for does not seem to exist
      </Text>

      <Button
        colorScheme='ttpq'
        bgGradient='linear(to-r, ttpq.400, ttpq.500, ttpq.600)'
        color='white'
        variant='solid'
        onClick={() => history.push('/')}
      >
        Go to Home
      </Button>
    </Box>
  );
}
