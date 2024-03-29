import { Box, Button, Heading, Radio, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect } from 'react';
import FadeInUp from '~/components/Animation/FadeInUp';
import FloatingLabel from '~/components/Form/FloatingLabel/FloatingLabel';
import Radios from '~/components/Form/Radios';
import { CertificateRegistry } from '~/dtos/Enums/CertificateRegistry.enum';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import useCustomColorMode from '~/hooks/useColorMode';
import { fillDataPreview } from '~/slices/previewInfo';
import { StepProps } from '..';
import { fillForm } from '../../../slices/register';
import step5Schema from '../validationSchema/step5';

function Step5(props: StepProps) {
  const { nextStep, previousStep } = props;
  const { primaryColor } = useCustomColorMode();
  const dispatch = useAppDispatch();

  const { register: previousStepData } = useAppSelector((state) => state.register.data);
  const {
    certificateRegistry: certificateRegistryInStore,
    companyNameVIE: companyNameVIEInStore,
    companyNameEN: companyNameENInStore,
  } = previousStepData || {};

  const {
    certificateRegistry: editCertificateRegistry,
    companyNameVIE: editCompanyNameVIE = '',
    companyNameEN: editCompanyNameEN = '',
  } = useAppSelector((state) => state.registerInfo.data);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      certificateRegistry:
        (certificateRegistryInStore != undefined &&
          CertificateRegistry.toEnum(certificateRegistryInStore)) ||
        (editCertificateRegistry != undefined &&
          CertificateRegistry.toEnum(editCertificateRegistry)) ||
        CertificateRegistry.YES,
      companyNameVIE: companyNameVIEInStore || editCompanyNameVIE,
      companyNameEN: companyNameENInStore || editCompanyNameEN,
    },
    validationSchema: step5Schema,
    onSubmit: (values) => {
      const { certificateRegistry } = values;
      let { companyNameVIE, companyNameEN } = values;

      if (certificateRegistry == CertificateRegistry.NO) {
        companyNameVIE = '';
        companyNameEN = '';
      }

      const certRegBool = CertificateRegistry.toBoolean(certificateRegistry);
      const fillData = {
        register: {
          ...previousStepData,
          certificateRegistry: certRegBool,
          companyNameVIE,
          companyNameEN,
        },
      };
      dispatch(fillForm(fillData));

      dispatch(
        fillDataPreview({
          certificateRegistry: certRegBool,
          companyNameVIE,
          companyNameEN,
        }),
      );
      nextStep();
    },
  });

  const { certificateRegistry } = formik.values;

  return (
    <FadeInUp delay={0}>
      <Stack spacing={4}>
        <Heading
          color={primaryColor}
          lineHeight={1.1}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        >
          Đăng Ký Nhận Giấy Chứng Nhận Tình Nguyện Viên
        </Heading>
        {/* <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
          Chùa có cấp giấy chứng nhận cho HĐ về chùa công quả các dịp lễ ạ. HĐ là sinh viên, chuẩn
          bị đi xin việc, hoặc có nhu cầu lấy giấy chứng nhận thì HĐ đăng ký bên dưới nhé ạ.
        </Text> */}
        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
          Thời gian nhận giấy chứng nhận là 12h00 - 15h00 Thứ 6 ngày 30/12/2022 tại bàn Nhân Sự Đại
          Lễ (Sân cỏ gần phòng Bảo vệ - TTPQ)
        </Text>
      </Stack>
      <Box mt={10}>
        <FormikProvider value={formik}>
          <Form noValidate>
            <Stack spacing={4}>
              <Radios
                name='certificateRegistry'
                label='HĐ có muốn lấy giấy chứng nhận không ạ?'
                isRequired
              >
                <Radio value={CertificateRegistry.YES}>Có</Radio>
                <Radio value={CertificateRegistry.NO}>Không</Radio>
              </Radios>
              {certificateRegistry === CertificateRegistry.YES && (
                <>
                  <Text>Tên trường hoặc nơi công tác</Text>
                  <FloatingLabel name='companyNameVIE' label='Tiếng Việt' isRequired />
                  <FloatingLabel name='companyNameEN' label='Tiếng Anh' />
                </>
              )}
            </Stack>
            <SimpleGrid columns={{ base: 2 }} spacing={{ base: 4, lg: 8 }} mt={8} w={'full'}>
              <Button
                colorScheme='gray'
                flexGrow={1}
                fontFamily={'heading'}
                onClick={() => previousStep()}
              >
                Trở về
              </Button>
              <Button flexGrow={1} type='submit' fontFamily={'heading'}>
                Tiếp theo
              </Button>
            </SimpleGrid>
          </Form>
        </FormikProvider>
      </Box>
    </FadeInUp>
  );
}

export default Step5;
