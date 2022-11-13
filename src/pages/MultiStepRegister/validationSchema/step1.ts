import * as Yup from 'yup';
import { REGEX_PHONE } from '~/utils/common';
import { RegisterType } from '../constants';

const step1Schema = Yup.object({
  fullName: Yup.string().required('Xin hãy nhập họ và tên'),
  phoneNumber: Yup.string()
    .required('Xin hãy nhập số điện thoại')
    .matches(REGEX_PHONE, 'Số điện thoại không hợp lệ'),
  identityCard: Yup.string().required('Xin hãy nhập số CCCD / Hộ chiếu'),
  leaderId: Yup.string().when('registerType', {
    is: RegisterType.GROUP,
    then: Yup.string().required('Hãy tìm trưởng đoàn của bạn'),
    otherwise: Yup.string(),
  }),
});

export default step1Schema;
