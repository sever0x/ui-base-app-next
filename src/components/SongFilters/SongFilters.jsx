import React, { useState } from 'react';
import TextField from "../TextField";
import Button from "../Button";
import Stack from "../Stack";
import {useIntl} from "react-intl";

const SongFilters = ({
    onApplyFilters,
    firstFieldLabel,
    secondFieldLabel
}) => {
    const [artistId, setArtistId] = useState('');
    const [album, setAlbum] = useState('');
    const { formatMessage } = useIntl();

    const handleApplyFilters = () => {
        onApplyFilters({ artistId: parseInt(artistId) || null, album: album || null });
    };

    const handleResetFilters = () => {
        setArtistId('');
        setAlbum('');
        onApplyFilters({ artistId: null, album: null });
    };

    return (
        <Stack direction="row" spacing={1}>
            <TextField
                label={firstFieldLabel}
                onChange={({ target }) => setArtistId(target.value)}
                value={artistId}
            />
            <TextField
                label={secondFieldLabel}
                onChange={({ target }) => setAlbum(target.value)}
                value={album}
            />
            <Button onClick={handleApplyFilters}>
                {formatMessage({ id: 'apply' })}
            </Button>
            <Button onClick={handleResetFilters}>
                {formatMessage({ id: 'reset' })}
            </Button>
        </Stack>
    );
};

export default SongFilters;