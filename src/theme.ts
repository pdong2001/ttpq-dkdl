import { extendTheme } from '@chakra-ui/react';

const activeLabelStyles = {
  transform: 'scale(0.8) translateY(-24px)',
  borderRadius: '5px',
};

const floatingLabel = {
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
                color: 'ttpq.500',
              },
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label':
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: 'absolute',
              pointerEvents: 'none',
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: 'left top',
            },
          },
        },
      },
    },
  },
};

const colorModeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

// generate in https://themera.vercel.app/
const colors = {
  ttpq: {
    50: '#FEF7E6',
    100: '#FDE8BA',
    200: '#FBD98D',
    300: '#FACA61',
    400: '#F9BB34',
    500: '#F7AB08',
    600: '#C68906',
    700: '#946705',
    800: '#634503',
    900: '#312202',
  },
  darkBlue: {
    '50': '#EEECF8',
    '100': '#CECAEC',
    '200': '#AFA8E0',
    '300': '#8F86D4',
    '400': '#7064C8',
    '500': '#5143BC',
    '600': '#413597',
    '700': '#302871',
    '800': '#201B4B',
    '900': '#100D26',
  },
};

const primaryColor = extendTheme({
  colors,
});

const colorMode = extendTheme({ colorModeConfig });
export { colorMode, primaryColor, floatingLabel };
