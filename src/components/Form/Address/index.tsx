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
import { useField } from 'formik';
import { useEffect, useState } from 'react';

type AddressProps = SelectProps & FormControlProps & StackProps;

function Address(props: AddressProps) {
  const { formTextColor } = useCustomColorMode();
  const { name, label, direction, spacing, ...rest } = props;
  const provinceName = `${name}Province`;
  const districtName = `${name}District`;
  const wardName = `${name}Ward`;

  //@ts-ignore
  const [field, { error }, { setValue: setAddressValue }] = useField(name);
  const [{ value: provinceId }, { touched: pTouch }] = useField(provinceName);
  const [
    { value: districtId },
    { touched: dTouch },
    { setTouched: setDTouched, setValue: setDistrict },
  ] = useField(districtName);
  const [{ value: wardId }, { touched: vTouch }, { setTouched: setVTouched, setValue: setWard }] =
    useField(wardName);

  const { data: provinces } = useAxios(
    {
      method: 'get',
      url: API.GET_PROVINCE,
      params: {
        Regions: '1,2,3',
      },
      transformResponse: ({ Data }) => Data,
    },
    [],
  );
  const { data: districts } = useAxios(
    {
      method: 'get',
      url: API.GET_DISTRICT,
      params: { Status: 1, ProvinceId: provinceId },
      transformResponse: ({ Data }) => Data,
    },
    [provinceId],
  );
  const { data: wards } = useAxios(
    {
      method: 'get',
      url: API.GET_WARD,
      params: {
        Status: 1,
        DistrictId: districtId,
      },
      transformResponse: ({ Data }) => Data,
    },
    [districtId],
  );

  const [address, setAddress] = useState({});
  useEffect(() => {
    setAddressValue(address);
  }, [address]);

  useEffect(() => {
    setAddress({ provinceId });
    setDTouched(false);
    setDistrict('');
    setWard('');
  }, [provinceId]);

  useEffect(() => {
    setAddress((old) => ({ ...old, districtId, wardId: '' }));
    setWard('');
    setVTouched(false);
  }, [districtId]);

  useEffect(() => {
    setAddress((old) => ({ ...old, wardId }));
  }, [wardId]);

  const errorMessage = error && Object.values(error)[0];

  return (
    <FormControl isInvalid={!!errorMessage && pTouch && dTouch && vTouch} {...rest}>
      <FormLabel mb={0} color={formTextColor}>
        {label}
      </FormLabel>
      <Stack direction={direction} spacing={spacing}>
        <Select
          valueField='Id'
          labelField='Name'
          placeholder='Tỉnh'
          name={provinceName}
          data={provinces}
          hiddenErrorMessage
        />
        <Select
          valueField='Id'
          labelField='Name'
          placeholder='Huyện'
          name={districtName}
          data={districts}
          isDisabled={!provinceId}
          hiddenErrorMessage
        />
        <Select
          valueField='Id'
          labelField='Name'
          placeholder='Xã'
          name={wardName}
          data={wards}
          isDisabled={!districtId}
          hiddenErrorMessage
        />
      </Stack>
      <VisuallyHiddenInput {...field} />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}

Address.defaultProps = { direction: 'row' } as AddressProps;

export default Address;
