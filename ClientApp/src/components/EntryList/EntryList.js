import React, { useState } from 'react';
import EntryItem from './EntryItem';
import SearchBar from './SearchBar';
import SortOptions from './SortOptions';
import MoodFilter from './MoodFilter';
import Pagination from './Pagination';
import Grid from '@mui/material/Grid2';
import { Box, List, Paper, Typography } from '@mui/material';

const EntryList = ({ entries, deleteEntry }) => {
    const [sortOption, setSortOption] = useState('mostRecent'); // Default sorting by most recent
    const [searchTerm, setSearchTerm] = useState(''); // State for search input
    const [selectedMood, setSelectedMood] = useState(''); // State for mood filter
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 5;

    const handleSortChange = (e) => setSortOption(e.target.value);
    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleMoodChange = (e) => setSelectedMood(e.target.value);
    const handlePageChange = (newPage) => setCurrentPage(newPage);

    // Filtering logic based on search term
    const filteredEntries = entries
        .filter((entry) =>
            entry.songTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.emoji.includes(searchTerm)
        )
        .filter((entry) => !selectedMood || entry.mood === selectedMood); // Additional mood filter logic applied after search

    // Sorting logic
    const sortedEntries = [...filteredEntries].sort((a, b) => {
        if (sortOption === 'mostRecent') {
            return new Date(b.date) - new Date(a.date); // Sort by date (newest first)
        } else if (sortOption === 'oldest') {
            return new Date(a.date) - new Date(b.date); // Sort by date (oldest first)
        } else if (sortOption === 'mood') {
            return a.mood.localeCompare(b.mood); // Sort alphabetically by mood
        }
        return 0;
    });

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = sortedEntries.slice(indexOfFirstEntry, indexOfLastEntry);

    const totalPages = Math.ceil(sortedEntries.length / entriesPerPage);

    // Unique moods for the mood filter dropdown
    const uniqueMoods = [...new Set(entries.map((entry) => entry.mood))];

    return (
        <Box sx={{ p: 3 }}>
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }}>
                        <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <SortOptions sortOption={sortOption} handleSortChange={handleSortChange} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <MoodFilter selectedMood={selectedMood} handleMoodChange={handleMoodChange} uniqueMoods={uniqueMoods} />
                    </Grid>
                </Grid>
            </Paper>

            <List sx={{ mt: 2 }}>
                {currentEntries.length ? (
                    currentEntries.map((entry) => (
                        <EntryItem key={entry.id} entry={entry} deleteEntry={deleteEntry} />
                    ))
                ) : (
                    <Typography variant="h6" align="center" color="textSecondary">
                        No entries found.
                    </Typography>
                )}
            </List>

            <Box display="flex" justifyContent="center" mt={2}>
                <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
            </Box>
        </Box>
    );
};

export default EntryList;
