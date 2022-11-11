const REGISTER = '/api/v1/member/add';
const LOGIN = 'api/v1/Auth/login';
const SEARCH_MEMBER = '/api/v1/member/search';
const GET_PROVINCE = '/api/address/Province';
const GET_DISTRICT = '/api/address/District';
const GET_WARD = '/api/address/Ward';
const GET_STRONG_POINT = '/api/v1/Skill/getall';
const GET_DEPARTMENT_BY_EVENT = 'api/v1/Department/get-all';
const GET_RECEIVE_CARD_ADDRESSES_BY_EVENT = '/api/v1/ReceiveCardAddresses/Event/:id';
const GET_CTN = '/api/ctn/list';

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
};

export default API;
