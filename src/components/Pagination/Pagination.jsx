import React, {useCallback} from 'react';
import PaginationMUI from '@mui/material/Pagination';

const Pagination = ({
    count = 10,
    page,
    onChange
}) => {
    const handleChangePage = useCallback((event, value) => {
        onChange(value);
    }, [onChange]);

    return (
        <PaginationMUI
            count={count}
            page={page}
            onChange={handleChangePage}
        />
    );
}

export default Pagination;