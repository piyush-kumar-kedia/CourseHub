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
export const getRandomColor = () => {
    const idx = Math.floor(Math.random() * colors.length);
    return colors[idx];
};
