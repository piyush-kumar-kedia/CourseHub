export const formatFileSize = (file_size) => {
	try {
		return parseFloat(file_size) > 1
			? parseFloat(file_size).toFixed(0) + "MB"
			: (parseFloat(file_size) * 1000).toFixed(0) + "KB";
	} catch (error) {
		return "invalid";
	}
};
export const formatFileType = (name) => {
	try {
		return name.slice(name.length - 4).split(".")[0]
			? name.slice(name.length - 4).split(".")[0]
			: name.slice(name.length - 4).split(".")[1];
	} catch (error) {
		return "invalid";
	}
};
export const formatFileName = (name) => {
	try {
		return name.length > 20
			? name.slice(0, 16) + "..." + name.slice(name.length - 4)
			: name;
	} catch (error) {
		return "invalid";
	}
};
