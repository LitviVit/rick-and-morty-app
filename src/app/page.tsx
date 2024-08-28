'use client';

import Loader from '@/components/Loader';
import { Pagination } from '@/components/Pagination';
import { Search } from '@/components/Search';
import { ThemeToggle } from '@/components/ThemeToggle';
import { getTheme } from '@/lib/theme';
import { setCharacters } from '@/redux/reducers';
import { gql, useQuery } from '@apollo/client';
import { createTheme, Typography, ThemeProvider, CssBaseline, Box, Container, Toolbar, Paper, Grid, Fab } from '@mui/material';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const GET_CHARACTERS = gql`
  query {
    characters(page: 1) {
      results {
        id
        name
        image
        status
        species
      }
    }
  }
`;

const useDelayedQuery = (query: any, delay: number) => {
  const { data, loading, error } = useQuery(query);
  const [delayedLoading, setDelayedLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return {
    data,
    loading: loading || delayedLoading,
    error,
  };
};

const Home = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const dispatch = useDispatch();
  const characters = useSelector((state: any) => state.characters.characters);
  const { data, loading, error } = useDelayedQuery(GET_CHARACTERS, 2000);

  useEffect(() => {
    if (data) {
      dispatch(setCharacters(data.characters.results));
    }
  }, [data, dispatch]);

  useEffect(() => {
    const savedMode = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  const theme = useMemo(() => createTheme(getTheme(mode)), [mode]);

  if (loading) return <Loader></Loader>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          paddingBottom: '1px',
        }}
      >
        <Box
          sx={{
            backgroundImage: 'url(/bg.jpg)',
            backgroundSize: 'contain',
            backgroundPosition: 'right center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#252525',
            width: '100%',
            height: '25vh',
          }}
        >
          <Container
            sx={{
              padding: '16px',
              height: '25vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <Typography
              variant='h1'
              sx={{
                color: '#fff',
                fontSize: '2rem',
                textAlign: 'left',
                width: '100%',
              }}
            >
              Rick and Morty Characters
            </Typography>
          </Container>
        </Box>

        <Toolbar
          sx={(theme) => ({
            width: '100%',
            justifyContent: 'space-between',
            padding: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            marginBottom: '32px',
            backgroundColor: theme.palette.background.paper,
          })}
        >
          <Container
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Search />
            <Pagination />
          </Container>
        </Toolbar>

        <Container>
          <Grid
            container
            spacing={2}
            sx={{
              marginBottom: '32px',
              backgroundColor: theme.palette.background.paper,
            }}
          >
            {characters.map((character: any) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                component='div'
                key={character.id}
              >
                <Paper
                  sx={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '200px',
                      backgroundColor: '#e0e0e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <Image
                      src={character.image}
                      alt={character.name}
                      layout='fill'
                      objectFit='cover'
                      priority
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      padding: '12px',
                    }}
                  >
                    <Typography variant='h6'>{character.name}</Typography>
                    <Typography variant='body2'>
                      {character.status} - {character.species}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              marginBottom: '32px',
            }}
          >
            <Pagination />
          </Box>
        </Container>
        <Fab
          color='primary'
          aria-label='theme toggle'
          onClick={toggleTheme}
          sx={{
            position: 'fixed',
            bottom: '16px',
            right: '16px',
          }}
        >
          <ThemeToggle mode={mode} toggleTheme={toggleTheme} />
        </Fab>
      </Box>
    </ThemeProvider>
  );
};

export default Home;





