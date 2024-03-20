const { Wood } = require("../models");
exports.readAll = async (req, res) => {
  try{
    const woods = await Wood.findAll();
    res.status(200).json(woods);
  }catch{
    res.status(500).json({
        message: error.message || "Some error occurred while creating new user.",
      });
  }
}
exports.readHardness = async (req, res) => {
    try{
      const hardness = req.params.hardness;
      const woods = await Wood.findAll(
        {
            where: {
                hardness: hardness 
            }
        }
      );
      res.status(200).json(woods);
    }catch{
      res.status(500).json({
          message: error.message || "Some error occurred while creating new user.",
        });
    }
  }