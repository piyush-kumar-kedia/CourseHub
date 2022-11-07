import { model, Schema } from "mongoose";

const FolderSchema = Schema({
	data: [{ type: Schema.Types.ObjectId, ref: "File" }],
});
export const FolderModel = model("Folder", FolderSchema);

const FileSchema = Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
	data: { type: String, required: true },
});

export const FileModel = model("File", FileSchema);

const CourseSchema = Schema({
	name: { type: String, required: true },
	folders: [
		{
			name: String,
			data: { type: Schema.Types.ObjectId, ref: "Folder" },
		},
	],
});

const CourseModel = model("Course", CourseSchema);
export default CourseModel;
