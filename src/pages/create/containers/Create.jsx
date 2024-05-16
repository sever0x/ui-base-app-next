import React, {useEffect} from 'react';
import EditContent from "../../song/components/EditContent";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import actions from "../actions/createSong";
import pageURLs from "../../../constants/pagesURLs";
import * as pages from "../../../constants/pages";

const Create = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { createdSongId } = useSelector(({ createSong }) => createSong);

    useEffect(() => {
        if (createdSongId) {
            navigate(`${pageURLs[pages.songPage]}/${createdSongId}`);
            dispatch(actions.resetCreateSong());
        }
    }, [createdSongId, navigate, dispatch]);

    const handleCreateSong = (response) => {
        const { updatedSong: song } = response;
        dispatch(actions.fetchCreateSong(song));
    };

    const handleCancelCreate = () => {
        navigate(-1);
    }

    return (
        <div>
            <EditContent
                isCreateMode={true}
                onSave={handleCreateSong}
                onCancel={handleCancelCreate}
            />
        </div>
    )
}

export default Create;