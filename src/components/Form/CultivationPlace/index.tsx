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
import { useField } from 'formik';
import API from '~/apis/constants';
import useAxios from '~/hooks/useAxios';

type CultivationPlaceProps = InputProps &
  FormControlProps &
  StackProps & {
    setDataPreview: Function;
  };

function CultivationPlace(props: CultivationPlaceProps) {
  const { name, label, isRequired, setDataPreview } = props;

  //@ts-ignore
  const [field, { value: id }, { error, touched }] = useField(name);

  const { data: groups, loaded } = useAxios(
    {
      method: 'get',
      url: API.GET_CTN,
      transformResponse: ({ data }) => data,
    },
    [],
  );

  useEffect(() => {
    const placeName = _.get(_.filter(groups, (g) => g.id == id)[0], 'name', '');
    setDataPreview({ [`${name}`]: placeName });
  }, [id, loaded]);

  return (
    <FormControl isRequired={isRequired} isInvalid={!!error && touched}>
      <FormLabel mb={0}>{label}</FormLabel>
      <CustomSelect
        {...field}
        valueField='id'
        labelField='name'
        data={groups}
        placeholder='Nơi sinh hoạt'
        hiddenErrorMessage
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

export default CultivationPlace;
