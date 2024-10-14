import { useState, useEffect } from 'react';
import EntryForm from './EntryForm';
import EntryList from './EntryList';
import fetchData from '../services/fetchService';
import CircularProgress from '@mui/material/CircularProgress';
import ConfirmDialog from './ConfirmDialog';
import { Button, Drawer, Box } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { useAuth } from '../contexts/AuthContext'; // Import the custom hook



function SongEntry() {
    const { isLoggedIn } = useAuth(); // Access the authentication context
    const [entries, setEntries] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [entryToDelete, setEntryToDelete] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const addEntry = (entry) => {
        setLoading(true);
        fetchData('/api/entries', 'POST', entry)
            .then(newEntry => {
                console.log('New entry saved:', newEntry);
                setEntries([...entries, newEntry]);
                setLoading(false);
                setSidebarOpen(false); // Close the sidebar after adding
            })
            .catch(error => {
                console.error('Error creating entry:', error);
                setError(error);
                setLoading(false);
            });
    };

    const handleDeleteClick = (id) => {
        setEntryToDelete(id);
        setConfirmOpen(true);
    };

    const confirmDelete = () => {
        setConfirmOpen(false);
        setLoading(true);
        fetchData(`/api/entries/${entryToDelete}`, 'DELETE')
            .then(() => {
                console.log('Entry deleted');
                setEntries(entries.filter(entry => entry.id !== entryToDelete));
            })
            .catch(error => {
                console.error('Error deleting entry:', error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
                setEntryToDelete(null);
            });
    };

    useEffect(() => {
        if (isLoggedIn) {
            setLoading(true);
            fetchData('/api/entries')
                .then(data => {
                    setEntries(data);
                })
                .catch(error => {
                    console.error('Entries not loading', error);
                    setError(error);
                })
                .finally(() => setLoading(false));
        }
    }, [isLoggedIn]); // Fetch entries only if the user is logged in

    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => setSidebarOpen(true)} style={{ position: 'fixed', bottom: 20, right: 20, zIndex:99 }}>
                <CreateIcon style={{ marginRight: 8 }} /> {/* Add icon with margin */}
                Add Entry
            </Button>

            <Drawer anchor="right" open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
                <Box sx={{ width: 500, padding: 2 }}>
                    <EntryForm addEntry={addEntry} />
                    <Button variant="outlined" onClick={() => setSidebarOpen(false)} style={{ marginTop: 16 }}>
                        Close
                    </Button>
                </Box>
            </Drawer>

            {error && <p>{error.message}</p>}
            {loading ? <CircularProgress /> : <EntryList entries={entries} deleteEntry={handleDeleteClick} />}

            <ConfirmDialog
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="Confirm Delete"
                message="Are you sure you want to delete this entry? This action cannot be undone."
            />
        </div>
    );
}

export default SongEntry;
