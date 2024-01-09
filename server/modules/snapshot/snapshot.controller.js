import AppError from "../../utils/appError.js";
import CourseModel from "../course/course.model.js";
import UserSnapshot from "./snapshot.model.js";

export const createUserSnapshotHelper = async (user) => {
    await UserSnapshot.deleteMany({ email: user.email });
    const newSnapshot = new UserSnapshot({
        name: user.name,
        email: user.email,
        courses: user.courses,
        favourites: user.favourites,
    });
    await newSnapshot.save();
};

export const getUserDifference = async (req, res, next) => {
    const user = req.user;
    const userSnapshot = await UserSnapshot.findOne({ email: user.email });

    if (!userSnapshot) {
        return res.json({
            message: "No snapshots found!",
            courseDiff: [],
            favouritesDiff: [],
            requiresUpdate: false,
        });
    }
    let [coursesAdded, coursesDeleted] = getDifferenceHelper(
        getCourseCodeArr(userSnapshot.courses),
        getCourseCodeArr(user.courses)
    );
    let [favouritesAdded, favouritesDeleted] = getDifferenceHelper(
        getFavIdArr(userSnapshot.favourites),
        getFavIdArr(user.favourites)
    );

    let clientDate = userSnapshot.createdAt;

    let coursesArr = getCourseCodeArr(user.courses);

    const updatedCourses = await CourseModel.find({
        $and: [{ code: { $in: coursesArr } }, { updatedAt: { $gte: clientDate } }],
    })
        .populate({
            path: "children",
            select: "-__v",
            populate: {
                path: "children",
                select: "-__v",
                populate: {
                    strictPopulate: false,
                    path: "children",
                    select: "-__v",
                    populate: {
                        strictPopulate: false,
                        path: "children",
                        select: "-__v",
                        populate: {
                            strictPopulate: false,
                            path: "children",
                            select: "-__v",
                            populate: {
                                strictPopulate: false,
                                path: "children",
                                select: "-__v",
                                populate: {
                                    strictPopulate: false,
                                    path: "children",
                                    select: "-__v",
                                    populate: {
                                        strictPopulate: false,
                                        path: "children",
                                        select: "-__v",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })
        .select("-__v");

    const addedCourses = await CourseModel.find({ code: { $in: coursesAdded } })
        .populate({
            path: "children",
            select: "-__v",
            populate: {
                path: "children",
                select: "-__v",
                populate: {
                    strictPopulate: false,
                    path: "children",
                    select: "-__v",
                    populate: {
                        strictPopulate: false,
                        path: "children",
                        select: "-__v",
                        populate: {
                            strictPopulate: false,
                            path: "children",
                            select: "-__v",
                            populate: {
                                strictPopulate: false,
                                path: "children",
                                select: "-__v",
                                populate: {
                                    strictPopulate: false,
                                    path: "children",
                                    select: "-__v",
                                    populate: {
                                        strictPopulate: false,
                                        path: "children",
                                        select: "-__v",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })
        .select("-__v");

    let data = {};

    const updatedCoursesArr = getCourseCodeArr(updatedCourses);

    updatedCourses.map((course) => {
        data[course.code] = course;
    });
    addedCourses.map((course) => {
        data[course.code] = course;
    });

    const requiresUpdate =
        coursesAdded.length ||
        coursesDeleted.length ||
        favouritesAdded.length ||
        updatedCoursesArr.length ||
        favouritesDeleted.length;

    return res.json({
        message: "Snapshot found!",
        requiresUpdate: requiresUpdate > 0 ? true : false,
        coursesAdded,
        coursesDeleted,
        favouritesAdded,
        favouritesDeleted,
        updatedCourses: updatedCoursesArr,
        data,
    });
};

function getDifferenceHelper(clientArr, serverArr) {
    const serverSet = new Set();
    const clientSet = new Set();
    for (let i = 0; i < serverArr.length; i++) {
        serverSet.add(serverArr[i]);
    }
    for (let i = 0; i < clientArr.length; i++) {
        clientSet.add(clientArr[i]);
    }
    for (let i = 0; i < clientArr.length; i++) {
        if (serverSet.has(clientArr[i])) {
            serverSet.delete(clientArr[i]);
        }
    }
    for (let i = 0; i < serverArr.length; i++) {
        if (clientSet.has(serverArr[i])) {
            clientSet.delete(serverArr[i]);
        }
    }
    let added = [];
    let deleted = [];
    serverSet.forEach((code) => added.push(code));
    clientSet.forEach((code) => deleted.push(code));
    return [added, deleted];
}

function getCourseCodeArr(courses) {
    let ret = [];
    courses.map((c) => ret.push(c.code.toLowerCase()));
    return ret;
}

function getFavIdArr(favs) {
    let ret = [];
    favs.map((c) => ret.push(c.id));
    return ret;
}

export const updateUserSnapshot = async (req, res, next) => {
    const user = req.user;
    await createUserSnapshotHelper(user);
    res.json({ updatedUser: true });
};
