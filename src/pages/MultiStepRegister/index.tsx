import { Box, Container, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
import FadeInUp from '~/components/Animation/FadeInUp';
import CoverImage from '~/assets/festival_cover.jpg';
import Step1 from './RegisterSteps/Step1';
import Step2 from './RegisterSteps/Step2';
import Step3 from './RegisterSteps/Step3';
import Step4 from './RegisterSteps/Step4';
import FinalStep from './RegisterSteps/FinalStep';

// type MultiStepProps = {};
type Step = (props: StepProps) => JSX.Element;
export type StepProps = {
  nextStep: () => void;
};

const registerSteps = [Step1, Step2, Step3, Step4, FinalStep];

const MultiStepRegister = () => {
  const [step, setStep] = useState(0);

  const Step: Step = registerSteps[step];
  return (
    <Box bgImage={CoverImage} bgSize={'cover'} backgroundAttachment='fixed'>
      <Container
        as={SimpleGrid}
        maxW={'full'}
        columns={{ base: 1, lg: 2 }}
        gap={{ base: 1 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 32 }}
        minH='100vh'
        alignItems={'center'}
      >
        <FadeInUp>
          <Step nextStep={() => setStep((current) => current + 1)} />
        </FadeInUp>
      </Container>
    </Box>
  );
};

export default MultiStepRegister;
