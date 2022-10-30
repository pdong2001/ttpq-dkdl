import { Box } from '@chakra-ui/react';

import GreatCeremonyInfo from '../GreatCeremonyInfo';
import MultiStepRegister from '../MultiStepRegister';

export default function Home() {
  return (
    <Box position={'relative'} w='full' minW={'sm'}>
      <MultiStepRegister />
      <GreatCeremonyInfo />
    </Box>
  );
}
