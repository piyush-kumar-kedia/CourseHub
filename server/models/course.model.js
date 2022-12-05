import { model, Schema } from "mongoose";

const FolderSchema = Schema({
	course: { type: String, required: true },
	name: { type: String, required: true },
	childType: { type: String, enum: ["File", "Folder"], required: true },
	children: [{ type: Schema.Types.ObjectId, refPath: "childType" }],
});
export const FolderModel = model("Folder", FolderSchema);

const FileSchema = Schema({
	course: { type: String, required: true },
	name: { type: String, required: true },
	// type: { type: String, required: true },
	id: { type: String, required: true },
	webUrl: { type: String, required: true },
	downloadUrl: { type: String, required: true },
});

export const FileModel = model("File", FileSchema);

// const YearSchema = Schema({
// 	name: { type: Number, required: true },
// 	folders: [{ type: Schema.Types.ObjectId, ref: "Folder" }],
// });

const CourseSchema = Schema({
	name: { type: String, required: true },
	code: { type: String, required: true },
	children: [{ type: Schema.Types.ObjectId, ref: "Folder" }],
	books: [{ type: String }],
});

const CourseModel = model("Course", CourseSchema);
export default CourseModel;

// 2 problems
// separate collection for folder and files
// creation complexity { file -> folder (-> folder) -> course }
//
// {
// 	code: 'MA201',
//  name:"Mathematics 201 Course"
// 	year : [{
// 		year: 2022,
// 		folders: [
// 			{
// 				name: 'Slides',
// 				childType: 'File',
// 				children: [
// 					...Files
// 				]
// 			},
// 			{
// 				name: 'Past Papers',
// 				childType: 'Folder',
// 				children: [
// 					{
// 						name: 'Question Papers',
// 						childType: 'File',
// 						children: [
// 							...Files
// 						]
// 					},
// 					{
// 						name: 'Answers',
// 						childType: 'File',
// 						children: [
// 							...Files
// 						]
// 					},
// 				]
// 			}
// 		]
// 	}]
// }
