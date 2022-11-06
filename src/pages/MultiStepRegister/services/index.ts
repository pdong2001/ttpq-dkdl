import { createAsyncRequest } from '~/apis/common/action';
import { UpSertMemberDto } from '~/types/Members/UpSertMember.dto';
import API from '~/apis/constants';
import { SearchMemberRequestDto } from '~/types/Members/MemberResponse.dto';

export const register = createAsyncRequest<UpSertMemberDto>(
  'register',
  {
    method: 'post',
    url: API.REGISTER,
  },
  (response) => response.data.data,
);
/* Khi HD tạo 1 service (action) cần tạo thêm 1 handler (reducer) ở trong slice */
export const searchMember = createAsyncRequest<SearchMemberRequestDto>('searchMember', {
  method: 'post',
  url: API.SEARCH_MEMBER,
});
