import mongoose from "mongoose";
const SearchSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    isAvailable: { type: Boolean, default: false },
});
const SearchResults = mongoose.model("SearchResults", SearchSchema);
export default SearchResults;
