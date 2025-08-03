const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1; 
const acadYear = (currentMonth >= 1 && currentMonth <= 5) ? currentDate.getFullYear() - 1 : currentDate.getFullYear();

const Yroptions = ({
    course,
}) => {
    const presentYears=[];
    const options=[];
    course.map((year,i)=> presentYears.push(year.name) )
    
    for(let i=0;i<5;i++){
        let yr=(acadYear-i).toString();
        if(!presentYears.includes(yr))
            options.push(yr);
    }

    return (
        <>
            {options.map((opt, idx) => {
                return (
                    <option className={"option"} value={opt} key={idx}>
                        {opt}
                    </option>
                );
            })}
        </>
    );
};

export default Yroptions;