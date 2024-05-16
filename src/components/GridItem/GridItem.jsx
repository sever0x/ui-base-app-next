import React from "react";
import GridMUI from "@mui/material/Grid";

const GridItem = ({children, xs = 12, sm = 6}) => {
    return (
        <GridMUI item xs={xs} sm={sm}>
            {children}
        </GridMUI>
    )
}

export default GridItem;