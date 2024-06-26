import {DialogActions, DialogContent, DialogContentText, DialogTitle,} from "@mui/material";
import {Delete} from "@mui/icons-material";
import Timer from "components/Timer";
import {useMemo, useState} from "react";
import Stack from "../Stack";
import Dialog from "../Dialog";
import Button from "../Button";
import {useIntl} from "react-intl";
import VisibilityOn from "../icons/VisibilityOn";
import pagesURLs from "../../constants/pagesURLs";
import * as pages from "../../constants/pages";
import Box from "../Box/Box";
import IconButton from "../IconButton";
import Card from "../Card";
import CardContent from "../CardContent";
import CardMedia from "../CardMedia";
import MusicPlayer from "../MusicPlayer";
import Typography from "../Typography";
import {useLocation, useNavigate} from "react-router-dom";

const SongCard = ({
    id,
    title,
    artistName,
    album,
    duration,
    onDelete
}) => {
    const location = useLocation();
    const { formatMessage } = useIntl();

    const navigate = useNavigate();
    const handleViewSong = () => {
        navigate(`${pagesURLs[pages.songPage]}/${id}`, { replace: true, state: { from: location } });
    };

    const randomImageNumber = useMemo(() => {
        return Math.floor(Math.random() * 8) + 1;
    }, [title]);

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleConfirmDelete = () => {
        onDelete(id);
        handleCloseDeleteDialog();
    };

    return (
        <Card sx={{display: 'flex', flex: '1 1 auto', maxWidth: '492px', justifyContent: 'space-between'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                <CardContent sx={{flex: '1 0 auto'}} p={0}>
                    <Typography variant="title">
                        {title}
                    </Typography>
                    <Typography variant="subtitle" color="secondary">
                        {artistName} - "{album}"
                    </Typography>
                </CardContent>
                <Stack direction={"row"} justifyContent={'space-between'}>
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <MusicPlayer/>
                        <Box sx={{ marginLeft: '16px' }}>
                            <Timer seconds={duration} />
                        </Box>
                    </Box>
                    <Stack direction={"row"}>
                        <IconButton aria-label="view" onClick={handleViewSong}>
                            <VisibilityOn color={'success'} />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={handleOpenDeleteDialog}>
                            <Delete />
                        </IconButton>
                    </Stack>
                </Stack>
            </Box>
            <CardMedia
                component="img"
                sx={{width: 151}}
                image={`/static/images/cards/${randomImageNumber}.jpg`}
                alt="Random album cover"
            />
            <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle>{formatMessage({ id: 'deleting.confirm' })}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {formatMessage({ id: 'deleting.question' })}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        {formatMessage({ id: 'cancel' })}
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                        {formatMessage({ id: 'delete' })}
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

export default SongCard;