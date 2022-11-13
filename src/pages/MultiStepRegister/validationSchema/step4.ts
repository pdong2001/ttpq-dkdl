import * as Yup from 'yup';

const step4Schema = Yup.object({
  // exps: Yup.string().required('Xin hãy chọn số lần về chùa công quả'),
  strongPointIds: Yup.array()
    .nullable()
    .test({
      name: 'strongPoint',
      test: (value, context) => {
        if (!value?.length) {
          return context.createError({ message: 'Xin hãy chọn kỹ năng, sở trường' });
        }
        return true;
      },
    }),
  expDepartmentIds: Yup.array()
    .nullable()
    .test({
      name: 'expDepartment',
      test: (value, context) => {
        if (!value?.length) {
          return context.createError({ message: 'Xin hãy chọn ban kinh nghiệm' });
        }
        return true;
      },
    }),
  wishDepartmentIds: Yup.string().required('Xin hãy chọn ban muốn tham gia'),
  receiveCardAddressId: Yup.string().required('Xin hãy chọn nơi muốn nhận thẻ'),
  avatarPath: Yup.string().required('Xin hãy chọn ảnh để làm thẻ công quả'),
});

export default step4Schema;
