import * as Yup from 'yup';
import { CertificateRegistry } from '~/dtos/Enums/CertificateRegistry.enum';

const step5Schema = Yup.object({
  companyNameVIE: Yup.string().when('certificateRegistry', {
    is: CertificateRegistry.YES,
    then: Yup.string().nullable().required('Xin hãy điền tên trường hoặc nơi công tác'),
    otherwise: Yup.string().notRequired(),
  }),
});

export default step5Schema;
