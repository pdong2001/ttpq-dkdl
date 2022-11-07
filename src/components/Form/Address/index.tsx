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

  const { data: provinces } = useAxios({ method: 'get', url: API.GET_PROVINCE });

  const { data: districts } = useAxios({
    method: 'get',
    url: `${API.GET_DISTRICT}/${values[`${name}Province`]}`,
  });
  const { data: villages } = useAxios({
    method: 'get',
    url: `${API.GET_DISTRICT}/${values[`${name}District`]}`,
  });
  //@ts-ignore
  const [field, meta, { setValue }] = useField(name);
  const [{ value: province }, { touched: pTouch }] = useField(`${name}Province`);
  const [{ value: district }, { touched: dTouch }, { setTouched: setDTouched }] = useField(
    `${name}District`,
  );
  const [{ value: village }, { touched: vTouch }, { setTouched: setVTouched }] = useField(
    `${name}Village`,
  );
  const [address, setAddress] = useState({});
  useEffect(() => {
    setValue(address);
  }, [address]);
  useEffect(() => {
    setAddress({ province });
    setDTouched(false);
  }, [province]);
  useEffect(() => {
    setAddress((old) => ({ ...old, district, village: undefined }));
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
        <Select placeholder='Tỉnh' name={`${name}Province`} data={provinces} hiddenErrorMessage />
        <Select placeholder='Huyện' name={`${name}District`} data={districts} hiddenErrorMessage />
        <Select placeholder='Xã' name={`${name}Village`} data={villages} hiddenErrorMessage />
      </Stack>
      <VisuallyHiddenInput {...field} />
      <FormErrorMessage>{meta?.error}</FormErrorMessage>
    </FormControl>
  );
}

Address.defaultProps = { direction: 'row' } as AddressProps;

export default Address;
