import React from 'react';
import Box from "../Box";

const Divider = () => {
    return(
        <Box
            component="hr"
            sx={{
                border: (theme) =>
                    `1px solid '#fff'}`,
            }}
        />
    );
}

export default Divider;