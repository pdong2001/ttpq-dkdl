const API_PREFIX = import.meta.env.TTPQ_API_PREFIX;
const api = (api: string) => `${API_PREFIX}${api}`;

const REGISTER = api('/member/add');
const UPDATE_REGISTER = api('/EventRegistry/Update/:id');
const LOGIN = api('/Auth/login');
const SEARCH_MEMBER = api('/member/search');

const GET_STRONG_POINT = api('/SkillForRegisters/GetAll');
const GET_DEPARTMENT_BY_EVENT = api('/Department/get-all');
const GET_RECEIVE_CARD_ADDRESSES_BY_EVENT = api('/ReceiveCardAddresses/Event/:id');
const GET_CTN = api('/ctn/list');
const SEARCH_LEADER = api('/EventRegistry/search-leader');
const GET_REGISTER_PAGE = api('/EventRegistryPages/GetById/:shortUri');
const GET_START_ADDRESS_BY_EVENT = api('/StartAddresses/event/:id');
const GET_LEAVE_ADDRESS_BY_EVENT = api('/LeaveAddresses/event/:id');
const GET_REGISTER_INFO = api('/EventRegistry/GetById/:id');
const GET_MEMBER_IN_GROUP = api('/EventRegistry/group/:leaderId');
const LOGIN_MEMBER = api('/Auth/login-member');
const UPLOAD_FILE = api('/BlobStorage/Upload');
const GET_MEMBER_BY_ID = api('/Member/get-by-id/:id');
const UPDATE_MEMBER = api('/Member/update/:id');
const GET_FILE = `${import.meta.env.TTPQ_BASE_URL}/BlobStorage/GetOne/:id`;

/* API from app Nhân sự */
const GET_PROVINCE = '/apis/address/Province';
const GET_DISTRICT = '/apis/address/District';
const GET_WARD = '/apis/address/Ward';
const UPLOAD_PHOTO = '/apis/photo/upload';
const GET_PHOTO = `${import.meta.env.TTPQ_BASE_URL}/apis/photo?key=:key`;

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
  UPLOAD_FILE,
  GET_FILE,
  GET_MEMBER_BY_ID,
  UPDATE_REGISTER,
  UPDATE_MEMBER,
  UPLOAD_PHOTO,
  GET_PHOTO,
};

export default API;
