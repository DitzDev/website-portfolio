import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        py: 4,
        mt: 4,
        borderTop: '1px solid #ccc',
      }}
    >
    <Typography
        variant="body2"
        color="text.secondary"
        gutterBottom
        sx={{ color: '#8e8e8e', fontSize: '15px', marginLeft: '10px', marginTop: '25px', fontFamily: 'Poppins' }}
      >
        &copy; DitzDev 2024
      </Typography>
    </Box>
    )
}

export default Footer