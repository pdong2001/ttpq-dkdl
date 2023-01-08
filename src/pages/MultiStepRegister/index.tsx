import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Step1 from './RegisterSteps/Step1';
import Step2 from './RegisterSteps/Step2';
import Step31 from './RegisterSteps/Step3';
import Step32 from './RegisterSteps/Step3_2';
import Step4 from './RegisterSteps/Step4';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { useAppSelector } from '~/hooks/reduxHook';
import useCustomColorMode from '~/hooks/useColorMode';
import { HOME_WITH_SHORT_URI, ADD_NEW_REGISTER_PATH } from '~/routes';
import { formatUrl } from '~/utils/functions';
import Step5 from './RegisterSteps/Step5';
import Step6 from './RegisterSteps/Step6';

type Step = (props: StepProps) => JSX.Element;
export type StepProps = {
  nextStep: (step?: number) => void;
  previousStep: (step?: number) => void;
};

const registerSteps = [Step1, Step2, Step31, Step32, Step4, Step5, Step6];

const MultiStepRegister = () => {
  const { identityCard, phoneNumber } = useAppSelector((state) => state.register.data);
  const [step, setStep] = useState<number>(4);

  const { shortUri } = useParams<any>();
  const { path } = useRouteMatch();
  const history = useHistory();
  const Step: Step = registerSteps[step];
  const { loaded } = useAppSelector((state) => state.registerPage);

  useEffect(() => {
    if (path === ADD_NEW_REGISTER_PATH && step === 0 && identityCard && phoneNumber) {
      setStep(1);
    }
  }, []);
  const nextStep = (step?: number) => {
    if (step) {
      setStep(step);
    } else {
      setStep((currentStep) => currentStep + 1);
      if (step === 0 && path === HOME_WITH_SHORT_URI) {
        history.push(formatUrl(ADD_NEW_REGISTER_PATH, { shortUri }));
      }
    }
    window.scrollTo(0, 0);
  };
  const previousStep = (step?: number) => {
    if (step) {
      setStep(step);
    } else {
      setStep((currentStep) => {
        if (currentStep === 0) {
          return 0;
        }
        return currentStep - 1;
      });
    }

    window.scrollTo(0, 0);
  };
  const { bgColor } = useCustomColorMode();
  return (
    <>
      <Box id='register' scrollMarginTop={16} />
      {loaded && (
        <Box bgGradient='linear(to-r,  blue.200, Blue.500)'>
          <Container
            as={Grid}
            maxW={'5xl'}
            gridTemplateColumns={{ base: 'repeat(3, 1fr)' }}
            pt={{ base: 20 }}
            pb={5}
            minH='100vh'
            alignItems={'center'}
          >
            <GridItem colSpan={{ base: 3 }}>
              <Box
                bg={bgColor}
                rounded={'xl'}
                p={{ base: 4, sm: 6, md: 8 }}
                mx={{ base: 1, sm: 10, md: step === 0 ? 60 : 20, lg: step === 0 ? 60 : 6 }}
              >
                <Step nextStep={nextStep} previousStep={previousStep} />
              </Box>
            </GridItem>
          </Container>
        </Box>
      )}
    </>
  );
};

export default MultiStepRegister;
