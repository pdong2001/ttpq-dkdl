import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, withDefaultColorScheme } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { floatingLabel, primaryColor } from './theme';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store';
import Loading from './components/Loading';
import MessageProvider from './providers/message';

const theme = extendTheme(
  primaryColor,
  floatingLabel,
  withDefaultColorScheme({ colorScheme: 'blue' }),
);

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <ReduxProvider store={store}>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <MessageProvider>
          <App />
        </MessageProvider>

        <Loading />
      </BrowserRouter>
    </ChakraProvider>
  </ReduxProvider>,
);
