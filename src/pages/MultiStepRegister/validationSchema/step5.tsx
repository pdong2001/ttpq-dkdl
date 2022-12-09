import * as Yup from 'yup';

const step5Schema = Yup.object({
  certificateRegistry: Yup.string().required(),
});

export default step5Schema;
