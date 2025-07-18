const presentYears=[];
const options=[];
const currYear=new Date().getFullYear();
for(let i=0;i<5;i++){
    let yr=(currYear-i).toString();
    if(!presentYears.includes(yr))
        options.push(yr);
}
export default options;