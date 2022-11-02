import { Box, Divider, Grid, GridItem, Avatar, IconButton, Stack, Button, Tag, TagLeftIcon, TagLabel, HStack } from '@chakra-ui/react';
import {
  Heading,
  Text,
  useColorModeValue,
  Tooltip
} from '@chakra-ui/react';
import React from 'react';

import { useDisclosure } from '@chakra-ui/react'

import {
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { MdPhone, MdContentCopy, MdDepartureBoard, MdLocationCity, MdFacebook } from "react-icons/md";
import { FaUserSecret, FaUserTie } from "react-icons/fa";
import { InputGroup, Input, InputRightElement } from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

// type Props = {};

const RegisterInfo = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)

  const tableInfo = [
    { title: "Giới tính", value: "Nam" },
    { title: "Năm sinh", value: "2000" },
    { title: "Căn cước", value: "001*******71" },
    { title: "Điện thoại", value: "09*****880" },
    { title: "Thư điện tử", value: "th***@gmail.com" }
  ];

  const tableInfoRight = [
    { title: "Pháp Danh", value: "Lương Phong Duy" },
    { title: "Nơi sinh hoạt", value: "CTN Đông Hà Nội" },
    { title: "Tổ sinh hoạt", value: "Nông nghiệp" },
    { title: "Địa chỉ liên hệ", value: "234 Láng Hạ, Q. Đống Đa, TP. Hà Nội" },
    { title: "Kỹ năng", value: "Tin học" },
  ]

  const groupMembers = [
    { name: 'Nguyễn Văn A', phone: '09*****123', role: 1 },
    { name: 'Hoàng Thị Hồng Nhung', phone: '09*****456', role: 2 },
    { name: 'Trần Văn B', phone: '09*****555', role: 0 },
    { name: 'Đỗ Thị D', phone: '09*****666', role: 0 },
  ]

  const departments = [
    "Hướng dẫn", "Môi trường", "Bảo vệ"
  ]

  return (
    <Box pt={24} pb={12} px={{ base: '3%', sm: '18%', md: '3%', xl: '10%' }}
      backgroundImage={'radial-gradient(150% 100% at 120% 0%, #fcaf17 0%, #0c4da2 100%)'}
      backgroundSize={'auto 240px'}
      backgroundRepeat={'no-repeat'}
    >
      <Grid
        templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(12, 1fr)' }}
        pt={10}
        gap={{ base: 5, xl: 10 }}
      >
        <GridItem colSpan={{ base: 3, md: 5, lg: 4 }}>
          <Box
            w={'full'}
            h={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            py={6}
            boxShadow={'2xl'}
            rounded={'lg'}
            textAlign={'center'}>
            <Avatar
              size={'2xl'}
              src={
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
              }
              mb={4}
              pos={'relative'}
            />
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              Đặng Duy Thanh
            </Heading>
            <Text fontWeight={600} color={'gray.500'} mt={2} mb={5}>
              <Button size='sm' leftIcon={<MdFacebook />} colorScheme='facebook' variant='solid'>
                Facebook
              </Button>
            </Text>
            <TableContainer>
              <Table variant='simple' colorScheme={'gray'}>
                <Tbody borderTop={'1px solid var(--chakra-colors-chakra-border-color)'}>
                  {tableInfo.map((ele) => (
                    <Tr>
                      <Td pr={0} pl={{ base: 5, sm: 7, md: 5 }}><Text as='b'>{ele.title}</Text></Td>
                      <Td pl={0} pr={{ base: 5, sm: 7, md: 5 }}>{ele.value}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>

            <Stack px={6} pt={5} textAlign={'center'} spacing={2} direction='column'>
              <Text as='b' color={'var(--chakra-colors-ttpq-600)'}>Đường dẫn vào nhóm</Text>
              <InputGroup size='md'>
                <Input
                  colorScheme={'red'}
                  isReadOnly={true}
                  variant='filled'
                  pr='2.5rem'
                  type='text'
                  value='https://invitelink.com/abcdadfad'
                />
                <InputRightElement width='2.5rem'>
                  <IconButton
                    size='sm'
                    aria-label='Copy Link'
                    icon={<MdContentCopy />}
                  />
                </InputRightElement>
              </InputGroup>
            </Stack>
          </Box>
        </GridItem>
        <GridItem colSpan={{ base: 3, md: 7, lg: 8 }}>
          <Box
            w={'full'}
            h={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            p={6}
            rounded={'lg'}>
            <Stack pb={6}>
              <HStack>
                <Text w={'full'} as='b' color={'var(--chakra-colors-ttpq-600)'} fontSize='xl'>
                  Thông tin
                </Text>
                <Button onClick={onOpen} size='sm'>
                  Cập nhật
                </Button>
                <Modal
                  initialFocusRef={initialRef}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Xác nhận thông tin</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <FormControl>
                        <FormLabel>Số điện thoại</FormLabel>
                        <Input ref={initialRef} placeholder='Số điện thoại' />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Số căn cước hoặc chứng minh thư</FormLabel>
                        <Input placeholder='Số CCCD/CMT' />
                      </FormControl>
                    </ModalBody>

                    <ModalFooter>
                      <Button>
                        Gửi
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </HStack>

              <Divider borderBottomWidth={'2px'} />

              <TableContainer whiteSpace={'break-spaces'}>
                <Table variant="unstyled" size='sm'>
                  <Tbody>
                    {tableInfoRight.map((ele) => (
                      <Tr>
                        <Td minW={'120px'} px={0}><Text as='b'>{ele.title}</Text></Td>
                        <Td px={0}>{ele.value}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Stack>

            <Tabs isFitted variant='enclosed'>
              <TabList>
                <Tab>Công quả</Tab>
                <Tab>Lịch trình</Tab>
                <Tab>Khác</Tab>
              </TabList>

              <TabPanels>
                <TabPanel px={0}>
                  <Stack spacing='30px'>
                    <Box>
                      <Text as='b'>Số lần đã về chùa:</Text> 2 lần
                    </Box>
                    <Box>
                      <Text as='b'>Kinh nghiệm làm việc tại các ban</Text>
                      <Box mt={2}>
                        {departments.map((ele) => (
                          <Tag colorScheme={'blue'} mr={2} mb={1} borderRadius='full'>{ele}</Tag>
                        ))}
                      </Box>
                    </Box>
                    <Box>
                      <Text as='b'>
                        Nguyện vọng làm việc tại ban
                      </Text>
                      <Box mt={2}>
                        <Tag colorScheme={'pink'} borderRadius='full'>Môi trường</Tag>
                      </Box>
                    </Box>
                    <Box>
                      <Text as='b'>Nơi nhận thẻ:</Text> Ở Tổ Đình
                    </Box>
                  </Stack>
                </TabPanel>
                <TabPanel px={0}>
                  <Stack spacing='30px'>
                    <Box>
                      <HStack>
                        <MdLocationCity /><Text as='b'>Địa điểm xuất phát</Text>
                      </HStack>
                      <Text>Bến xe buýt Trường ĐH Nông Lâm TP. HCM</Text>
                    </Box>
                    <Box>
                      <HStack>
                        <MdDepartureBoard /><Text as='b'>Thời gian xuất phát</Text>
                      </HStack>
                      <Box mt={2}>
                        <Tag colorScheme={'blue'}>08:00 01-12-2022</Tag>
                      </Box>
                    </Box>
                    <Box>
                      <HStack>
                        <MdDepartureBoard /><Text as='b'>Thời gian trở về</Text>
                      </HStack>
                      <Box mt={2}>
                        <Tag colorScheme={'pink'}>15:00 05-12-2022</Tag>
                      </Box>
                    </Box>
                  </Stack>
                </TabPanel>
                <TabPanel px={0}>
                  <Stack spacing='30px'>
                    <Box>
                      <Text as='b'>Thành viên nhóm</Text>
                      <TableContainer whiteSpace={'break-spaces'} maxW={'400px'}>
                        <Table variant="unstyled" size='sm'>
                          <Tbody>
                            {groupMembers.map((ele) => (
                              <Tr>
                                <Td py={1} px={0}>
                                  <Text>{ele.name}</Text>
                                </Td>
                                <Td>
                                  {ele.role == 1 && <Tooltip label='Trưởng nhóm'><span><FaUserSecret /></span></Tooltip>}
                                  {ele.role == 2 && <Tooltip label='Phó nhóm'><span><FaUserTie /></span></Tooltip>}
                                </Td>
                                <Td py={1} px={0}>
                                  <Tag colorScheme={'blue'}><TagLeftIcon boxSize='12px' as={MdPhone} />
                                    <TagLabel>{ele.phone}</TagLabel></Tag>
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </Box>
                    <Box>
                      <Text as='b'>
                        Ghi chú:
                      </Text>
                      <Text>

                      </Text>
                    </Box>
                  </Stack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default RegisterInfo;
