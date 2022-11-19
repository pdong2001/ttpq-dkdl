import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import DepartmentInfos from '../DeparmentInfos';

import GreatCeremonyInfo from '../GreatCeremonyInfo';
import MultiStepRegister from '../MultiStepRegister';
import Timeline from '../Timeline';
import CaptionCarousel from '~/components/Hero/carousel';

export default function Home() {
  const { shortUri } = useParams<any>();
  return (
    <Box position={'relative'} w='full'>
      {/* {shortUri && <MultiStepRegister />} */}
      <CaptionCarousel />
      <GreatCeremonyInfo />
      <DepartmentInfos />
      <Timeline />
    </Box>
  );
}
