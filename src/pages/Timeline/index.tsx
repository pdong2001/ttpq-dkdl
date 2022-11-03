import { Box, Container } from '@chakra-ui/react';

// type Props = {};

const Timeline = () => {
  // const request = useAppSelector(({ request }) => request);

  return (
    <Box bgGradient={'linear(to-r, darkBlue.400, darkBlue.600)'} w='full'>
      <Container minH={'100vh'} centerContent justifyContent='center' alignItems='center'>
        Timeline
      </Container>
    </Box>
  );
};

export default Timeline;
