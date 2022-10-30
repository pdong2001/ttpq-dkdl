import { Box } from '@chakra-ui/react';
import React from 'react';
const BlankLayout = ({ children: Children }: { children: React.ReactNode }) => {
  return <Box>{Children}</Box>;
};

export default BlankLayout;
