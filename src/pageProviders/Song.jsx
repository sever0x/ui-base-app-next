import SongPage from 'pages/song';
import React from 'react';

import PageContainer from './components/PageContainer';

const Song = (props) => {
    return (
        <PageContainer>
            <SongPage {...props} />
        </PageContainer>
    );
};

export default Song;
