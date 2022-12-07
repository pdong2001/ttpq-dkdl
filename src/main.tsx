import store from './store';
import { primaryColor, floatingLabel } from './theme';
import { Provider as ReduxProvider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import Loading from './components/Loading';
import MessageProvider from './providers/message';
import AuthProvider from './providers/auth';

const theme = extendTheme(
  primaryColor,
  floatingLabel,
  withDefaultColorScheme({ colorScheme: 'blue' }),
);

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container as Element);

root.render(
  <ReduxProvider store={store}>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <MessageProvider>
          <AuthProvider>
            <Route component={App} path={['/:shortUri', '/']} />
            <Loading />
          </AuthProvider>
        </MessageProvider>
      </BrowserRouter>
    </ChakraProvider>
  </ReduxProvider>,
);
