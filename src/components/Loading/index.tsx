import { Modal, ModalOverlay, ModalContent, Spinner, Flex } from '@chakra-ui/react';
import { useAppSelector } from '~/hooks/reduxHook';
import useCustomColorMode from '~/hooks/useColorMode';

const Loading = () => {
  //   const { isOpen, onOpen, onClose } = useDisclosure();
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const { primaryColor } = useCustomColorMode();
  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isLoading} onClose={() => {}}>
        <ModalOverlay />
        <ModalContent
          bgColor='transparent'
          as={Flex}
          boxShadow='none'
          alignItems='center'
          justifyContent='center'
          h='100vh'
          m='0'
        >
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color={primaryColor}
            size='xl'
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Loading;
