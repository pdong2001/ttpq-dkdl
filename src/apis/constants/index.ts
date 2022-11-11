const REGISTER = '/api/v1/member/add';
const LOGIN = 'api/v1/Auth/login';
const SEARCH_MEMBER = '/api/v1/member/search';
const GET_CEREMONY = '/api/v1/Event/get-by-id';
const GET_EVENT_ALL = '/api/v1/Event/get-all';
const GET_PROVINCE = '/api/address/Province';
const GET_DISTRICT = '/api/address/District';
const GET_WARD = '/api/address/Ward';
const GET_STRONG_POINT = '/api/v1/Skill/getall';
const GET_DEPARTMENT_BY_EVENT = 'api/v1/Department/get-all';
const GET_RECEIVE_CARD_ADDRESSES_BY_EVENT = '/api/v1/ReceiveCardAddresses/Event/:id';
const GET_CTN = '/api/ctn/list';
const SEARCH_LEADER = '/api/v1/EventRegistry/search-leader';
const GET_REGISTER_PAGE = '/api/v1/EventRegistryPages/GetById/:shortUri';

const API = {
  REGISTER,
  LOGIN,
  SEARCH_MEMBER,
  GET_PROVINCE,
  GET_DISTRICT,
  GET_CEREMONY,
  GET_EVENT_ALL,
  GET_WARD,
  GET_STRONG_POINT,
  GET_DEPARTMENT_BY_EVENT,
  GET_RECEIVE_CARD_ADDRESSES_BY_EVENT,
  GET_CTN,
  SEARCH_LEADER,
  GET_REGISTER_PAGE,
};

export default API;
