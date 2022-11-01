import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  SelectProps,
  Stack,
  StackProps,
} from '@chakra-ui/react';
import Select from '../CustomSelect';
import useCustomColorMode from '~/hooks/useColorMode';

// địa chỉ
const provinceList = [
  {
    id: 1,
    ma: '80',
    name: 'Long An',
    createdBy: 0,
    createdOn: '2019-03-15T15:20:01.373',
    editedBy: null,
    editedOn: '2019-03-15T15:20:01.373',
    idQuocGia: 57,
    huyens: null,
  },
  {
    id: 2,
    ma: '64',
    name: 'Gia Lai',
    createdBy: 0,
    createdOn: '2019-03-15T15:20:01.39',
    editedBy: null,
    editedOn: '2019-03-15T15:20:01.39',
    idQuocGia: 57,
    huyens: null,
  },
];

// huyen
const districtList = [
  {
    id: 1,
    ma: '8014',
    name: 'Châu Thành',
    createdBy: 0,
    createdOn: '2019-03-15T15:49:53.763',
    editedBy: null,
    editedOn: '2019-03-15T15:49:53.763',
    idTinh: 1,
    tinh: null,
    xas: null,
  },
  {
    id: 2,
    ma: '8009',
    name: 'Bến Lức',
    createdBy: 0,
    createdOn: '2019-03-15T15:49:53.763',
    editedBy: null,
    editedOn: '2019-03-15T15:49:53.763',
    idTinh: 1,
    tinh: null,
    xas: null,
  },
];
const villageList = [
  {
    id: 848,
    ma: '800105',
    name: 'P. 3',
    createdBy: 0,
    createdOn: '2019-03-15T16:23:16.997',
    editedBy: null,
    editedOn: '2019-03-15T16:23:16.997',
    idHuyen: 4,
    huyen: null,
  },
  {
    id: 2360,
    ma: '800101',
    name: 'P. 5',
    createdBy: 0,
    createdOn: '2019-03-15T16:23:24.607',
    editedBy: null,
    editedOn: '2019-03-15T16:23:24.607',
    idHuyen: 4,
    huyen: null,
  },
];
type AddressProps = SelectProps & FormControlProps & StackProps;

function Address(props: AddressProps) {
  const { formTextColor } = useCustomColorMode();
  const { name, label, direction, spacing, ...rest } = props;

  return (
    <FormControl as='fieldset' {...rest}>
      <FormLabel as='legend' color={formTextColor}>
        {label}
      </FormLabel>
      <Stack direction={direction} spacing={spacing}>
        <Select placeholder='Tỉnh' name={`${name}Province`} data={provinceList} />
        <Select placeholder='Huyện' name={`${name}District`} data={districtList} />
        <Select placeholder='Xã' name={`${name}Village`} data={villageList} />
      </Stack>
      <FormErrorMessage>{}</FormErrorMessage>
    </FormControl>
  );
}

Address.defaultProps = { direction: 'row' } as AddressProps;

export default Address;
