import { SearchIcon } from '@chakra-ui/icons';
import {
  Avatar,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Spinner,
  Text,
  VisuallyHiddenInput,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useCustomColorMode from '~/hooks/useColorMode';
import API from '~/apis/constants';
import useSearch from '~/hooks/useSearch';
import { ResponseData } from '~/apis/common/type';
import { useField } from 'formik';
import { useAppSelector } from '~/hooks/reduxHook';
import useAxios from '~/hooks/useAxios';
import { formatUrl, getImageSrc } from '~/utils/functions';
import { EventRegistryDto } from '~/dtos/EventRegistries/EventRegistryDto.model';
import { useRouteMatch } from 'react-router-dom';
import { HOME_WITH_SHORT_URI } from '~/routes';
import { RegisterType } from '~/dtos/Enums/RegisterType.enum';

type Props = {
  name: string;
  label: string;
  getLeader: (leader: any) => void;
  color?: string;
  registerTypeFieldName: string;
};
type LeaderData = {
  id: string;
  fullName?: string;
  religiousName?: string;
  avatarPath?: string;
};

const SearchLeader = (props: Props) => {
  const { path } = useRouteMatch();
  const { data: registerPage } = useAppSelector((state) => state.registerPage);
  const { name, label, getLeader, color, registerTypeFieldName } = props;
  const [field, { error, touched }, { setValue }] = useField(name);
  const [registerTypeField] = useField(registerTypeFieldName);

  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { primaryColor } = useCustomColorMode();
  const { leaderId: editLeaderId } = useAppSelector((state) => state.registerInfo.data);
  const { register } = useAppSelector((state) => state.register.data);
  const { leaderId } = register || {};

  const [leader, setLeader] = useState<any>();
  /* from update and navigate case*/
  const { data: editLeader, cancel: editToken } = useAxios<EventRegistryDto>(
    {
      url: formatUrl(API.GET_REGISTER_INFO, { id: leaderId || editLeaderId }),
      transformResponse: ({ data }) => data,
    },
    [leaderId, editLeaderId],
  );
  if (!leaderId && !editLeaderId) {
    editToken.cancel();
  }

  useEffect(() => {
    setLeader(editLeader);
    setValue(editLeader?.id);
    getLeader(editLeader);
  }, [editLeader]);

  const { data, loaded } = useSearch<any, ResponseData<LeaderData>>(
    {
      method: 'post',
      url: API.SEARCH_LEADER,
      data: {
        eventId: registerPage.eventId,
        phoneNumber: searchValue,
        identityCard: searchValue,
      },
    },
    searchValue,
  );

  useEffect(() => {
    const { data: newLeader } = data || {};
    setValue(newLeader?.id || '');
    setLeader(newLeader);
    if (registerTypeField.value === RegisterType.GROUP) {
      getLeader(data);
    } else {
      getLeader({});
    }
  }, [data, registerTypeField.value]);
  const isShow = registerTypeField.value === RegisterType.GROUP;
  const isInvalid = !!error && touched;
  const isValidSearchValue = inputValue?.length >= 8;

  const isHomePage = path === HOME_WITH_SHORT_URI;

  return (
    <FormControl display={isShow ? 'block' : 'none'} isInvalid={isInvalid}>
      <FormLabel color={color}>{label}</FormLabel>
      <SimpleGrid
        columns={{ base: 1, md: isHomePage ? 1 : 2 }}
        alignItems='center'
        gap={{ base: 4, md: 6 }}
      >
        <InputGroup size='md'>
          <Input
            autoComplete='off'
            color={color}
            placeholder='Tìm bằng SĐT hoặc CCCD / CMT'
            focusBorderColor={primaryColor}
            pr='2.5rem'
            value={inputValue}
            onChange={(e) => {
              const { value } = e.target;
              setInputValue(value);
              if (isValidSearchValue) {
                setSearchValue(value);
              }
            }}
            inputMode='numeric'
          />
          <InputRightElement onClick={() => setSearchValue(inputValue)} width='2.6rem'>
            <IconButton size='sm' aria-label='Search' icon={<SearchIcon />} />
          </InputRightElement>
        </InputGroup>
        <HStack spacing={{ base: 4, md: 6, lg: 2 }} justifyContent='center'>
          {!leader ? (
            searchValue &&
            (loaded ? (
              <Text color='blue.300'>{'Không tìm thấy trưởng đoàn'}</Text>
            ) : (
              <Spinner color='blue.500' />
            ))
          ) : (
            <>
              <Avatar src={getImageSrc(leader?.avatarPath || leader?.member?.avatarPath)} />
              <VStack alignItems='start'>
                <Text color={primaryColor} fontWeight='bold'>
                  {leader?.religiousName || leader?.member?.religiousName}
                </Text>
                <Text color={isHomePage ? 'white' : ''}>
                  {leader?.fullName || leader?.member?.fullName}
                </Text>
              </VStack>
            </>
          )}
          {loaded && error && <FormErrorMessage>{error}</FormErrorMessage>}
        </HStack>
      </SimpleGrid>
      <VisuallyHiddenInput {...field} />
    </FormControl>
  );
};

export default SearchLeader;
