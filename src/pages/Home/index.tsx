import { Box } from '@chakra-ui/react';
import DepartmentInfos from '../DeparmentInfos';

import GreatCeremonyInfo from '../GreatCeremonyInfo';
import MultiStepRegister from '../MultiStepRegister';
import Timeline from '../Timeline';
import SuccessRegisterModal from '~/components/Modals/SuccessRegisterModal';

export default function Home() {
  return (
    <Box position={'relative'} w='full' minW={'sm'}>
      <SuccessRegisterModal />
      <MultiStepRegister />
      <GreatCeremonyInfo />
      <DepartmentInfos />
      <Timeline />
    </Box>
  );
}
