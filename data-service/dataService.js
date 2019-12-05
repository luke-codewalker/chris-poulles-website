const contentful = require("contentful");
// load .env variables locally
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const contentClient = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    environment: "master"
});

const getFilms = async () => {
    const data = await contentClient.getEntries({
        content_type: "film"
    });

    const films = {};

    data.items.forEach(item => {
        if (films[item.fields.category]) {
            films[item.fields.category].push(item.fields);
        } else {
            films[item.fields.category] = [item.fields];
        }
    });

    return films;
};

const getAbout = async () => {
    const data = await contentClient.getEntries({
        content_type: "about"
    });

    return data.items[0].fields;
};

const getMetaInfo = async () => {
    const data = await contentClient.getEntries({
        content_type: "metaInfo"
    });

    return data.items[0].fields;
};

module.exports = {
    getFilms,
    getAbout,
    getMetaInfo
};