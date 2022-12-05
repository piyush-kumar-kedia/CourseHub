import AppError from "../utils/appError.js";
import CourseModel, { FolderModel, FileModel } from "../models/course.model.js";

export const getCourse = async (req, res, next) => {
	const { courseId } = req.params;
	if (!courseId) throw new AppError(400, "Missing Course Id");
	const course = await CourseModel.findById(courseId)
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
					},
				},
			},
		})
		.select("-__v");

	if (!course) throw new AppError(500, "sd");

	res.json(course);
};

export const getAllCourses = async (req, res, next) => {
	const allCourse = await CourseModel.find().select("_id name");

	res.json(allCourse);
};

// router.post("/file", async (req, res, next) => {
// 	const newFile = await FileModel.create({
// 		name: "test file",
// 		type: "pdf",
// 		data: "testdata",
// 		url: "test url",
// 	});
// 	res.json(newFile);
// });

// router.get("/makefolder/:name/:dataType", async (req, res, next) => {
// 	const { name, dataId, dataType } = req.params;
// 	const newFolder = await FolderModel.create({
// 		name: name,
// 		childType: dataType,
// 	});
// 	res.send(newFolder);
// });

// router.get("/newCourse/", async (req, res, next) => {
// 	const newCourse = await CourseModel.create({
// 		code: "test",
// 		name: "test course",
// 		year: [
// 			{
// 				year: 2022,
// 			},
// 		],
// 	});
// 	res.json(newCourse);
// });

// router.get("/pushNewFolder/:courseId/:folderId", async (req, res, next) => {
// 	const { courseId, folderId } = req.params;
// 	const course = await CourseModel.findById(courseId);
// 	course.year[0].folders.push(folderId);
// 	const savedCourse = await course.save();
// 	res.json(savedCourse);
// });
// router.get("/pushToFolder/:courseId/:folderId", async (req, res, next) => {
// 	const { courseId, folderId } = req.params;
// 	const folder = await FolderModel.findOne({
// 		_id: courseId,
// 	});
// 	console.log(folder);
// 	folder.children.push(folderId);
// 	await folder.save();
// 	res.send(folder);
// });
