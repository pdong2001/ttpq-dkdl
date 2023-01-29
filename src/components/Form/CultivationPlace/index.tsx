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
import { ChungThanhNienDto } from '~/dtos/CTN/ChungThanhNienDto.model';
import { useAppSelector } from '~/hooks/reduxHook';
import { JoinCTN } from '~/dtos/Enums/JoinCTNType.enum';

type CultivationPlaceProps = InputProps &
  FormControlProps &
  StackProps & {
    setDataPreview: Function;
    groupName: string;
    ctnName: string;
    joinedCtn: JoinCTN;
  };

function CultivationPlace(props: CultivationPlaceProps) {
  const { groupName, ctnName, label, isRequired, setDataPreview, joinedCtn } = props;

  //@ts-ignore
  const [field, { value: ctnId, error, touched }, { setValue }] = useField(ctnName);
  const [groupField, { value: groupId }, { setValue: setGroup }] = useField(groupName);
  const [groups, setGroups] = useState<ChungThanhNienDto[]>([]);
  const [CTNs, setCTNs] = useState<ChungThanhNienDto[]>([]);

  const { ctnId: configCTNIds } = useAppSelector((state) => state.registerPage.data);

  const { data: ctnList, loaded } = useAxios<ChungThanhNienDto[]>(
    {
      method: 'get',
      url: API.GET_CTN,
      transformResponse: ({ data }) => data,
    },
    [],
    true,
  );

  useEffect(() => {
    if (ctnId && loaded) {
      const group = ctnList?.find((ctn) => ctn.id == groupId)?.name || '';
      const ctn = ctnList?.find((ctn) => ctn.id == ctnId)?.name || '';
      if (joinedCtn === JoinCTN.JOINED) {
        setDataPreview({ [`${ctnName}`]: [ctn, group].join(' - ') });
      } else {
        setDataPreview({ [`${ctnName}`]: '' });
        setValue('');
        setGroup('');
      }
      // const CTN = CTNs.find((ctn) => ctn.id == ctnId);
      const groups = ctnList?.filter((ctn) => ctn.parentId == ctnId) || [];
      setGroups(groups);
    }
    if (loaded && ctnList) {
      const CTNs = ctnList.filter((ctn) => ctn.parentId == 0 && configCTNIds?.includes(ctn.id));
      setCTNs(CTNs);
    }
  }, [ctnId, loaded, joinedCtn]);
  console.log('render ctn');

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
        onChange={(e) => {
          field.onChange(e);
          setGroup(undefined);
        }}
      />
      <OurSelect
        {...groupField}
        optionValue='id'
        optionLabel='name'
        options={groups}
        placeholder='Tổ'
        hiddenErrorMessage
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

export default CultivationPlace;
