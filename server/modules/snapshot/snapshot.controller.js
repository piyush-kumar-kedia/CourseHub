import AppError from "../../utils/appError.js";
import UserSnapshot from "./snapshot.model.js";

export const createUserSnapshotHelper = async (user) => {
    await UserSnapshot.deleteMany({ _id: user._id });
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
    const userSnapshot = await UserSnapshot.findById(user._id);
    if (!userSnapshot) {
        return res.json({ message: "No snapshots found!", courseDiff: [], favouritesDiff: [] });
    }
    let courseDiff = getDifferenceHelper(
        getCourseCodeArr(userSnapshot.courses),
        getCourseCodeArr(user.courses)
    );
    let favouritesDiff = getDifferenceHelper(
        getFavIdArr(userSnapshot.favourites),
        getFavIdArr(user.favourites)
    );
    await createUserSnapshotHelper(user);
    return res.json({
        message: "Snapshot found!",
        courseDiff: courseDiff,
        favouritesDiff: favouritesDiff,
    });
};

function getDifferenceHelper(clientArr, serverArr) {
    const serverSet = new Set();
    for (let i = 0; i < serverArr.length; i++) {
        serverSet.add(serverArr[i]);
    }
    for (let i = 0; i < clientArr.length; i++) {
        if (serverSet.has(clientArr[i])) {
            serverSet.delete(clientArr[i]);
        }
    }
    let ret = [];
    serverSet.forEach((code) => ret.push(code));

    return ret;
}

function getCourseCodeArr(courses) {
    let ret = [];
    courses.map((c) => ret.push(courses.code));
    return ret;
}

function getFavIdArr(favs) {
    let ret = [];
    favs.map((c) => ret.push(favs.id));
    return ret;
}
