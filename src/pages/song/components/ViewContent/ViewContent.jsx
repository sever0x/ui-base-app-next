import React from 'react';
import Typography from "components/Typography";
import Stack from "components/Stack";
import MusicPlayer from 'components/MusicPlayer';
import Timer from 'components/Timer';
import ArrowBackIcon from "components/icons/ArrowBack";
import Divider from "components/Divider";
import IconButton from "components/IconButton";
import Box from "components/Box";
import Button from "components/Button";
import {useIntl} from "react-intl";

const ViewContent = ({
    title,
    album,
    releaseYear,
    artist,
    genres,
    duration,
    randomAlbumCover,
    navigate,
    onEditButtonClick,
}) => {
    const {formatMessage} = useIntl();

    return (
        <Stack direction={'column'} spacing={2}>
            <Box>
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIcon />
                </IconButton>
            </Box>
            <Stack direction={'row'} spacing={4} justifyContent={'space-between'} sx={{ flex: '1 1 auto' }}>
                <Stack direction={'column'} spacing={2} sx={{ flex: '1' }}>
                    <Typography variant="largeTitle">
                        {title}
                    </Typography>
                    <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
                        <Stack direction={'column'}>
                            <Typography variant="caption" color="secondary">
                                {formatMessage({ id: 'album' })}:
                            </Typography>
                            <Typography variant="title" color="secondary">
                                «{album}»
                            </Typography>
                        </Stack>
                        <Stack direction={'column'}>
                            <Typography variant="caption" color="secondary">
                                {formatMessage({ id: 'released' })}:
                            </Typography>
                            <Typography variant="title" color="secondary">
                                {releaseYear}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack direction={'column'}>
                        <Typography variant="caption" color="secondary">
                            {formatMessage({ id: 'genres' })}:
                        </Typography>
                        <Typography variant="title" color="secondary">
                            {genres}
                        </Typography>
                    </Stack>
                    <Divider />
                    <Typography variant="title" color="secondary">
                        {formatMessage({ id: 'about' })}
                    </Typography>
                    <Typography variant="largeTitle">
                        {artist?.name || 'Unknown Artist'}
                    </Typography>
                    <Typography variant="subTitle">
                        {formatMessage({ id: 'country' })}: {artist?.country || formatMessage({ id: 'unknown.country' })}
                    </Typography>
                </Stack>
                <Stack direction={'column'} spacing={2}>
                    <img src={randomAlbumCover} alt="Random album cover" />
                    <Stack direction={'column'} spacing={0} alignItems={'center'}>
                        <MusicPlayer />
                        <Typography variant="subTitle">
                            <Timer seconds={duration} />
                        </Typography>
                    </Stack>
                    <Button onClick={onEditButtonClick}>
                        {formatMessage({ id: 'btn.edit' })}
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default ViewContent;