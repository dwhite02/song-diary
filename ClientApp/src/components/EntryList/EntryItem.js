import { Card, CardContent, Typography, Button, Box, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useState } from 'react';

const EntryItem = ({ entry, deleteEntry }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio] = useState(new Audio(entry.previewUrl)); // Assuming previewUrl is part of entry

    const handlePlayPause = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Format the date
    const formattedDate = new Date(entry.date).toLocaleString(); // Adjust format as needed

    return (
        <Card variant="outlined" style={{ margin: '10px' }}>
            <CardContent>
                <Box display="flex" alignItems="center">
                    {/* Display song art */}
                    <img
                        src={entry.albumArt} // Assuming albumArt is part of entry
                        alt={entry.songTitle}
                        style={{ width: '56px', height: '56px', marginRight: '10px' }}
                    />
                    <Typography variant="h5">{entry.songTitle}</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">{entry.description}</Typography>
                <Typography variant="subtitle1">Artist: {entry.artist}</Typography> {/* Assuming artist is part of entry */}
                <Typography variant="subtitle1">Genre: {entry.genre}</Typography> {/* Assuming genre is part of entry */}
                <Typography variant="subtitle1">Mood: {entry.mood}</Typography>
                <Typography variant="subtitle1">Emoji: {entry.emoji}</Typography>
                <Typography variant="subtitle1">Date: {formattedDate}</Typography> {/* Display date */}
                <Box display="flex" alignItems="center" marginTop={1}>
                    {entry.previewUrl && (
                        <IconButton onClick={handlePlayPause}>
                            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                        </IconButton>
                    )}
                    <Button variant="contained" color="secondary" onClick={() => deleteEntry(entry.id)}>
                        Delete
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default EntryItem;

