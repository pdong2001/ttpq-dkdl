const REGISTER = '/api/v1/member/add';
const LOGIN = 'api/v1/Auth/login';
const SEARCH_MEMBER = '/api/v1/member/search';
const GET_PROVINCE = 'api/v1/Address/ds-tinh';
const GET_DISTRICT = '/api/v1/Address/ds-huyen';
const GET_VILLAGE = '/api/v1/Address/ds-xa';
const GET_SKILL = '/api/v1/Skill/getall';
const GET_DEPARTMENT_BY_EVENT = 'api/v1/Department/get-all';
const GET_RECEIVE_CARD_ADDRESSES_BY_EVENT = (eventId) =>
  `/api/v1/ReceiveCardAddresses/Event/${eventId}`;

const API = {
  REGISTER,
  LOGIN,
  SEARCH_MEMBER,
  GET_PROVINCE,
  GET_DISTRICT,
  GET_VILLAGE,
  GET_SKILL,
  GET_DEPARTMENT_BY_EVENT,
  GET_RECEIVE_CARD_ADDRESSES_BY_EVENT,
};

export default API;
