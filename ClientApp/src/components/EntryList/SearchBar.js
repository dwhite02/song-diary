import { TextField } from '@mui/material';

const SearchBar = ({ searchTerm, handleSearchChange }) => (
    <TextField
        fullWidth
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by song, description, or emoji"
    />
);

export default SearchBar;

