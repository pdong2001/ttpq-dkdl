const REGISTER = '/api/v1/member/add';
const LOGIN = 'api/v1/Auth/login';
const SEARCH_MEMBER = '/api/v1/member/search';
const GET_PROVINCE = '/api/address/Province';
const GET_DISTRICT = '/api/address/District';
const GET_WARD = '/api/address/Ward';
const GET_STRONG_POINT = '/api/v1/SkillForRegisters/GetAll';
const GET_DEPARTMENT_BY_EVENT = 'api/v1/Department/get-all';
const GET_RECEIVE_CARD_ADDRESSES_BY_EVENT = '/api/v1/ReceiveCardAddresses/Event/:id';
const GET_CTN = '/api/ctn/list';
const SEARCH_LEADER = '/api/v1/EventRegistry/search-leader';
const GET_REGISTER_PAGE = '/api/v1/EventRegistryPages/GetById/:shortUri';
const GET_START_ADDRESS_BY_EVENT = '/api/v1/StartAddresses/event/:id';
const GET_LEAVE_ADDRESS_BY_EVENT = '/api/v1/LeaveAddresses/event/:id';
const GET_REGISTER_INFO = '/api/v1/EventRegistry/GetById/:id';
const GET_MEMBER_IN_GROUP = '/api/v1/EventRegistry/group/:leaderId';
const LOGIN_MEMBER = '/api/v1/Auth/login-member';

const API = {
  REGISTER,
  LOGIN,
  SEARCH_MEMBER,
  GET_PROVINCE,
  GET_DISTRICT,
  GET_WARD,
  GET_STRONG_POINT,
  GET_DEPARTMENT_BY_EVENT,
  GET_RECEIVE_CARD_ADDRESSES_BY_EVENT,
  GET_CTN,
  SEARCH_LEADER,
  GET_REGISTER_PAGE,
  GET_START_ADDRESS_BY_EVENT,
  GET_LEAVE_ADDRESS_BY_EVENT,
  GET_REGISTER_INFO,
  GET_MEMBER_IN_GROUP,
  LOGIN_MEMBER,
};

export default API;
