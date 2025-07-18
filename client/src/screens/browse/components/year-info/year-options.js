const presentYears=[];
const options=[];
const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11, so add 1 for 1-12
const acadYear = (currentMonth >= 1 && currentMonth <= 5) ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
for(let i=0;i<5;i++){
    let yr=(acadYear-i).toString();
    if(!presentYears.includes(yr))
        options.push(yr);
}
export default options;