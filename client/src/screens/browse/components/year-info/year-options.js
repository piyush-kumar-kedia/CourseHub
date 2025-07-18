
const options=[];
const currYear=new Date().getFullYear();
for(let i=0;i<5;i++){
    options.push((currYear-i).toString());
}
export default options;