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
    const userSnapshot = await UserSnapshot.findOne({ email: user.email });

    if (!userSnapshot) {
        return res.json({ message: "No snapshots found!", courseDiff: [], favouritesDiff: [] });
    }
    let [coursesAdded, coursesDeleted] = getDifferenceHelper(
        getCourseCodeArr(userSnapshot.courses),
        getCourseCodeArr(user.courses)
    );
    let [favouritesAdded, favouritesDeleted] = getDifferenceHelper(
        getFavIdArr(userSnapshot.favourites),
        getFavIdArr(user.favourites)
    );
    await createUserSnapshotHelper(user);
    return res.json({
        message: "Snapshot found!",
        coursesAdded,
        coursesDeleted,
        favouritesAdded,
        favouritesDeleted,
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
    courses.map((c) => ret.push(c.code));
    return ret;
}

function getFavIdArr(favs) {
    let ret = [];
    favs.map((c) => ret.push(c.id));
    return ret;
}
