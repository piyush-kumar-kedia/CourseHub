import BR from "./br.model.js";

const createBR = async (req, res) => {
    try {
        const {email} = req.body;

        if (!email )
            return res.status(400).json({ error: "email is required" });

        const exists = await BR.findOne({ email });
        if (exists) return res.status(409).json({ error: "BR already exists" });
        const br = await BR.create({email});
        res.status(201).json({ message: "BR added", br });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAll = async (req, res, next) => {
    try {
        const list = await BR.find({});
        res.status(200).json({ list });
    } catch (err) {
        next(err);
    }
};

const deleteBR = async (req, res) => {
    try {
        const {email} = req.body;
        if (!email) return res.status(400).json({ error: "email is required" });

        const br = await BR.findOneAndDelete({ email });
        if (!br) return res.status(404).json({ error: "BR not found" });

        res.status(200).json({ message: "BR deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export { createBR , getAll , deleteBR };