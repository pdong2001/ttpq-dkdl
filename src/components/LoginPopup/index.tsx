import { QuestionOutlineIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Tooltip,
} from '@chakra-ui/react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useContext, useState } from 'react';
import { useAppDispatch } from '~/hooks/reduxHook';
import { MessageContext } from '~/providers/message';
import { getMemberAuth } from '~/slices/memberAuth';
import { REGEX_PHONE } from '~/utils/common';

type LoginProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSuccess?: () => void;
  isLogin?: boolean;
};

const LoginPopup = ({ isOpen, onClose, title, onSuccess, isLogin }: LoginProps) => {
  const [phone, setPhone] = useState('');
  const [identityNumber, setIdentityNumber] = useState('');
  const dispatch = useAppDispatch();
  const messageService = useContext(MessageContext);

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    setPhone(value);
  };
  const handleIdentityNumberChange = (e) => {
    const { value } = e.target;
    setIdentityNumber(value);
  };
  const login = () => {
    dispatch(
      getMemberAuth({
        data: {
          phoneNumber: phone,
          identityCard: identityNumber,
        },
      }),
    )
      .then(unwrapResult)
      .then(() => {
        onSuccess?.();
      })
      .catch((err) => {
        if (err?.message) {
          messageService.add({
            title: err.message,
            status: 'error',
          });
        }
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>

          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>
                Số điện thoại{' '}
                <Tooltip label='Số điện thoại phải đủ 10 số ạ'>
                  <QuestionOutlineIcon />
                </Tooltip>
              </FormLabel>
              <Input placeholder='Số điện thoại' value={phone} onChange={handlePhoneChange} />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Số căn cước hoặc chứng minh thư</FormLabel>
              <Input
                placeholder='Số CCCD/CMT'
                value={identityNumber}
                onChange={handleIdentityNumberChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button disabled={!REGEX_PHONE.test(phone) || !identityNumber} type='submit'>
              {isLogin ? 'Đăng nhập' : 'Xác thực'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default LoginPopup;
