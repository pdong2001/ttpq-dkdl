import { Box } from '@chakra-ui/react';
import DepartmentInfos from '../DeparmentInfos';

import GreatCeremonyInfo from '../GreatCeremonyInfo';
import Timeline from '../Timeline';
import CaptionCarousel from '~/components/Hero/carousel';

export default function Home() {
  return (
    <Box position={'relative'} w='full'>
      <CaptionCarousel />
      <GreatCeremonyInfo />
      <DepartmentInfos />
      <Timeline />
    </Box>
  );
}
