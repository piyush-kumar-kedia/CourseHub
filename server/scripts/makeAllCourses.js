import axios from "axios";
const baseUrl = "http://localhost:8080";

const wait = async (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

async function main() {
    const resp = await axios.get(`${baseUrl}/api/file/getCourseIds`);
    const allCourses = resp.data;
    console.log(allCourses.length);

    for (let i = 0; i < allCourses.length; i++) {
        try {
            const res = await axios.post(`${baseUrl}/api/admin/course`, {
                id: allCourses[i].id,
                code: allCourses[i].name.split("-")[0].trim().toLowerCase(),
            });
            console.log(`Created ${allCourses[i].name}`);
        } catch (error) {
            console.log(error.message);
        }
        // await wait(3000);
    }
}

main();
