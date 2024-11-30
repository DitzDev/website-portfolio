import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  IconButton, 
  List, 
  ListItem, 
  ListItemText, 
  Tooltip,
  Paper,
  useTheme,
  useMediaQuery,
  createTheme,
  ThemeProvider
} from '@mui/material';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  Timestamp 
} from 'firebase/firestore';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { db } from '../config/firebase';

interface Comment {
  id?: string;
  text: string;
  timestamp: Timestamp;
  username: string;
}

const Anonym: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const htmlTheme = document.documentElement.getAttribute('data-theme');
  const commentsContainerRef = useRef<null | HTMLDivElement>(null);
  const commentsEndRef = useRef<null | HTMLDivElement>(null);
  const chatContainerRef = useRef<null | HTMLDivElement>(null);
  
  const theme = createTheme({
    palette: {
      mode: (htmlTheme === 'dark' || (htmlTheme === null && prefersDarkMode)) ? 'dark' : 'light',
      background: {
        default: htmlTheme === 'dark' || (htmlTheme === null && prefersDarkMode) 
          ? '#0a0a0a' 
          : '#ffffff'
      },
      text: {
        primary: htmlTheme === 'dark' || (htmlTheme === null && prefersDarkMode) 
          ? '#ededed' 
          : '#171717'
      },
      divider: htmlTheme === 'dark' || (htmlTheme === null && prefersDarkMode) 
        ? 'rgba(255,255,255,0.12)' 
        : 'rgba(0,0,0,0.12)'
    }
  });
  
  const generateAnonymousUsername = () => {
    const adjectives = ['Mysterious', 'Silent', 'Wandering', 'Curious', 'Shadowy'];
    const nouns = ['Stranger', 'Traveler', 'Whisper', 'Ghost', 'Shadow'];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective} ${randomNoun}`;
  };


  useEffect(() => {
    const storedUsername = localStorage.getItem('anonymousUsername');
    if (!storedUsername) {
      const newAnonymousUsername = generateAnonymousUsername();
      setUsername(newAnonymousUsername);
      localStorage.setItem('anonymousUsername', newAnonymousUsername);
    } else {
      setUsername(storedUsername);
    }
  }, []);
  
  useEffect(() => {
    const commentsRef = collection(db, 'comments');
    const q = query(commentsRef, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Comment));
      
      setComments(fetchedComments);
    });

    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    const chatContainer = commentsContainerRef.current;
    
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, [comments])
  
  const handleSubmitComment = async () => {
    if (newComment.trim() === '') return;

    try {
      await addDoc(collection(db, 'comments'), {
        text: newComment,
        timestamp: Timestamp.now(),
        username: username
      });

      setNewComment('');
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };
  
  const formatLongText = (text: string, maxLineLength: number = 15) => {
  const words = text.split(' ');
  let formattedText = '';
  let currentLine = '';

  words.forEach(word => {
    if ((currentLine + word).length > maxLineLength) {
      formattedText += currentLine.trim() + '\n';
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  });

  formattedText += currentLine.trim();
  return formattedText;
};

  return (
    <ThemeProvider theme={theme}>
      <Box 
      ref={chatContainerRef}
      sx={{ 
        maxWidth: 600, 
        margin: 'auto', 
        padding: 2,
        width: '100%' 
      }}
      data-chat-component="true">
      <Paper 
          elevation={3} 
          sx={{ 
            padding: 2, 
            marginBottom: 2,
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.default,
            height: '500px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 2 
          }}>
            <Box>
              <Typography variant="h5" color="text.primary" sx={{ fontFamily: 'Poppins',}}>
                Anonymous Chat
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" sx={{ fontFamily: 'Poppins',}}>
                Your username: {username}
              </Typography>
            </Box>
          </Box>

          <Box 
            ref={commentsContainerRef}
            sx={{ 
              flexGrow: 1, 
              overflowY: 'auto',
              overflowX: 'hidden',
              paddingRight: 1
            }}
          >
            <List 
              sx={{ 
                display: 'flex',
                flexDirection: 'column-reverse', 
                gap: 1
              }}
            >
              {comments.map((comment) => (
                <ListItem 
                  key={comment.id} 
                  sx={{
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    width: '100%'
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{ color: 'text.primary', fontFamily: 'Poppins', whiteSpace: 'pre-wrap' }}
                    secondaryTypographyProps={{ color: '#808080a9', fontFamily: 'Poppins', }}
                    primary={formatLongText(comment.text)}
                    secondary={`${comment.username} - ${comment.timestamp.toDate().toLocaleString()}`}
                  />
                </ListItem>
              ))}
              <div ref={commentsEndRef} />
            </List>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            marginTop: 2 
          }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Message..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSubmitComment();
              }}
              sx={{
              fontFamily: 'Poppins',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3
                }
              }}
            />
            <Tooltip title="Send Your Message...">
            <IconButton
              color="inherit"
              onClick={handleSubmitComment}
            >
              <ArrowOutwardIcon sx={{ color: 'var(--foreground' }} />
            </IconButton>
            </Tooltip>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Anonym;