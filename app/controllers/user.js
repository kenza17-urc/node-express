const { User } = require("../models");
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      password: passwordHash
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some error occurred while creating new user.",
    });
  }
};

exports.login = async (req, res) => {
    try {
      const user = await User.findOne({
        where: { email: req.body.email },
      });
  
      if (!user) {
        return res.status(404).json({
          error: "Utilisateur non trouvé",
        });
      }
  
      const match = await bcrypt.compare(req.body.password, user.password);
  
      if (match) {
        const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
          expiresIn: process.env.JWTExpiration,
        });
  
        res.status(200).json({
          accessToken: token,
          user: user,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message || "Une erreur s'est produite lors de l'authentification",
      });
    }
  };
  