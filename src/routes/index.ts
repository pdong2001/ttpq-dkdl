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
import FinalStep from '~/pages/MultiStepRegister/RegisterSteps/FinalStep';
import BlankLayout from '~/components/containers/layouts/BlankLayout';
import NoFooterLayout from '~/components/containers/layouts/NoFooterLayout';

export type RouteType = {
  key: string;
  path?: string | string[];
  needAuth?: boolean;
  exact?: boolean;
  component: (props: any) => JSX.Element;
  layout?: ({ children }: { children: any }) => JSX.Element;
  strict?: boolean;
  sensitive?: boolean;
};
export const MULTI_STEP_REGISTER_PATH = '/:shortUri/register';
export const HOME_WITH_SHORT_URI = '/:shortUri';
const ROUTES: RouteType[] = [
  {
    key: 'GREAT_CEREMORY_INFO',
    path: '/great-ceremony-info',
    exact: true,
    component: GreatCeremonyInfo,
    layout: MainLayout,
  },
  {
    key: 'GREAT_CEREMORY_INFO',
    path: '/great-ceremony-info/details',
    component: GreatCeremonyInfoDetails,
    layout: MainLayout,
  },
  {
    key: 'REGISTER_INFO',
    path: ['/register-info/:id', '/register-info'],
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
  {
    key: 'REGISTER_SUCCESS',
    path: '/register-success',
    component: FinalStep,
    layout: BlankLayout,
  },
  {
    path: '/not-found',
    exact: true,
    key: 'NOT_FOUND',
    component: NotFound,
    layout: MainLayout,
  },
  {
    key: 'HOME',
    path: ['/', HOME_WITH_SHORT_URI],
    exact: true,
    component: Home,
    layout: MainLayout,
  },
  {
    key: 'MULTI_STEP_REGISTER',
    path: [MULTI_STEP_REGISTER_PATH],
    component: MultiStepRegister,
    layout: NoFooterLayout,
  },
  {
    key: 'NOT_FOUND',
    component: NotFound,
    layout: MainLayout,
  },
];

export { ROUTES, AppRoute };
