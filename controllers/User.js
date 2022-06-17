const Todo = require("../models/").Todo;
const Team = require("../models/").Team;
const User = require("../models/").User;
const path = require("path");

const {
  passwordToHash,
  generateAccessToken,
} = require("../scripts/helpers");

module.exports = {
  //Get
  getAllUsers: (req, res) => {
    User.findAll({
      include: [
        {
          model: Todo,
          as: "todos",
        },
      ],
    })
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  //Get User Profile
  getUserByProfile: (req, res) => {
    User.findOne({
      where: {
        id: req.userid,
      },
      include: { model: Team, attributes: ["name"] },
      attributes: ["id", "name","username", "email","image"],
    })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err)
        res.json(err);
      });
  },

  // Create user
  createUser: (req, res) => {
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((email) => {
      if (email) {
        res.json({
          message: "Email already exists",
        });
      } else {
        req.body.password = passwordToHash(req.body.password);
        User.create({
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          image:null
        })
          .then((user) => {
            res.json(user);
          })
          .catch((err) => {
            res.json(err);
          });
      }
    });
  },

  //Login User
  loginUser: (req, res) => {
    req.body.password = passwordToHash(req.body.password);
    User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    })
      .then((user) => {
        if (!user) {
          res.json({
            message: "Invalid email or password",
          });
        }

        user = {
          id: user.id,
          name: user.name,
          email: user.email,
          tokens: {
            access_token: generateAccessToken(user)
          },
        };
        delete user.password;
        res.status(200).send(user);
      })
      .catch((e) => console.log(e));
  },

  //Get Todos By User Id
  getTodosByUserId: (req, res) => {
    User.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["name"],
      include: [
        {
          model: Todo,
          required: false,
          as: "todos",
          where: {
            isPrivate: false,
          },
        },
      ],
    })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  // Update Profile
  updateProfile: (req, res) => {
    User.update(
      {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      },
      {
        where: {
          id: req.userid,
        },
      }
    )
      .then(() => {
        res.json({ msg: "Profile updated" });
      })
      .catch(() => {
        res.json({ msg: "Profile not updated" });
      });
  },

  // Update Password
  updatePassword: (req, res) => {
    User.update(
      {
        password: passwordToHash(req.body.password),
      },
      {
        where: {
          id: req.userid,
        },
      }
    )
      .then(() => {
        res.json({ msg: "Password updated" });
      })
      .catch(() => {
        res.json({ msg: "Password not updated" });
      });
  },

  //Update Image
  updateImage: (req, res) => {
    console.log(req.files);

    //File Control
    if (!req?.files?.image) {
      return res.status(400).send({
        error: "You do not have enough data to perform this operation.",
      });
    }
    const extension = path.extname(req.files.image.name);

    const fileName = `${req.userid}${extension}`;

    //Upload File
    const folderPath = path.join(__dirname, "../", "uploads/users", fileName);
    console.log(folderPath);
    const imagePath= `/uploads/users/${fileName}`
    req.files.image.mv(folderPath, function (err) {
      if (err) {
        return res.status(500).send({
          error: err,
        });
      } else {
        User.update(
          {
            image: imagePath,
          },
          {
            where: {
              id: req.userid,
            },
          }
        )
          .then(() => {
            res.json({ msg: "Image updated" });
          })
          .catch(() => {
            res.json({ msg: "Image not updated" });
          });
      }
    });
  },
};
