import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import actions from '../actions/song'
import SongCard from "components/SongCard";
import Grid from "components/Grid";
import GridItem from "components/GridItem";
import Pagination from "components/Pagination";
import {createUseStyles} from "react-jss";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import SongFilters from "components/SongFilters";
import {useIntl} from "react-intl";
import Stack from "components/Stack";
import Button from "components/Button";
import Snackbar from "components/Snackbar";
import * as pages from "../../../constants/pages";
import pagesURLs from "../../../constants/pagesURLs";

const getClasses = createUseStyles(() => ({
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '16px',
    },
}));

const Default = () => {
    const classes = getClasses();
    const location = useLocation();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const { formatMessage } = useIntl();
    const navigate = useNavigate();

    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const artistId = searchParams.get('artistId') || null;
    const album = searchParams.get('album') || null;
    const size = 10;

    const [filters, setFilters] = useState({
        artistId,
        album,
    });

    const { list, totalPages } = useSelector(({ song }) => song);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        dispatch(actions.fetchSongList({ page: currentPage, size, ...filters }));
    }, [currentPage, filters, dispatch]);

    const handleChangePage = (page) => {
        setSearchParams({ page: page.toString() }, { replace: true });
    };

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
        const newSearchParams = {
            page: '1',
            ...(newFilters.artistId && { artistId: newFilters.artistId }),
            ...(newFilters.album && { album: newFilters.album }),
        };
        setSearchParams(newSearchParams, { replace: true });
    };

    const handleDeleteSong = (songId) => {
        dispatch(actions.fetchDeleteSong(songId))
            .then(() => {
                setSnackbarMessage(formatMessage({ id: 'deleting.success' }));
                setSnackbarOpen(true);
            })
            .catch((error) => {
                setSnackbarMessage(formatMessage({ id: 'deleting.failure' }));
                setSnackbarOpen(true);
            });
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleCreateSong = () => {
        navigate(`${pagesURLs[pages.songPage]}/create`, { state: { from: location } });
    };

    return (
        <div>
            <Stack pb={2} justifyContent={'space-between'}>
                <SongFilters
                    onApplyFilters={handleApplyFilters}
                    firstFieldLabel={formatMessage({ id: 'enter_artist_id' })}
                    secondFieldLabel={formatMessage({ id: 'enter_album_name' })}
                />
                <Button onClick={handleCreateSong}>
                    {formatMessage({ id: 'add_new_song' })}
                </Button>
            </Stack>
            <Grid>
                {list.map(({ id, title, artistName, album, duration }) => (
                    <GridItem>
                        <SongCard
                            id={id}
                            title={title}
                            artistName={artistName}
                            duration={duration}
                            album={album}
                            onDelete={handleDeleteSong}
                        />
                    </GridItem>
                ))}
            </Grid>
            <div className={classes.pagination}>
                <Pagination count={totalPages} page={currentPage} onChange={handleChangePage} />
            </div>
            <Snackbar open={snackbarOpen} message={snackbarMessage} onClose={handleCloseSnackbar} />
        </div>
    );
};

export default Default;
