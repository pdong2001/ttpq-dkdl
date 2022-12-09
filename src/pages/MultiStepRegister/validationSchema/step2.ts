import * as Yup from 'yup';
import { RegisterType } from '~/dtos/Enums/RegisterType.enum';
import { REGEX_YEAR_MONTH_DAY } from '~/utils/common';
import Validator from '~/utils/common/validator';

const step2Schema = Yup.object({
  dob: Yup.object()
    .shape({
      date: Yup.string(),
      month: Yup.string(),
      year: Yup.string(),
    })
    .test({
      name: 'validDOB',
      test: (value, context) => {
        const { year, month, date } = value;
        if (!(year || month || date)) {
          return context.createError({ message: 'Bạn ơi, nhập ngày sinh nha' });
        }
        const isValidDateFormat = REGEX_YEAR_MONTH_DAY.test([date, month, year].join('-'));
        const isValidDateFollowCalender = Validator.validateCalenderDate(value);
        return (
          (isValidDateFormat && isValidDateFollowCalender) ||
          context.createError({ message: 'Bạn ơi, Ngày không hợp lệ rồi' })
        );
      },
    }),
  dobDate: Yup.string().required(),
  dobMonth: Yup.string().required(),
  dobYear: Yup.string().required(),
  // email: Yup.string().email('Email không hợp lệ').required('Xin hãy nhập email'),
  email: Yup.string().email('Email không hợp lệ'),
  permanentAddress: Yup.object().shape({
    provinceId: Yup.number(),
    districtId: Yup.number(),
    wardId: Yup.number().required('Bạn ơi, nhập đủ địa chỉ nha'),
  }),
  permanentAddressProvince: Yup.string().required(),
  permanentAddressDistrict: Yup.string().required(),
  permanentAddressWard: Yup.string().required(),
  temporaryAddress: Yup.object().shape({
    provinceId: Yup.number(),
    districtId: Yup.number(),
    wardId: Yup.number().required('Bạn ơi, nhập đủ địa chỉ nha'),
  }),
  temporaryAddressProvince: Yup.string().required(),
  temporaryAddressDistrict: Yup.string().required(),
  temporaryAddressWard: Yup.string().required(),
  leaderId: Yup.string().when('registerType', {
    is: RegisterType.GROUP,
    then: Yup.string().required('Hãy tìm trưởng đoàn của bạn'),
    otherwise: Yup.string(),
  }),
  // organizationStructureId: Yup.number().required('Xin hãy chọn nơi sinh hoạt'),
});

export default step2Schema;
