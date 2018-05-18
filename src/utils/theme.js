import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import grey from '@material-ui/core/colors/grey';
import cosmicSansFont from 'assets/fonts/cosmic_sans_regular.ttf';

export default createMuiTheme({
  typography: {
    fontFamily: 'Cosmic Sans',
    fontSize: 16,
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightMedium: 400
  },
  palette: {
    primary: {
      light: '#80b4ff',
      main: '#4285f4',
      dark: '#0059c1'
    },
    secondary: {
      light: '#526285',
      main: '#263858',
      dark: '#00122f'
    },
    text: {
      primary: '#202124',
      secondary: '#5f6368'
    }
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 4,
        textTransform: 'none',
        minWidth: 'unset'
      },
      raised: {
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: grey[300],
          boxShadow:
            '0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
        },
        '&:active': {
          boxShadow:
            '0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
        }
      },
      raisedPrimary: {
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: '#4285f4'
        }
      }
    },
    MuiTouchRipple: {
      '@keyframes mui-ripple-enter': {
        '0%': {
          transform: 'scale(0)',
          opacity: 0.1
        },
        '100%': {
          transform: 'scale(1)',
          opacity: 0.1
        }
      },
      rippleVisible: {
        opacity: 0.1,
        animation: 'mui-ripple-enter 150ms cubic-bezier(0.4, 0, 0.2, 1)'
      }
    },
    MuiInput: {
      root: {
        background: '#f8f9fa',
        borderRadius: 2,
        padding: '4px 8px 4px 8px',
        fontSize: 16,
        lineHeight: '20px'
      },
      multiline: {
        padding: '4px 8px 4px 8px'
      },
      underline: {
        '&:after': {
          borderBottom: '2px solid #4285f4',
          borderBottomLeftRadius: 2,
          borderBottomRightRadius: 2
        },
        '&:before': {
          borderBottom: 'none'
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: 'none'
        }
      }
    },
    MuiDialog: {
      paper: {
        borderRadius: 4
      }
    }
  }
});

export const globalStyles = {
  '@global': {
    '@font-face': {
      fontFamily: 'Cosmic Sans',
      fontWeight: 'normal',
      fontStyle: 'normal',
      src: `url(${cosmicSansFont})`
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      textRendering: 'optimizeLegibility',
      boxSizing: 'border-box'
    },
    '*, *::before, *::after': {
      boxSizing: 'inherit'
    },
    body: {
      margin: 0,
      padding: 0,
      fontFamily: 'Cosmic Sans',
      overflowX: 'hidden'
    },
    'textarea, input, button, select': {
      outline: 'none !important'
    }
  }
};
