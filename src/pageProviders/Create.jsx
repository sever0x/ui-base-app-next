import CreatePage from 'pages/create';
import React from 'react';

import PageContainer from './components/PageContainer';

const Create = (props) => {
    return (
        <PageContainer>
            <CreatePage {...props} />
        </PageContainer>
    );
};

export default Create;
