export const AddPreviewUrl = (id, url) => {
    return {
        type: "ADD_PREVIEW_URL",
        payload: {
            id: id,
            url: url,
        },
    };
};
export const AddDownloadUrl = (id, url) => {
    return {
        type: "ADD_DOWNLOAD_URL",
        payload: {
            id: id,
            url: url,
        },
    };
};
