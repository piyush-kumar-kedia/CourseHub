const formatLongText = (text, amt) => {
    if (text.length < amt) return text;
    else {
        let firstPart = text.slice(0, amt);
        return firstPart + "...";
    }
};
export default formatLongText;
