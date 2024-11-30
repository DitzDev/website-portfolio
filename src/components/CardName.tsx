import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Avatar, 
  Typography, 
  Box, 
  IconButton, 
  Button,
  Tooltip,
  Collapse 
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import logo from '../assets/ditzdev-yuki.jpeg';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { FaTiktok } from "react-icons/fa";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import CakeIcon from '@mui/icons-material/Cake';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import MapIcon from '@mui/icons-material/Map';
import { Link } from '@mui/material';
import '../App.css';

const CardName: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [mapExpanded, setMapExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMapExpandClick = () => {
    setMapExpanded(!mapExpanded);
  };

  return (
    <Card 
      sx={{ 
        maxWidth: '1028px', 
        width: '100%',
        marginTop: 10,
        borderRadius: 3, 
        backgroundColor: window.matchMedia('(prefers-color-scheme: dark)').matches
           ? 'rgb(46,46,46)' 
           : 'rgba(231,231,231,0.716)',
        color: 'var(--foreground)',
        background: `linear-gradient(to right, 
          ${getComputedStyle(document.documentElement).getPropertyValue('--background') === '#0a0a0a' 
            ? 'rgba(50,50,50,0.8)' 
            : 'rgba(240,240,240,0.8)'}
        )`,
      }}
    >
      <CardContent>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: 2,
          }}
        >
          <Avatar
            alt="DitzDev"
            src={logo}
            sx={{ 
              width: 120, 
              height: 120, 
              marginRight: 2,
              border: '1px solid var(--foreground)',
              borderRadius: 3 
            }}
          />
          
          <Box>
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontWeight: 'bold',
                color: 'var(--foreground)',
                fontFamily: 'Poppins',
                marginTop: 1.5,
              }}
            >
              Aditya Pratama
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'var(--foreground)', 
                backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--background') === '#0a0a0a' 
                  ? 'rgba(100,100,100,0.6)' 
                  : 'rgba(200,200,200,0.6)', 
                padding: '2px 8px', 
                borderRadius: 1,
                fontFamily: 'Poppins',
                marginTop: 1,
                marginRight: 1,
                display: 'inline-block'
              }}
            >
              Web Developer
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'var(--foreground)', 
                backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--background') === '#0a0a0a' 
                  ? 'rgba(100,100,100,0.6)' 
                  : 'rgba(200,200,200,0.6)', 
                padding: '2px 8px',
                fontFamily: 'Poppins',
                borderRadius: 1,
                marginTop: 1,
                display: 'inline-block'
              }}
            >
              App Developer
            </Typography>
          </Box>
        </Box>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center' 
          }}
        >
          <IconButton 
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{ color: 'var(--foreground)' }}
          >
            {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box 
            sx={{ 
              backgroundColor: window.matchMedia('(prefers-color-scheme: dark)').matches
                  ? 'rgb(30,30,30)' 
                  : 'rgba(193,193,193,0.716)',
              borderRadius: 2,
              padding: 2
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: 1,
                fontFamily: 'Poppins',
                color: 'var(--foreground)'
              }}
            >
              <LocationOnIcon sx={{ marginRight: 1 }} /> 
              Banten, Indonesia
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: 1,
                fontFamily: 'Poppins',
                color: 'var(--foreground)'
              }}
            >
              <AlternateEmailIcon sx={{ marginRight: 1 }} /> 
              @rizuqagra@gmail.com
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: 1,
                fontFamily: 'Poppins',
                color: 'var(--foreground)'
              }}
            >
              <CakeIcon sx={{ marginRight: 1 }} /> 
              02-01-2008, 16-17 Years Old ( Now )
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                color: 'var(--foreground)',
                fontFamily: 'Poppins',
                marginBottom: 1
              }}
            >
              <MapIcon sx={{ marginRight: 1 }} /> 
              <Link 
                href="https://maps.google.com/maps?q=Banten,+Indonesia" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ 
                  color: 'var(--foreground)', 
                  textDecoration: 'underline' 
                }}
              >
                Open Google Maps
              </Link>
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                color: 'var(--foreground)',
                fontFamily: 'Poppins',
                marginBottom: 1
              }}
            >
              <FaTiktok style={{ marginRight: 12, width: '20px', height: '20px' }} /> 
              <Link 
                href="https://www.tiktok.com/@ditz.ofc?_t=8rlWAE1ncwS&_r=1" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ 
                  color: 'var(--foreground)', 
                  textDecoration: 'none' 
                }}
              >
                TikTok
              </Link>
            </Typography>  
            <Typography 
              variant="body2" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                color: 'var(--foreground)',
                fontFamily: 'Poppins',
                marginBottom: 1
              }}
            >
              <GitHubIcon sx={{ marginRight: 1 }} /> 
              <Link 
                href="https://github.com/DitzDev" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ 
                  color: 'var(--foreground)', 
                  textDecoration: 'none' 
                }}
              >
                GitHub
              </Link>
            </Typography> 
            <Typography 
              variant="body2" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                color: 'var(--foreground)',
                fontFamily: 'Poppins',
                marginBottom: 1
              }}
            >
              <YouTubeIcon sx={{ marginRight: 1 }} /> 
              <Link 
                href="https://youtube.com/@ditzofc" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ 
                  color: 'var(--foreground)', 
                  textDecoration: 'none' 
                }}
              >
                YouTube
              </Link>
            </Typography>                             
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                marginTop: 2 
              }}
            >
              <Tooltip title={mapExpanded ? 'Hide Map' : 'Show Full Map'}>
                <Button 
                onClick={handleMapExpandClick}
                title="ShowMap"
                variant="text"
                sx={{ color: 'var(--foreground)', fontFamily: 'Poppins' }}
                style={{textTransform: 'none'}}
              >{mapExpanded ? 'Hide Map' : 'Show Map'}</Button>
              </Tooltip>
            </Box>
            
            <Collapse in={mapExpanded} timeout="auto" unmountOnExit>
              <Box 
                sx={{ 
                  width: '100%', 
                  height: 300, 
                  marginTop: 2,
                  borderRadius: 2,
                  overflow: 'hidden'
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.7062818851!2d106.1455!3d-6.1733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e423aa9b147b stable!2sBanten!5e0!3m2!1sid!2sid!4v1701235394199!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Box>
            </Collapse>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default CardName;