import * as Yup from 'yup';

const step4Schema = (serveDates) =>
  Yup.object({
    // exps: Yup.string().required('Xin hãy chọn số lần về chùa công quả'),
    // strongPointIds: Yup.array()
    //   .nullable()
    //   .test({
    //     name: 'strongPoint',
    //     test: (value, context) => {
    //       if (!value?.length) {
    //         return context.createError({ message: 'Xin hãy chọn kỹ năng, sở trường' });
    //       }
    //       return true;
    //     },
    //   }),
    // expDepartmentIds: Yup.array()
    //   .nullable()
    //   .test({
    //     name: 'expDepartment',
    //     test: (value, context) => {
    //       if (!value?.length) {
    //         return context.createError({ message: 'Xin hãy chọn ban kinh nghiệm' });
    //       }
    //       return true;
    //     },
    //   }),
    registeredDays: Yup.array()
      .nullable()
      .test({
        name: 'registeredDays',
        test: (value, context) => {
          if (serveDates.length && !value?.length) {
            return context.createError({ message: 'Xin hãy chọn ngày công quả' });
          }
          return true;
        },
      }),
    // wishDepartmentId: Yup.string().nullable().required('Xin hãy chọn ban muốn tham gia'),
    // receiveCardAddressId: Yup.string().required('Xin hãy chọn nơi muốn nhận thẻ'),
    // avatarPath: Yup.string().required('Xin hãy chọn ảnh để làm thẻ công quả'),
    // clothingSize: Yup.string().required('Xin hãy chọn size áo'),
  });

export default step4Schema;
