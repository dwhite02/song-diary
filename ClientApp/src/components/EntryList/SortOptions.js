import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SortOptions = ({ sortOption, handleSortChange }) => (
    <FormControl fullWidth>
        <InputLabel>Sort by</InputLabel>
        <Select value={sortOption} onChange={handleSortChange}>
            <MenuItem value="mostRecent">Most Recent</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
            <MenuItem value="mood">Mood</MenuItem>
        </Select>
    </FormControl>
);

export default SortOptions;

