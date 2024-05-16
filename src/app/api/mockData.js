const json = [
    {
        "id": 1,
        "title": "Bohemian Rhapsody",
        "artist": {
            "id": 1,
            "name": "True Queen",
            "country": "UK"
        },
        "album": "A Night at the Opera",
        "genres": "Rock, Progressive Rock",
        "duration": 354,
        "releaseYear": 1975
    },
    {
        "id": 2,
        "title": "Imagine",
        "artist": {
            "id": 2,
            "name": "Jonny Lennon",
            "country": "UK"
        },
        "album": "Imagine",
        "genres": "Rock, Pop Rock",
        "duration": 184,
        "releaseYear": 1971
    },
    {
        "id": 3,
        "title": "Stairway to Heaven",
        "artist": {
            "id": 3,
            "name": "Led Zipkin",
            "country": "UK"
        },
        "album": "Led Zeppelin IV",
        "genres": "Rock, Folk Rock",
        "duration": 482,
        "releaseYear": 1971
    }
];

const mockData = JSON.parse(JSON.stringify(json));

export const formatMockData = (mockData, artistId, album) => {
    let filteredData = mockData;
    if (artistId !== null && artistId !== undefined) {
        filteredData = mockData.filter(song => song.artist.id === artistId);
    }
    if (album) {
        filteredData = filteredData.filter(song => song.album === album);
    }
    const formattedData = filteredData.map(song => ({
        id: song.id,
        title: song.title,
        artistName: song.artist.name,
        album: song.album,
        duration: song.duration,
    }));

    return {
        list: formattedData,
        totalPages: Math.ceil(formattedData.length / 10),
    };
};

export const formatMockSong = (song) => {
    return {
        id: song.id,
        title: song.title,
        artist: {
            id: song.artist.id,
            name: song.artist.name,
            country: song.artist.country,
        },
        album: song.album,
        genres: song.genres,
        duration: song.duration,
        releaseYear: song.releaseYear,
    };
};

export default mockData;