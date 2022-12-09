import * as Yup from 'yup';
import { MoveType } from '~/dtos/Enums/MoveType.enum';

const step3Schema = Yup.object({
  moveType: Yup.string().nullable().required(),
  // HCM
  startAddressId: Yup.string()
    .nullable()
    .when('moveType', {
      is: MoveType.WithCTN,
      then: Yup.string().required('Xin hãy chọn nơi xuất phát'),
      otherwise: Yup.string().notRequired(),
    }),
  startTimeId: Yup.string()
    .nullable()
    .when('moveType', {
      is: MoveType.WithCTN,
      then: Yup.string().required('Xin hãy chọn ngày giờ đi'),
      otherwise: Yup.string().notRequired(),
    }),
  // leaveTimeId: Yup.string()
  //   .nullable()
  //   .when('moveType', {
  //     is: MoveType.HCM,
  //     then: Yup.string().required('Xin hãy chọn ngày giờ về HCM'),
  //     otherwise: Yup.string().notRequired(),
  //   }),

  // Tỉnh khác / Tự túc
  otherStartAddress: Yup.string()
    .nullable()
    .when('moveType', {
      is: MoveType.WithCTN,
      then: Yup.string().notRequired(),
      otherwise: Yup.string().required('Xin hãy chọn nơi xuất phát'),
    }),
  otherStartTime: Yup.string().when('moveType', {
    is: MoveType.WithCTN,
    then: Yup.string().notRequired(),
    otherwise: Yup.string().nullable().required('Xin hãy chọn ngày giờ đi'),
  }),
  otherLeaveTime: Yup.string().when('moveType', {
    is: MoveType.WithCTN,
    then: Yup.string().notRequired(),
    otherwise: Yup.string().nullable().required('Xin hãy chọn ngày giờ về'),
  }),
  // thêm field
  transitType: Yup.string().when('moveType', {
    is: MoveType.ByPlane,
    then: Yup.string().required(),
    otherwise: Yup.string().notRequired(),
  }),
});

export default step3Schema;
