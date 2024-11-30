import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  CardActionArea,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';

export interface RepositoryData {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
}

interface GithubRepositoryCardsProps {
  repositories: RepositoryData[];
}

const GithubRepositoryCards: React.FC<GithubRepositoryCardsProps> = ({ repositories }) => {
  const [backgroundColor, setBackgroundColor] = useState('');

  useEffect(() => {
    const bgColor = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'rgb(46,46,46)' 
      : 'rgba(232,232,232,0.716)';
    setBackgroundColor(bgColor);
  }, []);

  const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: 16,
    marginTop: 8,
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: theme.shadows[4],
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
      borderStyle: 'solid'
    }
  }));

  if (repositories.length === 0) {
    return <Typography>No repositories found</Typography>;
  }

  return (
    <Grid container spacing={3}>
      {repositories.map((repoData) => (
        <Grid item xs={12} sm={6} md={4} key={repoData.name}>
          <StyledCard 
            variant="outlined" 
            sx={{ 
              maxWidth: '100% auto', 
              borderRadius: 4,
              border: '10px solid rgba(0,0,0,0.12)',
              backgroundColor: backgroundColor
            }}
          >
            <CardActionArea href={repoData.html_url} target="_blank">
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <GitHubIcon sx={{ mr: 1, color: 'var(--foreground)', }} />
                  <Typography variant="h6" fontWeight="bold" sx={{ color: 'var(--foreground)', fontFamily: 'Poppins',}}>
                    {repoData.name}
                  </Typography>
                </Box>
                
                <Typography 
                  variant="body2" 
                  mb={2}
                  sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    color: 'var(--foreground)',
                    fontFamily: 'Poppins',
                    WebkitLineClamp: 2,
                  }}
                >
                  {repoData.description || 'No description available'}
                </Typography>
                
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box display="flex" alignItems="center" gap={1}>
                    <Chip 
                      icon={<StarIcon fontSize="small" />} 
                      label={repoData.stargazers_count} 
                      size="small" 
                      variant="outlined"
                      sx={{
                        color: 'var(--foreground)',
                        fontFamily: 'Poppins',
                      }}
                    />
                    <Chip 
                      icon={<ForkRightIcon fontSize="small" />} 
                      label={repoData.forks_count} 
                      size="small" 
                      variant="outlined"
                      sx={{
                        color: 'var(--foreground)',
                        fontFamily: 'Poppins',
                      }}
                    />
                  </Box>
                  
                  {repoData.language && (
                    <Chip 
                      label={repoData.language} 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                    />
                  )}
                </Box>
              </CardContent>
            </CardActionArea>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export const fetchRepositories = async (username: string, repoNames: string[]): Promise<RepositoryData[]> => {
  try {
    const repoPromises = repoNames.map(repo => 
      fetch(`https://api.github.com/repos/${username}/${repo}`).then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch repository: ${repo}`);
        }
        return response.json();
      })
    );
    
    return await Promise.all(repoPromises);
  } catch (error) {
    console.error('Error fetching repository data:', error);
    return [];
  }
};

export default GithubRepositoryCards;