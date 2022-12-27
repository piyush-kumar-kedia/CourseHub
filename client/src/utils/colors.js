const colors = [
    "#DBCEFF",
    "#FFA7D4",
    "#6F8FFE",
    "#DBCEFF",
    "#EDF492",
    "#DBCEFF",
    "#EDF492",
    "#FFA7D4",
];

export const getColors = (index) => {
    const idx = index % (colors.length - 1);
    return colors[idx];
};

export const getRandomColor = () => {
    const idx = Math.floor(Math.random() * colors.length);
    return colors[idx];
};
