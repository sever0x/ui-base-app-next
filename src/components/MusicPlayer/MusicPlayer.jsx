import React from 'react';
import useTheme from '../../misc/hooks/useTheme';
import Box from "../Box";
import IconButton from "../IconButton";
import SkipNext from "../icons/SkipNext";
import SkipPrevious from "../icons/SkipPrevious";
import PlayArrow from "../icons/PlayArrow";

const MusicPlayer = () => {
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 0, pb: 0 }}>
            <IconButton aria-label="previous">
                {theme.direction === 'rtl' ? <SkipNext /> : <SkipPrevious />}
            </IconButton>
            <IconButton aria-label="play/pause">
                <PlayArrow sx={{ height: 38, width: 38 }} />
            </IconButton>
            <IconButton aria-label="next">
                {theme.direction === 'rtl' ? <SkipPrevious /> : <SkipNext />}
            </IconButton>
        </Box>
    );
};

export default MusicPlayer;