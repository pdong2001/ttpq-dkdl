import MainLayout from '~/components/containers/layouts/MainLayout';
import DepartmentInfos from '~/pages/DeparmentInfos';
import GreatCeremonyInfo from '~/pages/GreatCeremonyInfo';
import Home from '~/pages/Home';
import MultiStepRegister from '~/pages/MultiStepRegister';
import RegisterInfo from '~/pages/RegisterInfo';
import Timeline from '~/pages/Timeline';
import { AppRoute } from './AppRoute';

export type RouteType = {
  key: string;
  path: string | string[];
  needAuth?: boolean;
  exact?: boolean;
  component: (props: any) => JSX.Element;
  layout?: ({ children }: { children: any }) => JSX.Element;
  strict?: boolean;
  sensitive?: boolean;
};

const ROUTES: RouteType[] = [
  {
    key: 'HOME',
    path: '/',
    exact: true,
    component: Home,
    layout: MainLayout,
  },
  {
    key: 'MULTI_STEP_REGISTER',
    path: '/register',
    component: MultiStepRegister,
    layout: MainLayout,
  },
  {
    key: 'GREAT_CEREMORY_INFO',
    path: '/great-ceremory-info',
    component: GreatCeremonyInfo,
    layout: MainLayout,
  },
  {
    key: 'REGISTER_INFO',
    path: '/register-info/:id',
    component: RegisterInfo,
    layout: MainLayout,
  },
  {
    key: 'TIMELINE',
    path: '/timeline',
    component: Timeline,
    layout: MainLayout,
  },
  {
    key: 'DEPARTMENT_INFO',
    path: '/department-info',
    component: DepartmentInfos,
    layout: MainLayout,
  },
];

export { ROUTES, AppRoute };
