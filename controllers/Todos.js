const Todo = require("../models/").Todo;
const User = require("../models/").User;
const Team = require("../models/").Team;

module.exports = {
  //Create Todo
  createTodo: (req, res) => {
    if (req.body.isPrivate) {
      Todo.create({
        creator_id: req.userid,
        team_id: null,
        todo: req.body.todo,
        isDone: req.body.isDone,
        isPrivate: true,
      })
        .then((todo) => {
          res.json(todo);
        })
        .catch((err) => {
          res.json(err);
        });
    } else {
      Todo.create({
        creator_id: req.userid,
        team_id: req.body.team_id,
        todo: req.body.todo,
        isDone: req.body.isDone,
        isPrivate: false,
      })
        .then((todo) => {
          res.json(todo);
        })
        .catch((err) => {
          res.json(err);
        });
    }
  },

  //Get All Todo
  getTodo: (req, res) => {
    Todo.findAll({
      where: {
        isPrivate: false,
      },
      include: [
        {
          model: User,
          as: "users",
        },
      ],
    })
      .then((todos) => {
        res.json(todos);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  // Update Todo
  updateTodo: (req, res) => {
    Todo.update(
      {
        todo: req.body.todo,
        isDone: req.body.isDone,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((response) => {
        res.json({ msg: "Todo updated successfully" });
      })
      .catch((err) => {
        res.json(err);
      });
  },

  //Delete Todo
  deleteTodo: (req, res) => {
    Todo.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        res.json({ msg: "Todo deleted successfully" });
      })
      .catch((err) => {
        res.json(err);
      });
  },

  // Get Private Todo
  getPrivateTodo: (req, res) => {
    Todo.findAll({
      where: {
        isPrivate: true,
        creator_id: req.userid,
      },
    })
      .then((todos) => {
        res.json(todos);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  // Get My Todos
  getMyAllTodo: (req, res) => {
    Todo.findAll({
      where: {
        creator_id: req.userid,
      },
    })
      .then((todos) => {
        res.json(todos);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
};
