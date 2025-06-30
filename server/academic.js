const currdate = new Date();
const currentYear = currdate.getFullYear().toString();
const currentMonth = currdate.getMonth();
export default {
    currentYear,
    sessionIncluesMonth: currentMonth,
};
