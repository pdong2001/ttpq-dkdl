import {
  Box,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Image } from '@chakra-ui/react';
// import environmentDepartment from '~/assets/enviroment.jpg';
import department_names from '../../configs/departmemt';
import './style.css';
type Props = {};

function DepartmentInfos({}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [departmentSelected, setDepartmentSelected] = useState({
    name: '',
    image: '',
    desc: <></>,
  });
  // let departmentSelected = { name: '', image: '' };
  const handleViewDetail = (item: any) => {
    // departmentSelected = item;
    setDepartmentSelected(item);
    console.log('departmentSelected', departmentSelected);

    console.log('item', item);
    onOpen();
  };
  return (
    <Box bgGradient={'linear(to-r, blue.300, ttpq.700)'}>
      <Container
        minH={'100vh'}
        centerContent
        justifyContent='center'
        py='30px'
        className='container'
      >
        {/* Department information */}
        <Wrap spacing='10px' w={{ xl: '1100px', md: '760px' }} className='wrap-department'>
          {department_names.map((item, index) => DepartmentItem(index, item, handleViewDetail))}
        </Wrap>
        <Modal isOpen={isOpen} size='2xl' onClose={onClose} isCentered scrollBehavior='inside'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <h1
                style={{
                  textAlign: 'center',
                  fontSize: '30px',
                }}
              >
                {departmentSelected && departmentSelected.name}
              </h1>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody className='modal-body-department'>
              <Container boxSize='lg' mb='20px'>
                <Image
                  src={departmentSelected && departmentSelected.image}
                  alt='MT'
                  borderRadius={'lg'}
                  _hover={{
                    scale: '1.2',
                  }}
                ></Image>
              </Container>
              {departmentSelected && departmentSelected.desc}

              {/* <Lorem count={2} />
               */}
            </ModalBody>

            <ModalFooter display={'block'} textAlign='center'>
              <Button colorScheme='blue' mr={3}>
                Đăng ký ngay!
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
}
const DepartmentItem = (index: number, item: any, handleViewDetail: any) => {
  const [hide, setHide] = useState(true);

  return (
    <WrapItem key={index} mb='10px'>
      <Box
        boxSize='xs'
        pos='relative'
        onMouseOver={() => setHide(false)}
        onMouseOut={() => setHide(true)}
        _hover={{
          // opacity: 0.5,
          scale: '1.2',
        }}
      >
        <Image
          src={item.image}
          alt={item.name}
          borderRadius={'lg'}
          _hover={{
            // opacity: 0.5,
            scale: '1.2',
          }}
        ></Image>
        {!hide && (
          <Box pos='absolute' zIndex={100} w='100%' top='45%' opacity={1.5}>
            <Button onClick={() => handleViewDetail(item)}>Xem thêm</Button>
          </Box>
        )}
      </Box>
    </WrapItem>
  );
};
export default DepartmentInfos;
