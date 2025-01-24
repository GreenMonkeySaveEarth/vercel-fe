import React from 'react';
import TemplateTester from '@/components/TemplateTester/TemplateTester';
import { Typography, Stack, Container, CircularProgress, Alert, TextField } from '@mui/material';
import Counter from '@/components/Counter/Counter';
import { useSearchContext } from '@/context/SearchContext';

const Home = () => {
  const { query, setQuery, data, loading, error } = useSearchContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  console.log('data from', data);

  return (
    <Container sx={{ py: 2, position: 'relative' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        sx={{ my: 2 }}
      />
      {/* We are going to add the dropdown selection from the result */}
      {data && data.length > 0 && (
        <Stack
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            bgcolor: 'background.paper',
            boxShadow: 1,
            zIndex: 1,
            maxHeight: 200,
            overflowY: 'auto',
            width: '100%', // Make the dropdown the same width as the input box
          }}
        >
          {data.map((item: any, index: number) => (
            <Typography
              key={index}
              sx={{ p: 2, cursor: 'pointer' }}
              onClick={() => setQuery(item)}
            >
              {item}
            </Typography>
          ))}
        </Stack>
      )}
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
    </Container>
  );
};

export default Home;
