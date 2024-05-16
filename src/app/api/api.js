import axios from 'axios';
import config from '../../config';
import storage from "../../misc/storage";
import mockData, {formatMockData, formatMockSong} from "./mockData";

const {BACKEND_SERVICE} = config;
const REQUEST_URL = `${BACKEND_SERVICE}/api/song`;

const saveMockData = (data) => {
    storage.setItem('mockData', JSON.stringify(data));
};

const checkAndInitializeMockData = () => {
    const mockDataFromStorage = storage.getItem('mockData');
    if (!mockDataFromStorage) {
        saveMockData(mockData);
    }
}

export const getSongList = (params) => {
    const { artistId, album, page, size } = params;
    const parameters = {
        artistId: artistId ? artistId : null,
        album: album ? album : null,
        page: page ? page - 1 : 0,
        size: size ? size : 10,
    };

    return axios.post(`${REQUEST_URL}/_list`, parameters)
        .then(response => response)
        // TODO Mocked '.catch()' section
        .catch(() => {
            checkAndInitializeMockData();
            return formatMockData(JSON.parse(storage.getItem('mockData')), artistId, album);
        });
};

export const deleteSongById = (id) => {
    return axios.delete(`${REQUEST_URL}/${id}`)
        .then(response => response)
        // TODO Mocked '.catch()' section
        .catch(() => {
            const mockDataFromStorage = JSON.parse(storage.getItem('mockData'));
            const songIndex = mockDataFromStorage.findIndex(song => song.id === parseInt(id));
            if (songIndex !== -1) {
                const deletedSong = mockDataFromStorage.splice(songIndex, 1)[0];
                saveMockData(mockDataFromStorage);
                return { id: deletedSong.id, success: true };
            }
        });
};

export const updateSongById = ({updatedSongId, updatedSong}) => {
    return axios.put(`${REQUEST_URL}/${updatedSongId}`, updatedSong)
        .then(response => response)
        // TODO Mocked '.catch()' section
        .catch(() => {
            const mockDataFromStorage = JSON.parse(storage.getItem('mockData'));
            const songIndex = mockDataFromStorage.findIndex(song => song.id === parseInt(updatedSongId));
            if (songIndex !== -1) {
                mockDataFromStorage[songIndex] = { ...mockDataFromStorage[songIndex], ...updatedSong };
                saveMockData(mockDataFromStorage);
                return mockDataFromStorage[songIndex];
            }
        });
}

export const getSongById = (id) => {
    return axios.get(`${REQUEST_URL}/${id}`)
        .then(response => response)
        // TODO Mocked '.catch()' section
        .catch(() => {
            const mockDataFromStorage = JSON.parse(storage.getItem('mockData'));
            const mockSong = mockDataFromStorage.find(song => song.id === parseInt(id));
            return formatMockSong(mockSong);
        });
}

export const createSong = (song) => {
    return axios.post(`${REQUEST_URL}`, song)
        .then(response => response)
        // TODO Mocked '.catch()' section
        .catch(() => {
            const mockDataFromStorage = JSON.parse(storage.getItem('mockData')) || [];
            const maxId = Math.max(...mockDataFromStorage.map(song => song.id || 0));

            const existingArtist = mockDataFromStorage.find(s => s.artist && s.artist.id === song.artistId)?.artist;

            const newSong = {
                id: maxId + 1,
                title: song.title,
                artist: {
                    id: song.artistId,
                    name: existingArtist?.name || '',
                    country: existingArtist?.country || ''
                },
                album: song.album,
                genres: song.genres,
                duration: song.duration,
                releaseYear: song.releaseYear
            };

            mockDataFromStorage.push(newSong);
            saveMockData(mockDataFromStorage);
            return newSong;
        });
}
