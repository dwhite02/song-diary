import React, { useState } from 'react';
import useFetchData from '../../hooks/useFetchData';  // Import the custom hook

const SpotifySearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [url, setUrl] = useState('');
    const { data, loading, error } = useFetchData(url);

    const handleSearch = () => {
        if (searchQuery) {
            setUrl(`/api/Spotify/search?query=${searchQuery}`);  // This will trigger the fetch
        }
    };

    return (
        <div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a song"
            />
            <button onClick={handleSearch}>Search</button>

            {/* Display loading indicator */}
            {loading && <p>Loading...</p>}

            {/* Display error message */}
            {error && <p>Error: {error}</p>}

            {/* Display results if available */}
            {data && (
                <ul>
                    {data.tracks?.items.map(track => (
                        <li key={track.id}>
                            {track.name} by {track.artists.map(artist => artist.name).join(", ")}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SpotifySearch;
