import { Box, Container, SimpleGrid, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import FadeInUp from '~/components/Animation/FadeInUp';
import CoverImage from '~/assets/festival_cover.jpg';
import Step1 from './RegisterSteps/Step1';
import Step2 from './RegisterSteps/Step2';
import Step3 from './RegisterSteps/Step3';
import Step4 from './RegisterSteps/Step4';
import FinalStep from './RegisterSteps/FinalStep';
import { useHistory, useLocation } from 'react-router-dom';
import { useAppSelector } from '~/hooks/reduxHook';
import useCustomColorMode from '~/hooks/useColorMode';

// type MultiStepProps = {};
type Step = (props: StepProps) => JSX.Element;
export type StepProps = {
  nextStep: () => void;
  previousStep: () => void;
};

const registerSteps = [Step1, Step2, Step3, Step4, FinalStep];
const registerPath = '/register';

const MultiStepRegister = () => {
  const { identityCard, phoneNumber } = useAppSelector((state) => state.register.data);
  const [step, setStep] = useState<number>(3);
  const { pathname } = useLocation<Location>();
  const history = useHistory();
  const Step: Step = registerSteps[step];

  useEffect(() => {
    if (pathname === registerPath && step === 0 && identityCard && phoneNumber) {
      setStep(1);
    }
  }, []);
  const nextStep = () => {
    setStep((currentStep) => currentStep + 1);
    if (step === 0) {
      history.push(registerPath);
    }
  };
  const previousStep = () => {
    setStep((currentStep) => {
      if (currentStep === 0) {
        return 0;
      }
      return currentStep - 1;
    });
  };
  const { bgColor } = useCustomColorMode();
  return (
    <Box bgImage={CoverImage} bgSize={'cover'} backgroundAttachment='fixed'>
      <Container
        as={SimpleGrid}
        maxW={'full'}
        columns={{ base: 1, lg: step === 1 ? 1 : 2 }}
        gap={{ base: 1 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 32 }}
        minH='100vh'
        alignItems={'center'}
      >
        <FadeInUp>
          <Stack
            bg={bgColor}
            rounded={'xl'}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ lg: 1 }}
            // maxW={{ lg: 'lg' }}
            mx={{ base: 1, sm: 10, md: 20, lg: 6, xl: 20 }}
          >
            <Step nextStep={nextStep} previousStep={previousStep} />
          </Stack>
        </FadeInUp>
      </Container>
    </Box>
  );
};

export default MultiStepRegister;
