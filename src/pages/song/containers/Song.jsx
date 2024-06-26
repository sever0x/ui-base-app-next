import React, {useEffect, useMemo, useState} from 'react';
import {useIntl} from "react-intl";
import {useDispatch, useSelector} from "react-redux";
import actions from '../actions/songDetails'
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import ViewContent from "../components/ViewContent";
import EditContent from "../components/EditContent";
import Snackbar from "../../../components/Snackbar";

const mode = {
    view: 'view',
    edit: 'edit'
}

const Song = () => {
    const {formatMessage} = useIntl();
    const dispatch = useDispatch();
    const {songId} = useParams();
    const {currentSong, errors} = useSelector(({songDetails}) => songDetails);
    const navigate = useNavigate();

    const [currentMode, setCurrentMode] = useState(mode.view);

    const randomImageNumber = useMemo(() => {
        return Math.floor(Math.random() * 8) + 1;
    }, [songId]);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const randomAlbumCover = `/static/images/cards/${randomImageNumber}.jpg`;

    const {
        id,
        title,
        album,
        releaseYear,
        artist,
        genres,
        duration
    } = currentSong;

    const { state } = useLocation();
    const [previousLocation, setPreviousLocation] = useState(state?.from || null);

    useEffect(() => {
        dispatch(actions.fetchGetSongById(songId));
    }, [dispatch]);


    const handleSave = ({updatedSongId, updatedSong}) => {
        dispatch(actions.fetchUpdateSongById({updatedSongId, updatedSong}))
            .then(() => {
                setCurrentMode(mode.view);
                setSnackbarMessage(formatMessage({ id: 'edit.success' }));
                setSnackbarOpen(true);
            })
            .catch((error) => {
                setSnackbarMessage(formatMessage({ id: 'edit.failure' }));
                setSnackbarOpen(true);
            });
    };

    const handleCancel = () => {
        setCurrentMode(mode.view);
    };

    const handleEditButtonClick = () => {
        setCurrentMode(mode.edit);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleGoBack = () => {
        if (previousLocation) {
            navigate(previousLocation.pathname + previousLocation.search);
        }
    };

    return (
        <div>
            {currentMode === mode.view ? (
                <ViewContent
                    title={title}
                    album={album}
                    releaseYear={releaseYear}
                    artist={artist}
                    genres={genres}
                    duration={duration}
                    randomAlbumCover={randomAlbumCover}
                    navigate={handleGoBack}
                    onEditButtonClick={handleEditButtonClick}
                />
            ) : (
                <EditContent
                    id={id}
                    artistId={currentSong.artist.id}
                    initialTitle={currentSong.title}
                    initialAlbum={currentSong.album}
                    initialReleaseYear={currentSong.releaseYear}
                    initialArtistName={currentSong.artist.name}
                    initialArtistCountry={currentSong.artist.country}
                    initialGenres={currentSong.genres}
                    initialDuration={currentSong.duration}
                    isCreateMode={!songId}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}
            <Snackbar open={snackbarOpen} message={snackbarMessage} onClose={handleCloseSnackbar} />
        </div>
    );
};

export default Song;
