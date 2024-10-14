import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const MoodFilter = ({ selectedMood, handleMoodChange, uniqueMoods }) => (
    <FormControl fullWidth>
        <InputLabel>Filter by Mood</InputLabel>
        <Select value={selectedMood} onChange={handleMoodChange}>
            <MenuItem value="">All Moods</MenuItem>
            {uniqueMoods.map((mood) => (
                <MenuItem key={mood} value={mood}>
                    {mood}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

export default MoodFilter;


