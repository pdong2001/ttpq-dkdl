import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  InputProps,
  StackProps,
} from '@chakra-ui/react';
import CustomSelect from '~/components/Form/CustomSelect';
import _ from 'lodash';
import { useEffect } from 'react';
import useCustomColorMode from '~/hooks/useColorMode';
import { useField } from 'formik';
import API from '~/apis/constants';
import useAxios from '~/hooks/useAxios';

type CultivationPlaceProps = InputProps &
  FormControlProps &
  StackProps & {
    setDataPreview: Function;
  };

function CultivationPlace(props: CultivationPlaceProps) {
  const { formTextColor } = useCustomColorMode();
  const { name, label, isRequired, setDataPreview } = props;

  //@ts-ignore
  const [field, { value: id }, { error, touched }] = useField(name);

  const { data: groups } = useAxios(
    {
      method: 'get',
      url: API.GET_CTN,
      transformResponse: ({ Data }) => Data,
    },
    [],
  );

  useEffect(() => {
    const placeName = _.get(_.filter(groups, (g) => g.Id == id)[0], 'Name', '');
    console.log('set preview cultivation', placeName);

    setDataPreview({ [`${name}`]: placeName });
  }, [id]);

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
