import * as Yup from 'yup';
import { CertificateRegistry } from '~/dtos/Enums/CertificateRegistry.enum';

const step5Schema = Yup.object({
  companyNameVIE: Yup.string().when('certificateRegistry', {
    is: CertificateRegistry.NO,
    then: Yup.string().notRequired(),
    otherwise: Yup.string().nullable().required('Xin hãy điền tên trường hoặc nơi công tác'),
  }),
});

export default step5Schema;
