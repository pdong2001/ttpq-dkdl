import { SearchIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
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
import { formatUrl } from '~/utils/functions';
import { EventRegistryDto } from '~/dtos/EventRegistries/EventRegistryDto.model';

type Props = {
  name: string;
  label: string;
  getLeader: Function;
};
type LeaderData = {
  id: string;
  fullName?: string;
  religiousName?: string;
  avatarPath?: string;
};

const SearchLeader = (props: Props) => {
  const { data: registerPage } = useAppSelector((state) => state.registerPage);
  const { name, label, getLeader } = props;
  const [field, { error, touched }, { setValue, setTouched }] = useField(name);

  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { primaryColor, formTextColor } = useCustomColorMode();
  const { leaderId } = useAppSelector((state) => state.registerInfo.data);
  const {
    data: editLeader,
    cancel: editToken,
    loaded: editLoaded,
  } = useAxios<EventRegistryDto>(
    {
      url: formatUrl(API.GET_REGISTER_INFO, { id: leaderId }),
      transformResponse: ({ data }) => data,
    },
    [leaderId],
  );
  if (!leaderId) {
    editToken.cancel();
  }
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
    getLeader(data);
  }, [searchValue]);

  const startSkelotonColor = 'gray.600';
  const endSkeletonColor = loaded ? 'gray.600' : searchValue ? 'gray.500' : 'gray.600';

  useEffect(() => {
    if (loaded) {
      const { data: leader } = data || {};
      if (leader) {
        setValue(leader.id);
      }
    }
  }, [loaded]);

  const isInvalid = (loaded && !data?.data) || (!!error && touched);

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel color={formTextColor} mb={0}>
        {label}
      </FormLabel>
      <SimpleGrid columns={{ base: 1, md: 2 }} alignItems='center' gap={{ base: 4, md: 6 }}>
        <InputGroup size='md'>
          <Input
            placeholder='Tìm bằng SĐT hoặc CCCD / CMT'
            focusBorderColor={primaryColor}
            colorScheme={'ttpq'}
            pr='2.5rem'
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                setSearchValue(inputValue);
                setTouched(false);
              }
            }}
          />
          <InputRightElement onClick={() => setSearchValue(inputValue)} width='2.6rem'>
            <IconButton size='sm' aria-label='Search' icon={<SearchIcon />} />
          </InputRightElement>
        </InputGroup>
        <HStack spacing={{ base: 4, md: 6, lg: 2 }} justifyContent='center'>
          {loaded && (!data?.data || isInvalid) ? (
            <FormErrorMessage>
              {(touched ? error : '') || (!data?.data && 'Không tìm thấy trưởng đoàn')}
            </FormErrorMessage>
          ) : (
            <>
              <SkeletonCircle
                isLoaded={loaded || !!leaderId}
                startColor={startSkelotonColor}
                endColor={endSkeletonColor}
                size='16'
                as={Flex}
                alignItems='center'
              >
                <Avatar src={data?.data?.avatarPath || editLeader?.member?.avatarPath} />
              </SkeletonCircle>
              <VStack alignItems='start' color={formTextColor}>
                <Skeleton
                  as={Flex}
                  justifyItems='center'
                  isLoaded={loaded || !!leaderId}
                  startColor={startSkelotonColor}
                  endColor={endSkeletonColor}
                  height={8}
                  minWidth={32}
                >
                  <Text color={primaryColor} fontWeight='bold'>
                    {data?.data?.fullName || editLeader?.member?.fullName}
                  </Text>
                </Skeleton>
                <Skeleton
                  isLoaded={loaded || !!leaderId}
                  startColor={startSkelotonColor}
                  endColor={endSkeletonColor}
                  height={8}
                  minWidth={40}
                >
                  <Text>{data?.data?.religiousName || editLeader?.member?.religiousName}</Text>
                </Skeleton>
              </VStack>
            </>
          )}
        </HStack>
      </SimpleGrid>
      <VisuallyHiddenInput {...field} />
    </FormControl>
  );
};

export default SearchLeader;
