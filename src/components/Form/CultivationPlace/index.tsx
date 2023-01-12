import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  InputProps,
  StackProps,
} from '@chakra-ui/react';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useField } from 'formik';
import API from '~/apis/constants';
import useAxios from '~/hooks/useAxios';
import OurSelect from '../MultiSelect';

type CultivationPlaceProps = InputProps &
  FormControlProps &
  StackProps & {
    setDataPreview: Function;
  };

function CultivationPlace(props: CultivationPlaceProps) {
  const { name, label, isRequired, setDataPreview } = props;
  // const groupName = `${name}_group`;

  //@ts-ignore
  const [field, { value: id, error, touched }, { setValue }] = useField(name);
  // const [groupField, , { setValue: setGroup }] = useField(groupName);
  // const [groups, setGroups] = useState([]);
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
    if (id && loaded) {
      const placeName = _.get(_.filter(data, (g) => g.id == id)[0], 'name', '');

      setDataPreview({ [`${name}`]: placeName });
      const parent = CTNs.find((ctn) => ctn.id == id);
      // const groups = data
      //   ?.filter((ctn) => ctn.parentId == id)
      //   .map((group) => {
      //     group.name = `${group.name} - ${parent?.name}`;
      //     return group;
      //   });
      // setGroups(groups);
    }
    if (loaded) {
      const CTNs = data.filter((ctn) => ctn.parentId == 0);
      setCTNs(CTNs);
    }
  }, [id, loaded]);
  console.log('ctn error', error, touched);

  return (
    <FormControl isRequired={isRequired} isInvalid={!!error && touched}>
      <FormLabel mb={0}>{label}</FormLabel>
      <OurSelect
        {...field}
        name={field.name}
        optionValue='id'
        optionLabel='name'
        options={CTNs}
        placeholder='Chọn điểm tu tập'
        hiddenErrorMessage
        isSearchable
        // onChange={(e) => {
        //   field.onChange(e);
        //   // setGroup(undefined);
        // }}
      />
      {/* <OurSelect
        {...groupField}
        optionValue='id'
        optionLabel='name'
        options={groups}
        placeholder='Tổ'
        hiddenErrorMessage
      /> */}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

export default CultivationPlace;
