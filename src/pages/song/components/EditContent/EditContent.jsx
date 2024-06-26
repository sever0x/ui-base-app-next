import React, { useState } from 'react';
import Typography from "components/Typography";
import Stack from "components/Stack";
import TextField from "components/TextField";
import Button from "components/Button";
import { useIntl } from "react-intl";

const EditContent = ({
    id,
    artistId,
    initialTitle = '',
    initialAlbum = '',
    initialReleaseYear = '',
    initialGenres = '',
    initialDuration = 10,
    isCreateMode = false,
    onSave,
    onCancel,
}) => {
    const { formatMessage } = useIntl();
    const [title, setTitle] = useState(initialTitle);
    const [album, setAlbum] = useState(initialAlbum);
    const [releaseYear, setReleaseYear] = useState(initialReleaseYear);
    const [genres, setGenres] = useState(initialGenres);
    const [duration, setDuration] = useState(initialDuration);
    const [errors, setErrors] = useState({});
    const [creatingArtistId, setArtistId] = useState(1);

    const validateFields = () => {
        const currentYear = new Date().getFullYear();
        const errors = {};

        if (!title) {
            errors.title = formatMessage({ id: 'error.required' });
        }

        if (!album) {
            errors.album = formatMessage({ id: 'error.required' });
        }

        if (!genres) {
            errors.genres = formatMessage({ id: 'error.required' });
        } else if (!genres.split(',').every(genre => genre.trim())) {
            errors.genres = formatMessage({ id: 'error.invalidGenres' });
        }

        if (!releaseYear) {
            errors.releaseYear = formatMessage({ id: 'error.required' });
        } else if (releaseYear > currentYear) {
            errors.releaseYear = formatMessage({ id: 'error.invalidReleaseYear' });
        }

        if (!duration) {
            errors.duration = formatMessage({ id: 'error.required' });
        } else if (duration < 10) {
            errors.duration = formatMessage({ id: 'error.invalidDuration' });
        }

        return errors;
    };

    const handleSave = () => {
        const errors = validateFields();
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            const updatedSong = {
                title,
                artistId: isCreateMode ? creatingArtistId : artistId,
                album,
                releaseYear,
                genres,
                duration,
            };
            onSave({
                updatedSongId: id,
                updatedSong: updatedSong
            });
        }
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <Stack direction="column" spacing={2}>
            <Typography variant="h5">
                {isCreateMode ? formatMessage({ id: 'song.create' }) : formatMessage({ id: 'song.edit' })}
            </Typography>
            <TextField
                label={formatMessage({ id: 'title' })}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
            />
            <TextField
                label={formatMessage({ id: 'album' })}
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                error={!!errors.album}
                helperText={errors.album}
            />
            <TextField
                label={formatMessage({ id: 'released' })}
                value={releaseYear}
                onChange={(e) => setReleaseYear(e.target.value)}
                error={!!errors.releaseYear}
                helperText={errors.releaseYear}
            />
            <TextField
                label={formatMessage({ id: 'genres' })}
                value={genres}
                onChange={(e) => setGenres(e.target.value)}
                error={!!errors.genres}
                helperText={errors.genres}
            />
            <TextField
                label={formatMessage({ id: 'duration' })}
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                error={!!errors.duration}
                helperText={errors.duration}
            />

            {isCreateMode && (
                <TextField
                    label="artistId"
                    type="number"
                    value={creatingArtistId}
                    onChange={(e) => setArtistId(e.target.value)}
                />
            )}

            <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={handleSave}>
                    {isCreateMode ? formatMessage({ id: 'btn.create' }) : formatMessage({ id: 'btn.save' })}
                </Button>
                <Button variant="outlined" onClick={handleCancel}>
                    {formatMessage({ id: 'btn.cancel' })}
                </Button>
            </Stack>
        </Stack>
    );
};

export default EditContent;