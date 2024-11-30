import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Container, 
  Box, 
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
  createTheme,
  ThemeProvider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const getCSSVariable = (variableName: string): string => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();
};

const ContactMe: React.FC = () => {
  const [background, setBackground] = useState('#ffffff');
  const [foreground, setForeground] = useState('#171717');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const updateColors = () => {
      const bgColor = getCSSVariable('--background');
      const fgColor = getCSSVariable('--foreground');
      setBackground(bgColor);
      setForeground(fgColor);
    };

    updateColors();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateColors);

    return () => {
      mediaQuery.removeEventListener('change', updateColors);
    };
  }, []);

  const customTheme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: background,
        paper: background
      },
      text: {
        primary: foreground
      },
      primary: {
        main: '#45acff99',
      }
    },
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            backgroundColor: background,
            color: foreground
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& label': {
              color: foreground,
              opacity: 0.7
            },
            '& label.Mui-focused': {
              color: foreground
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: foreground,
                opacity: 0.5
              },
              '&:hover fieldset': {
                borderColor: foreground,
                opacity: 0.8
              },
              '&.Mui-focused fieldset': {
                borderColor: foreground
              }
            }
          }
        }
      },
      MuiSnackbar: {
        styleOverrides: {
          root: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999
          }
        }
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '500px',
            margin: '0 auto'
          }
        }
      }
    }
  });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  /**
   * Buat server api handle email
   * Cek Github DitzDev buat script server nya!
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setIsLoading(true);

    try {
      const response = await axios.post('https://serverless-function.vercel.app/', formData);
      
      setFormData({
        name: '',
        email: '',
        message: ''
      });

      setOpenSuccess(true);
    } catch (error) {
      setErrorMessage('Failed to send message. Please try again.');
      setOpenError(true);
      console.error('Error sending email:', error);
    } finally {
      // Set loading state back to false after request completes
      setIsLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container 
        maxWidth="sm"
        sx={{ 
          display: 'flex',
          marginTop: 4,
          flexDirection: 'column',
          backgroundColor: background,
          color: foreground
        }}
      >
        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          noValidate 
          sx={{ 
            mt: 1, 
            width: '100%',
            '& .MuiTextField-root': {
              backgroundColor: 'transparent'
            }
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                name="name"
                label="Your Name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  style: { 
                    color: foreground 
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  style: { 
                    color: foreground 
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="message"
                name="message"
                label="Your Message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  style: { 
                    color: foreground 
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="primary"
                disabled={isLoading}
                sx={{
                  color: foreground,
                  fontFamily: 'Poppins',
                  textTransform: 'none',
                  borderRadius: '15px',
                  '&:hover': {
                    backgroundColor: '#45acff',
                  }
                }}
              >
                {isLoading ? (
                  <CircularProgress 
                    size={24} 
                    sx={{ 
                      color: foreground,
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }} 
                  />
                ) : (
                  'Submit'
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Snackbar 
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={openSuccess} 
          autoHideDuration={6000} 
          onClose={handleCloseSuccess}
        >
          <Alert 
            onClose={handleCloseSuccess} 
            severity="success" 
            sx={{ 
              width: '100%',
              backgroundColor: '#45acff99',
              color: foreground
            }}
          >
            Message sent successfully!
          </Alert>
        </Snackbar>

        <Snackbar 
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={openError} 
          autoHideDuration={6000} 
          onClose={handleCloseError}
        >
          <Alert 
            onClose={handleCloseError} 
            severity="error" 
            sx={{ 
              width: '100%',
              backgroundColor: '#ff000099',
              color: foreground
            }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default ContactMe;
