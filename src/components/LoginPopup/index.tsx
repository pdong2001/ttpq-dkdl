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
  Text,
} from '@chakra-ui/react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useContext, useState } from 'react';
import { LoginRole } from '~/dtos/Enums/LoginRole';
import { useAppDispatch } from '~/hooks/reduxHook';
import { MessageContext } from '~/providers/message';
import { getMemberAuth } from '~/slices/memberAuth';
import { REGEX_PHONE } from '~/utils/common';
import RadioButtonGroup from '../RadioButtonGroup';

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
  const [loginRole] = useState(LoginRole.MEMBER);
  const isMemberRole = loginRole === LoginRole.MEMBER;
  const passwordLabel = isMemberRole ? 'Số căn cước hoặc chứng minh thư' : 'Mật khẩu';
  const userLabel = isMemberRole ? 'Số điện thoại ' : 'Tài khoản';

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    setPhone(value);
  };
  const handleIdentityNumberChange = (e) => {
    const { value } = e.target;
    setIdentityNumber(value);
  };
  const login = () => {
    const request = dispatch(
      getMemberAuth({
        data: {
          phoneNumber: phone,
          identityCard: identityNumber,
        },
      }),
    );

    request
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
                {isMemberRole ? (
                  <>
                    <span>{userLabel}</span>
                    <Tooltip rounded='md' hasArrow label='Hãy nhập số điện thoại hợp lệ'>
                      <QuestionOutlineIcon />
                    </Tooltip>
                  </>
                ) : (
                  userLabel
                )}
              </FormLabel>
              <Input placeholder={userLabel} value={phone} onChange={handlePhoneChange} />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>{passwordLabel}</FormLabel>
              <Input
                placeholder={passwordLabel}
                value={identityNumber}
                onChange={handleIdentityNumberChange}
              />
            </FormControl>
            {/* <RadioButtonGroup
              onChange={(value) => {
                setLoginRole(value);
              }}
              options={[
                { value: LoginRole.MEMBER, label: 'Thành viên' },
                { value: LoginRole.ADMIN, label: 'Quản lý' },
              ]}
              defaultValue={loginRole}
              justify='center'
              mt='3'
            /> */}
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
