import { Box, Container } from '@chakra-ui/react';
import React from 'react';

type Props = {};

function DepartmentInfos({}: Props) {
  return (
    <Box minH={'100vh'}>
      <Container minH={'100vh'} centerContent justifyContent='center'>
        Department information
      </Container>
    </Box>
  );
}

export default DepartmentInfos;
