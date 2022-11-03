import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, withDefaultColorScheme } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { floatingLabel, primaryColor, colorMode } from './theme';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store';

const theme = extendTheme(
  colorMode,
  primaryColor,
  floatingLabel,
  withDefaultColorScheme({ colorScheme: 'ttpq' }),
);

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <ReduxProvider store={store}>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </ReduxProvider>,
);
