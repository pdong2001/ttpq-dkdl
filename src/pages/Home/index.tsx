import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import DepartmentInfos from '../DeparmentInfos';

import GreatCeremonyInfo from '../GreatCeremonyInfo';
import MultiStepRegister from '../MultiStepRegister';
import Timeline from '../Timeline';

export default function Home() {
  const { shortUri } = useParams();
  return (
    <Box position={'relative'} w='full'>
      {shortUri && <MultiStepRegister />}
      <GreatCeremonyInfo />
      <DepartmentInfos />
      <Timeline />
    </Box>
  );
}
