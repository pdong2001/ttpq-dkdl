import { DepartureType } from '~/pages/MultiStepRegister/constants';
import * as Yup from 'yup';

const step3Schema = Yup.object({
  moveType: Yup.string().nullable().required(),
  // HCM
  startAddressId: Yup.string()
    .nullable()
    .when('moveType', {
      is: DepartureType.HCM,
      then: Yup.string().required('Xin hãy chọn nơi xuất phát HCM'),
      otherwise: Yup.string().notRequired(),
    }),
  startTimeId: Yup.string()
    .nullable()
    .when('moveType', {
      is: DepartureType.HCM,
      then: Yup.string().required('Xin hãy chọn ngày giờ đi HCM'),
      otherwise: Yup.string().notRequired(),
    }),
  leaveTimeId: Yup.string()
    .nullable()
    .when('moveType', {
      is: DepartureType.HCM,
      then: Yup.string().required('Xin hãy chọn ngày giờ về HCM'),
      otherwise: Yup.string().notRequired(),
    }),

  // Tỉnh khác / Tự túc
  otherStartAddress: Yup.string()
    .nullable()
    .when('moveType', {
      is: DepartureType.HCM,
      then: Yup.string().notRequired(),
      otherwise: Yup.string().required('Xin hãy chọn nơi xuất phát'),
    }),
  otherStartTime: Yup.string()
    .nullable()
    .when('moveType', {
      is: DepartureType.HCM,
      then: Yup.string().notRequired(),
      otherwise: Yup.string().required('Xin hãy chọn ngày giờ đi'),
    }),
  otherLeaveTime: Yup.string()
    .nullable()
    .when('moveType', {
      is: DepartureType.HCM,
      then: Yup.string().notRequired(),
      otherwise: Yup.string().required('Xin hãy chọn ngày giờ về'),
    }),
});

export default step3Schema;
