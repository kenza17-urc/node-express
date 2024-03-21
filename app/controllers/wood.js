const { Wood } = require("../models");
const fs = require('fs');

exports.readAll = async (req, res) => {
    try {
        const woods = await Wood.findAll();
        res.status(200).json(woods);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Une erreur s'est produite lors de la récupération des essences de bois.",
        });
    }
}

exports.readHardness = async (req, res) => {
    try {
        const hardness = req.params.hardness;
        const woods = await Wood.findAll({
            where: {
                hardness: hardness
            }
        });
        res.status(200).json(woods);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Une erreur s'est produite lors de la récupération des essences de bois.",
        });
    }
}

exports.createWood = async (req, res) => {
    try {
        const imagePath = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        const wood = await Wood.create({
            ...JSON.parse(req.body.datas),
            image: imagePath
        });
        res.status(201).json(wood);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la création de la nouvelle essence de bois" });
    }
};

        exports.updateWood = async (req, res) => {
            try {
                const woodId = req.params.id;
               
                const wood = await Wood.findByPk(woodId);
        
                if (!wood) {
                    return res.status(404).json({ message: "Wood non trouvé" });
                }
                let updatedData = {
                            ...JSON.parse(req.body.datas),
                        }
                if (req.file) {
                    const pathname = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
                    
                    if (wood.image) {
                        const filename = wood.image.split("/uploads/")[1];
                        fs.unlink(`uploads/${filename}`, (err) => {
                            if (err) {
                                console.error(`Erreur lors de la suppression de l'ancienne image ${filename} :`, err);
                            } else {
                                console.log(`Image ${filename} supprimée avec succès`);
                            }
                        });
                    }
                    updatedData.image = pathname;
                }
        
                await wood.update(updatedData);
                res.status(200).json(wood);
            } catch (error) {
                res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour du Wood" });
            }
        };

        exports.deleteWood = async (req, res) => {
            try {
    
                const woodId = req.params.id;
                
                const wood = await Wood.findByPk(woodId);
    
                if (!wood) {
                    return res.status(404).json({ message: "Wood non trouvé" });
                }
    
                if (wood.image) {
                    const filename = wood.image.split("/uploads/")[1];
                    fs.unlink(`uploads/${filename}`, (err) => {
                        if (err) {
                            console.error(`Erreur lors de la suppression de l'image ${filename} :`, err);
                        } else {
                            console.log(`Image ${filename} supprimée avec succès`);
                        }
                    });
                }
                await wood.destroy();
        
                res.status(204).send();
            } catch (error) {
                res.status(500).json({ message: "Une erreur s'est produite lors de la suppression du Wood" });
            }
        };
        