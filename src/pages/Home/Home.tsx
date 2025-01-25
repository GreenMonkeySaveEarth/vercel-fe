import React from 'react';
import { Typography, Stack, Container, CircularProgress, Alert, TextField } from '@mui/material';
import { useSearchContext } from '@/context/SearchContext';

const Home = () => {
  const { query, setQuery, suggestions, selectedIndex, setSuggestions, setSelectedIndex, loading, error
  } = useSearchContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(-1); // Reset keyboard selection
  };

  // Handle keyboard navigation and selection
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev: number): number => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev: number): number => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      handleSelection(suggestions[selectedIndex]);
    }
  };

  // Handle suggestion selection
  const handleSelection = (value: string) => {
    setQuery(value); // Set input value to the selected suggestion
    setSuggestions([]); // Clear suggestions
    console.log("Selected:", value);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px", textAlign: "center" }}>
      <TextField
        fullWidth
        variant="outlined"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type to search..."
        InputProps={{
          style: {
            padding: "10px",
            fontSize: "16px",
          },
        }}
      />
      {loading && <CircularProgress style={{ marginTop: "10px" }} />}
      {suggestions.length > 0 && (
        <Stack
          component="ul"
          spacing={1}
          style={{
            listStyle: "none",
            margin: "0",
            padding: "0",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginTop: "5px",
            background: "#fff",
            zIndex: 10,
          }}
        >
          {suggestions.map((item, index) => (
            <Typography
              component="li"
              key={item}
              onMouseDown={() => handleSelection(item)} // Mouse down to prevent blur event
              style={{
                padding: "10px",
                background: index === selectedIndex ? "#f0f0f0" : "#fff",
                cursor: "pointer",
              }}
            >
              {item}
            </Typography>
          ))}
        </Stack>
      )}
      {error && <Alert severity="error" style={{ marginTop: "10px" }}>{error}</Alert>}
    </Container>
  );
};

export default Home;
