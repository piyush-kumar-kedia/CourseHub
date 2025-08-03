// Centralized config for all hardcoded URLs used in the server
const links = {
    FRONTEND_URL: "http://localhost:5173", // server/index.js
    IMAGEKIT_ENDPOINT: "https://ik.imagekit.io/your_imagekit_id/", // server/ImageUpload.js
    LOCAL_API_BASE_URL: "http://localhost:8080", // server/scripts/makeAllCourses.js
    COURSEHUB_MOBILE_REDIRECT: "https://www.coursehubiitg.in/api/auth/login/redirect/mobile", // server/modules/auth/auth.controller.js
};
export default links;
