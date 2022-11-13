import * as Yup from 'yup';

const step3Schema = Yup.object({
  moveType: Yup.string().nullable().required(),
  // HCM
  startAddress: Yup.string()
    .nullable()
    .when('moveType', {
      is: '0',
      then: Yup.string().required('Xin hãy chọn nơi xuất phát HCM'),
      otherwise: Yup.string().notRequired(),
    }),
  startTimeId: Yup.string()
    .nullable()
    .when('moveType', {
      is: '0',
      then: Yup.string().required('Xin hãy chọn ngày giờ đi HCM'),
      otherwise: Yup.string().notRequired(),
    }),
  leaveTimeId: Yup.string()
    .nullable()
    .when('moveType', {
      is: '0',
      then: Yup.string().required('Xin hãy chọn ngày giờ về HCM'),
      otherwise: Yup.string().notRequired(),
    }),

  // Tỉnh khác / Tự túc
  otherStartAddress: Yup.string()
    .nullable()
    .when('moveType', {
      is: '1' || '2',
      then: Yup.string().required('Xin hãy chọn nơi xuất phát TinhKhac / Tự túc'),
      otherwise: Yup.string().notRequired(),
    }),
  otherStartTime: Yup.string()
    .nullable()
    .when('moveType', {
      is: '1' || '2',
      then: Yup.string().required('Xin hãy chọn ngày giờ đi TinhKhac / Tự túc'),
      otherwise: Yup.string().notRequired(),
    }),
  otherLeaveTime: Yup.string()
    .nullable()
    .when('moveType', {
      is: '1' || '2',
      then: Yup.string().required('Xin hãy chọn ngày giờ về TinhKhac / Tự túc'),
      otherwise: Yup.string().notRequired(),
    }),
});

export default step3Schema;
