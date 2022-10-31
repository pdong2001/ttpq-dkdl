import { Box, Container } from '@chakra-ui/react';
import React from 'react';

type Props = {};

function DepartmentInfos({}: Props) {
  return (
    <Box bgGradient={'linear(to-r, blue.300, ttpq.700)'}>
      <Container minH={'100vh'} centerContent justifyContent='center'>
        Department information
      </Container>
    </Box>
  );
}

export default DepartmentInfos;
