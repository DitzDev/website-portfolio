import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import { css } from '@emotion/react';
import { 
  AppBar, 
  Container, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  Typography,
  ListItemIcon, 
  ListItemText, 
  Tooltip,
  Divider 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import CodeIcon from '@mui/icons-material/Code';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ChatIcon from '@mui/icons-material/Chat';
import { FaExclamationCircle } from 'react-icons/fa';
import logo from './assets/ditzdev-yuki.jpeg';
import CardName from './components/CardName';
import CardLanguage from './components/CardLanguage';
import GithubRepositoryCards, { fetchRepositories, RepositoryData } from './components/Projects';
import ContactMe from './components/ContactMe';
import Anonym from './components/Anonym';
import Footer from './components/Footer';
import './App.css'

 interface AnimatedSectionProps {
  children: React.ReactNode;
  animationType?: 'default' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate';
 }

  interface SectionRefs {
     home: React.RefObject<HTMLDivElement>;
     skills: React.RefObject<HTMLDivElement>;
     projects: React.RefObject<HTMLDivElement>;
     contact: React.RefObject<HTMLDivElement>;
     anonym: React.RefObject<HTMLDivElement>;
  }
  
  interface SidebarItem {
     text: string;
     icon: React.ReactElement;
     ref: React.RefObject<HTMLDivElement>;
  }
  
  interface AnimationProps {
      from: { 
        opacity: number; 
        transform: string; 
      };
      to: { 
        opacity: number; 
        transform: string; 
      };
  }
const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  animationType = 'default' }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1 
  });
  
  const animations: Record<string, AnimationProps> = {
    default: {
      from: { opacity: 0, transform: 'translateY(50px)' },
      to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(50px)' }
    },
    slideLeft: {
      from: { opacity: 0, transform: 'translateX(-100px)' },
      to: { opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-100px)' }
    },
    slideRight: {
      from: { opacity: 0, transform: 'translateX(100px)' },
      to: { opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(100px)' }
    },
    scale: {
      from: { opacity: 0, transform: 'scale(0.8)' },
      to: { opacity: inView ? 1 : 0, transform: inView ? 'scale(1)' : 'scale(0.8)' }
    },
    rotate: {
      from: { opacity: 0, transform: 'rotateX(-90deg)' },
      to: { opacity: inView ? 1 : 0, transform: inView ? 'rotateX(0deg)' : 'rotateX(-90deg)' }
    }
  };

  const animation = animations[animationType] || animations.default;
  const props = useSpring(animation);

  return (
    <animated.div ref={ref} style={props}>
      {children}
    </animated.div>
  );
};

function App() {
  const [repositories, setRepositories] = useState<RepositoryData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);  
  
  const sectionRefs: SectionRefs = {
    home: React.useRef<HTMLDivElement>(null),
    skills: React.useRef<HTMLDivElement>(null),
    projects: React.useRef<HTMLDivElement>(null),
    contact: React.useRef<HTMLDivElement>(null),
    anonym: React.useRef<HTMLDivElement>(null)
  };
  
  const sidebarItems: SidebarItem[] = [{ text: 'Home', icon: <HomeIcon sx={{ color: 'var(--foreground)' }}/>, ref: sectionRefs.home },
            { text: 'Skills', icon: <CodeIcon sx={{ color: 'var(--foreground)' }}/>, ref: sectionRefs.skills },
            { text: 'Projects', icon: <PersonIcon sx={{ color: 'var(--foreground)' }} />, ref: sectionRefs.projects },
            { text: 'Contact', icon: <ContactMailIcon sx={{ color: 'var(--foreground)' }} />, ref: sectionRefs.contact },
            { text: 'Anonymous Chat', icon: <ChatIcon sx={{ color: 'var(--foreground)' }} />, ref: sectionRefs.anonym }] 

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    setDrawerOpen(false);
  };

  useEffect(() => {
    const loadRepositories = async () => {
      const USERNAME = 'DitzDev';
      const REPOSITORIES = ['LoraBotz', 'snake_game', '3d-saturn-python'];

      const fetchedRepos = await fetchRepositories(USERNAME, REPOSITORIES);
      console.log("Fetched Repository: ", fetchedRepos);
      setRepositories(fetchedRepos);
      setIsLoading(false);
    };

    loadRepositories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          background: scrolled 
            ? 'rgba(255, 255, 255, 0.8)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'none',
          boxShadow: 'none',
          transition: 'all 0.3s ease-in-out',
          padding: '10px 0',
          '@media (prefers-color-scheme: dark)': {
            background: scrolled 
              ? 'rgba(10, 10, 10, 0.8)'
              : 'transparent'
          }
        }}
      >
        <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}>
          <h1 className="header">DitzDev</h1>
          <div>
            <Tooltip title="Open Menu">
            <IconButton 
              color="inherit" 
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon sx={{ color: 'var(--foreground)' }}/>
            </IconButton>
            </Tooltip>
          </div>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          display: 'flex',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(64,64,64,0.3)', 
          '& .MuiDrawer-paper': {
            marginTop: 4,
            marginLeft: 6,
            boxShadow: 0,
            backgroundColor: 'transparent',
            height: 'max-content',
          }
        }}
      >
        <List
          sx={{
            marginRight: 3,
            border: '4px solid #6c6c6c',
            boxShadow: '0 0 110px 0 #6c6c6c 50',
            width: 250,
            backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--background') === '#0a0a0a' 
      ? 'rgba(29,29,29,0.6)' 
      : 'rgba(240,240,240,0.6)',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
        >
          {sidebarItems.map((item, index) => (
            <React.Fragment key={item.text}>
              <ListItem component="button" onClick={() => scrollToSection(item.ref)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: 'var(--foreground)', fontFamily: 'Poppins' }} />
              </ListItem>
              {index < 4 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Drawer>

      <div ref={sectionRefs.home}>
        <AnimatedSection animationType="slideLeft">
          <div className="card-name">    
            <CardName />
          </div>
        </AnimatedSection>
      </div>

      <div className="title-why">
        <AnimatedSection animationType="default">
          <h2>What I'm Doing?</h2>
          <p>I really love trying new things! Yesterday I just deepened my knowledge about <a href="https://isocpp.org/">C++</a>! Yesterday I also had the chance to learn <a href="https://www.lua.org/docs.html">Lua</a> and learn to use the framework <a href="https://love2d.org/">LÖVE</a> And this is awesome! I'm getting more and more into trying new things and exploring things I don't know about yet.</p>
        </AnimatedSection>
      </div>

      <div ref={sectionRefs.skills} className="skils">
        <AnimatedSection animationType="scale">
          <h1>My Skills</h1>
          <CardLanguage />
        </AnimatedSection>
      </div>

      <div ref={sectionRefs.projects} className="projects">
        <AnimatedSection animationType="rotate">
          <h1>My Projects</h1>
          <p>Here, is a list of projects that I am working on and some that are already completed.</p>
          {isLoading ? (
           <div className="loading-container">
              <Typography>Loading...</Typography>
           </div>
           ) : repositories.length === 0 ? (
           <div className="error-container">
             <FaExclamationCircle />
             <Typography>An error occurred...</Typography>
            </div>
            ) : (
          <GithubRepositoryCards repositories={repositories} />
          )}
        </AnimatedSection>
      </div>

      <div ref={sectionRefs.contact} className="contact-me">
        <AnimatedSection animationType="slideRight">
          <h1>Contact Me</h1>
          <p>If you have questions or are confused about programming languages or want to collaborate, you can send a message below.</p>
          <ContactMe />
        </AnimatedSection>
      </div>

      <div ref={sectionRefs.anonym} className="anonym-chat">
        <AnimatedSection animationType="scale">
          <Anonym />
        </AnimatedSection>
      </div>

      <Footer />
    </>
  )
}

export default App