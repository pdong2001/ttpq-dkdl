import store from './store';
import { primaryColor, floatingLabel } from './theme';
import { Provider as ReduxProvider } from 'react-redux';
import ReactDOM from 'react-dom';
import { ChakraProvider, extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Loading from './components/Loading';
import MessageProvider from './providers/message';

const theme = extendTheme(
  primaryColor,
  floatingLabel,
  withDefaultColorScheme({ colorScheme: 'blue' }),
);

ReactDOM.render(
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
  document.getElementById('root'),
);
