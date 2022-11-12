import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  InputProps,
  StackProps,
} from '@chakra-ui/react';
import CustomSelect from '~/components/Form/CustomSelect';
import useCustomColorMode from '~/hooks/useColorMode';
import { useField } from 'formik';
import API from '~/apis/constants';
import useAxios from '~/hooks/useAxios';

type CultivationPlaceProps = InputProps & FormControlProps & StackProps;

function CultivationPlace(props: CultivationPlaceProps) {
  const { formTextColor } = useCustomColorMode();
  const { name, label, isRequired } = props;

  //@ts-ignore
  const [field, { error, touched }, { setValue }] = useField(name);

  const { data: groups } = useAxios(
    {
      method: 'get',
      url: API.GET_CTN,
      transformResponse: ({ Data }) => Data,
    },
    [],
  );

  return (
    <FormControl isRequired={isRequired} isInvalid={!!error && touched}>
      <FormLabel mb={0} color={formTextColor}>
        {label}
      </FormLabel>
      <CustomSelect
        {...field}
        valueField='Id'
        labelField='Name'
        data={groups}
        placeholder='Nơi sinh hoạt'
        hiddenErrorMessage
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

export default CultivationPlace;
