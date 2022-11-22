import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import FadeInUp from '~/components/Animation/FadeInUp';
import CoverImage from '~/assets/festival_cover.jpg';
import Step1 from './RegisterSteps/Step1';
import Step2 from './RegisterSteps/Step2';
import Step3 from './RegisterSteps/Step3';
import Step4 from './RegisterSteps/Step4';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import useCustomColorMode from '~/hooks/useColorMode';
import { HOME_WITH_SHORT_URI, ADD_NEW_REGISTER_PATH, EDIT_REGISTER_PATH } from '~/routes';
import { formatUrl } from '~/utils/functions';
import API from '~/apis/constants';
import Step5 from './RegisterSteps/Step5';
import SuccessRegisterModal from '~/components/Modals/SuccessRegisterModal';
import { unwrapResult } from '@reduxjs/toolkit';
import { getRegisterPage } from '~/slices/registerPage';

type Step = (props: StepProps) => JSX.Element;
export type StepProps = {
  nextStep: () => void;
  previousStep: () => void;
};

const registerSteps = [Step1, Step2, Step3, Step4, Step5, SuccessRegisterModal];

const MultiStepRegister = () => {
  const { identityCard, phoneNumber } = useAppSelector((state) => state.register.data);
  const [step, setStep] = useState<number>(3);
  const { shortUri } = useParams<any>();
  const { path } = useRouteMatch();
  const history = useHistory();
  const Step: Step = registerSteps[step];
  const { loaded } = useAppSelector((state) => state.registerPage);

  const dispatch = useAppDispatch();

  const isRegisterPage = [ADD_NEW_REGISTER_PATH, EDIT_REGISTER_PATH].includes(path);

  useEffect(() => {
    if (shortUri) {
      dispatch(
        getRegisterPage({
          method: 'get',
          url: formatUrl(API.GET_REGISTER_PAGE, { shortUri }),
        }),
      )
        .then(unwrapResult)
        .catch(() => {
          history.push('/not-found');
        });
    }
  }, [shortUri]);

  useEffect(() => {
    if (path === ADD_NEW_REGISTER_PATH && step === 0 && identityCard && phoneNumber) {
      setStep(1);
    }
  }, []);
  const nextStep = () => {
    setStep((currentStep) => currentStep + 1);
    if (step === 0 && path === HOME_WITH_SHORT_URI) {
      history.push(formatUrl(ADD_NEW_REGISTER_PATH, { shortUri }));
    }
    window.scrollTo(0, 0);
  };
  const previousStep = () => {
    setStep((currentStep) => {
      if (currentStep === 0) {
        return 0;
      }
      return currentStep - 1;
    });
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
            pt={{ base: 16 }}
            pb={5}
            minH='100vh'
            alignItems={'center'}
          >
            <GridItem colSpan={{ base: 3 }}>
              <FadeInUp>
                <Box
                  bg={bgColor}
                  rounded={'xl'}
                  p={{ base: 4, sm: 6, md: 8 }}
                  mx={{ base: 1, sm: 10, md: 20, lg: 6 }}
                >
                  <Step nextStep={nextStep} previousStep={previousStep} />
                </Box>
              </FadeInUp>
            </GridItem>
          </Container>
        </Box>
      )}
    </>
  );
};

export default MultiStepRegister;
