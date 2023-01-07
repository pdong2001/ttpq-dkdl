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
import { useEffect, useState } from 'react';
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
  const groupName = `${name}_group`;

  //@ts-ignore
  const [field, { value: id }, { error, touched, setValue }] = useField(name);
  const [groupField] = useField(groupName);
  const [groups, setGroups] = useState([]);
  const [CTNs, setCTNs] = useState([]);

  const { data, loaded } = useAxios(
    {
      method: 'get',
      url: API.GET_CTN,
      transformResponse: ({ data }) => data,
    },
    [],
  );

  useEffect(() => {
    const placeName = _.get(_.filter(CTNs, (g) => g.id == id)[0], 'name', '');
    setDataPreview({ [`${name}`]: placeName });
    if (id && loaded) {
      const parent = CTNs.find((ctn) => ctn.id == id);
      const groups = data
        ?.filter((ctn) => ctn.parentId == id)
        .map((group) => {
          group.name = `${group.name} - ${parent?.name}`;
          return group;
        });
      setGroups(groups);
    }
    if (loaded) {
      const CTNs = data.filter((ctn) => ctn.parentId == 0);
      setCTNs(CTNs);
    }
  }, [id, loaded]);

  return (
    <FormControl isRequired={isRequired} isInvalid={!!error && touched}>
      <FormLabel mb={0}>{label}</FormLabel>
      <CustomSelect
        {...field}
        valueField='id'
        labelField='name'
        data={CTNs}
        placeholder='Chúng thanh niên'
        hiddenErrorMessage
      />
      <CustomSelect
        {...groupField}
        valueField='id'
        labelField='name'
        data={groups}
        placeholder='Tổ'
        hiddenErrorMessage
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

export default CultivationPlace;
