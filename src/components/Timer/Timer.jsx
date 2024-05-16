import React from 'react';
import Typography from "components/Typography";

const formatSeconds = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

const Timer = ({seconds}) => {
    const formattedTime = formatSeconds(seconds);

    return (
        <Typography variant="subTitle" color="secondary">
            {formattedTime}
        </Typography>
    );
}

export default Timer;