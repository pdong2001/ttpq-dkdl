import MainLayout from '~/components/containers/layouts/MainLayout';
import DepartmentInfos from '~/pages/DeparmentInfos';
import GreatCeremonyInfo from '~/pages/GreatCeremonyInfo';
import Home from '~/pages/Home';
import MultiStepRegister from '~/pages/MultiStepRegister';
import NotFound from '~/pages/NotFound';
import RegisterInfo from '~/pages/RegisterInfo';
import Timeline from '~/pages/Timeline';
import { AppRoute } from './AppRoute';
import GreatCeremonyInfoDetails from '~/pages/GreatCeremonyInfo/details';
import NoFooterLayout from '~/components/containers/layouts/NoFooterLayout';

export type RouteType = {
  path?: string | string[];
  needAuth?: boolean;
  exact?: boolean;
  component: (props: any) => JSX.Element;
  layout?: ({ children }: { children: any }) => JSX.Element;
  strict?: boolean;
  sensitive?: boolean;
};
export const ADD_NEW_REGISTER_PATH = '/:shortUri/register';
export const EDIT_REGISTER_PATH = '/:shortUri/edit-register';
export const HOME_WITH_SHORT_URI = '/:shortUri';
export const EVENT_INFO = '/great-ceremony-info';
export const TIMELINE = '/timeline';
export const DEPARTMENT_INFO = '/department-info';

export const NavBarLink = [
  { title: 'Trang chủ', to: '/' },
  { title: 'Giới thiệu đại lễ', to: EVENT_INFO },
  { title: 'Các ban Đại lễ', to: DEPARTMENT_INFO },
  { title: 'Thời khóa', to: TIMELINE },
];

const ROUTES: RouteType[] = [
  {
    path: EVENT_INFO,
    exact: true,
    component: GreatCeremonyInfo,
    layout: MainLayout,
  },
  // {
  //   path: '/great-ceremony-info/details',
  //   component: GreatCeremonyInfoDetails,
  //   layout: MainLayout,
  // },
  {
    path: ['/:shortUri/register-info/:id'],
    component: RegisterInfo,
    layout: MainLayout,
    needAuth: true,
  },
  // {
  //   path: '/timeline',
  //   component: Timeline,
  //   layout: MainLayout,
  // },
  // {
  //   path: '/department-info',
  //   component: DepartmentInfos,
  //   layout: MainLayout,
  // },
  {
    path: '/not-found',
    exact: true,
    component: NotFound,
    layout: MainLayout,
  },
  {
    path: ['/', HOME_WITH_SHORT_URI],
    exact: true,
    component: Home,
    layout: MainLayout,
  },
  {
    path: [ADD_NEW_REGISTER_PATH, EDIT_REGISTER_PATH],
    component: MultiStepRegister,
    layout: NoFooterLayout,
  },
  {
    component: NotFound,
    layout: MainLayout,
  },
];

export { ROUTES, AppRoute };
