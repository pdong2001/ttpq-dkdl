import MainLayout from '~/components/containers/layouts/MainLayout'
import Home from '~/pages/Home';
import { AppRoute } from './AppRoute';

export type RouteType = {
  key: string;
  path: string;
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
    needAuth: false,
    exact: true,
    component: Home,
    layout: MainLayout,
  },
];

export { ROUTES, AppRoute };
