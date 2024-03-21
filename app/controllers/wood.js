const { Wood } = require("../models");

exports.readAll = async (req, res) => {
    try {
        const woods = await Wood.findAll();
        res.status(200).json(woods);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while creating new user.",
        });
    }
}
exports.readHardness = async (req, res) => {
    try {
        const hardness = req.params.hardness;
        const woods = await Wood.findAll(
            {
                where: {
                    hardness: hardness
                }
            }
        );
        res.status(200).json(woods);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while creating new user.",
        });
    }
}
exports.createWood = async (req, res) => {
    try {

        const imagePath = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        const woods = await Wood.create({
            ...JSON.parse(req.body.datas),
            image: imagePath
        });

        res.status(201).json(woods);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la création de la nouvelle essence de bois" });
    }
};

exports.updateWood = async (req, res) => {
    try {
        const woodId = req.params.id;
        const updatedData = req.body;

        const wood = await Wood.findByPk(woodId);

        if (!wood) {
            return res.status(404).json({ message: "Wood non trouvé" });
        }

        await wood.update(updatedData);

        if (req.file) {
        
            wood.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }
        res.status(200).json(wood);
    } catch (error) {
        res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour du Wood" });
    }
};



