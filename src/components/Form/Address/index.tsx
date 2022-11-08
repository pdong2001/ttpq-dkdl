import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  SelectProps,
  Stack,
  StackProps,
  VisuallyHiddenInput,
} from '@chakra-ui/react';
import Select from '../CustomSelect';
import useCustomColorMode from '~/hooks/useColorMode';
import useAxios from '~/hooks/useAxios';
import API from '~/apis/constants';
import { useField, useFormikContext } from 'formik';
import { UpSertMemberDto } from '~/types/Members/UpSertMember.dto';
import { useEffect, useState } from 'react';

type AddressProps = SelectProps & FormControlProps & StackProps;

function Address(props: AddressProps) {
  const { formTextColor } = useCustomColorMode();
  const { name, label, direction, spacing, ...rest } = props;
  const { values } = useFormikContext<UpSertMemberDto>();
  const provinceName = `${name}Province`;
  const districtName = `${name}District`;
  const villageName = `${name}Village`;
  const { data: provinces } = useAxios({ method: 'get', url: API.GET_PROVINCE });
  const provinceId = values[provinceName];
  const districtId = values[districtName];
  const { data: districts } = useAxios(
    {
      method: 'get',
      url: `${API.GET_DISTRICT}/${provinceId}`,
    },
    [provinceId],
  );
  const { data: villages } = useAxios(
    {
      method: 'get',
      url: `${API.GET_VILLAGE}/${districtId}`,
    },
    [districtId],
  );
  //@ts-ignore
  const [field, meta, { setValue: setAddressValue }] = useField(name);
  const [{ value: province }, { touched: pTouch }] = useField(provinceName);
  const [
    { value: district },
    { touched: dTouch },
    { setTouched: setDTouched, setValue: setDistrict },
  ] = useField(districtName);
  const [
    { value: village },
    { touched: vTouch },
    { setTouched: setVTouched, setValue: setVillage },
  ] = useField(villageName);

  const [address, setAddress] = useState({});
  useEffect(() => {
    setAddressValue(address);
  }, [address]);

  useEffect(() => {
    setAddress({ province });
    setDTouched(false);
    setDistrict('');
    setVillage('');
  }, [province]);

  useEffect(() => {
    setAddress((old) => ({ ...old, district, village: undefined }));
    setVillage('');
    setVTouched(false);
  }, [district]);

  useEffect(() => {
    setAddress((old) => ({ ...old, village }));
  }, [village]);
  return (
    <FormControl as='fieldset' isInvalid={!!meta.error && pTouch && dTouch && vTouch} {...rest}>
      <FormLabel as='legend' color={formTextColor}>
        {label}
      </FormLabel>
      <Stack direction={direction} spacing={spacing}>
        <Select placeholder='Tỉnh' name={provinceName} data={provinces} hiddenErrorMessage />
        <Select placeholder='Huyện' name={districtName} data={districts} hiddenErrorMessage />
        <Select placeholder='Xã' name={villageName} data={villages} hiddenErrorMessage />
      </Stack>
      <VisuallyHiddenInput {...field} />
      <FormErrorMessage>{meta?.error}</FormErrorMessage>
    </FormControl>
  );
}

Address.defaultProps = { direction: 'row' } as AddressProps;

export default Address;
