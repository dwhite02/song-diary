import { useState, useEffect } from 'react';
import { TextField, Button, Box, Paper, Typography, List, ListItem, ListItemText, Select, MenuItem, InputLabel, FormControl, CircularProgress, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import useFetchData from '../hooks/useFetchData'; // Adjust the import path based on your folder structure
import { useAuth } from '../contexts/AuthContext'; // Import your authentication context


const initialFormState = {
    songTitle: '',
    artist: '',
    genre: '',
    description: '',
    mood: '',
    emoji: '',
    date: '',
    albumArt: '', // New field for album art
    previewUrl: '' // New field for audio preview URL
};

const EntryForm = ({ addEntry }) => {
    const [formData, setFormData] = useState(initialFormState);
    const [query, setQuery] = useState('');
    const [genres, setGenres] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [audioPreview, setAudioPreview] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const { data: searchResults, loading: loadingSearch, error: searchError } = useFetchData(query ? `/api/spotify/search?query=${query}` : null);
    const { data: genresData, loading: loadingGenres, error: genresError } = useFetchData('/api/spotify/genres');
    const { currentUser } = useAuth(); // Access the current user

    useEffect(() => {
        if (genresData) {
            setGenres(genresData);
        }
    }, [genresData]);

    useEffect(() => {
        console.log(currentUser); // Check if currentUser is set
    }, [currentUser]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const entryToSubmit = {
            ...formData,
            date: new Date(formData.date).toISOString(),
        };

        addEntry(entryToSubmit);
        setFormData(initialFormState);
        setQuery('');
        setShowResults(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        if (name === 'songTitle') {
            setQuery(value.length >= 3 ? value : '');
            setShowResults(value.length >= 3);
        }
    };

    const handleSelectSong = (song) => {
        setFormData((prevData) => ({
            ...prevData,
            songTitle: song.name,
            artist: song.artists.map(artist => artist.name).join(', '),
            albumArt: song.album.images[0]?.url || '', // Store the album art
            previewUrl: song.preview_url || '' // Store the preview URL
        }));
        setQuery('');
        setShowResults(false);
    };

    const handlePreviewAudio = (previewUrl) => {
        if (audioPreview && audioPreview.src === previewUrl && isPlaying) {
            audioPreview.pause();
            setIsPlaying(false);
        } else {
            if (audioPreview) {
                audioPreview.pause();
            }

            const newAudio = new Audio(previewUrl);
            newAudio.play();
            setAudioPreview(newAudio);
            setIsPlaying(true);

            newAudio.onended = () => {
                setIsPlaying(false);
            };
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6" align="center" gutterBottom>
                    Add New Entry
                </Typography>
                <TextField
                    label="Song Title"
                    name="songTitle"
                    value={formData.songTitle}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                {loadingSearch && <Typography>Loading...</Typography>}
                {searchError && <Typography color="error">{searchError}</Typography>}
                {showResults && searchResults && searchResults.tracks.items.length > 0 && (
                    <List sx={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {searchResults.tracks.items.map((song) => (
                            <ListItem
                                button="true"
                                key={song.id}
                                onClick={() => handleSelectSong(song)}
                                sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)', cursor: 'pointer' } }}
                            >
                                <Box
                                    component="img"
                                    src={song.album.images[0]?.url || ''}
                                    alt={song.name}
                                    sx={{ marginRight: 2, width: 56, height: 56, objectFit: 'cover' }}
                                />
                                <ListItemText
                                    primary={song.name}
                                    secondary={song.artists.map(artist => artist.name).join(', ')}
                                />
                                {song.preview_url && (
                                    <IconButton
                                        edge="end"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePreviewAudio(song.preview_url);
                                        }}
                                    >
                                        {isPlaying && audioPreview && audioPreview.src === song.preview_url ? (
                                            <PauseIcon />
                                        ) : (
                                            <PlayArrowIcon />
                                        )}
                                    </IconButton>
                                )}
                            </ListItem>
                        ))}
                    </List>
                )}

                <TextField
                    label="Artist"
                    name="artist"
                    value={formData.artist}
                    onChange={handleChange}
                    required
                    fullWidth
                    disabled // This field is auto-filled
                />

                <FormControl fullWidth>
                    <InputLabel>Genre</InputLabel>
                    <Select
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                    >
                        {loadingGenres && <MenuItem disabled><CircularProgress size={24} /></MenuItem>}
                        {genresError && <MenuItem disabled>Error fetching genres</MenuItem>}
                        {genres.map((genre) => (
                            <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    multiline
                    rows={4}
                    fullWidth
                />
                <TextField
                    label="Mood"
                    name="mood"
                    value={formData.mood}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Emoji"
                    name="emoji"
                    value={formData.emoji}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Date"
                    type="datetime-local"  // Use datetime-local to capture both date and time
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Add Entry
                </Button>
            </Box>
        </Paper>
    );
};

export default EntryForm;
