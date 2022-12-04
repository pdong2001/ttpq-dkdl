import { extendTheme, theme } from '@chakra-ui/react';

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
                color: 'blue.500',
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

// generate in https://themera.vercel.app/
const colors = {
  blue: {
    '50': '#FBF5EA',
    '100': '#F3E3C4',
    '200': '#EBD19E',
    '300': '#E3BF78',
    '400': '#DBAD52',
    '500': '#D39B2C',
    '600': '#A97C23',
    '700': '#7E5D1B',
    '800': '#543E12',
    '900': '#2A1F09',
  },
  Blue: theme.colors.blue,
};

const primaryColor = extendTheme({
  colors,
});

// const colorMode = extendTheme({ colorModeConfig });
export { primaryColor, floatingLabel };
