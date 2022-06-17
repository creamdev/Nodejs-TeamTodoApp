const Team = require("../models/").Team;
const User = require("../models/").User;
const Todo = require("../models/").Todo;
const TeamUser = require('../models').TeamUser

module.exports = {

//List Team
listTeam: (req, res) => {
      Team.findAll({
        include: [
          {
              model: Todo,
              include:[
                {
                  model:User,
                  as:'users',
                  attributes:["name","username"],
                }],
              required: false,
              as: "todos",
              where:{
                isPrivate:false
              },
          },
          {
              model: User,
              attributes:["name","username"],
              through:{attributes:[]}
          }
        ]
        
       })
        .then((teams) => {
          res.json(teams);
        })
        .catch((err) => {
          console.log(err)
          res.json(err);
        });
    },



//Create Team
createTeam: (req, res, next) => {
Team.findOne({
where: { name: req.body.name },
}).then((team) => {
if (team) {
  res.json({msg:"Team already exists"});
  next();
} else {
  Team.create({
    creator_id: req.userid,
    name: req.body.name,
  })
    .then((team) => {
      team.addUsers(req.userid)
      res.json(team);
    })
    .catch((err) => {
      res.json(err);
    });
}
});
},

// Add user to team
addUserToTeam: (req, res) => {
Team.findOne({
where: {
  id: req.params.id,
},
})
.then((team) => {
  team
    .addUsers(req.body.user_id)
    .then((team) => {
      res.json(team);
    })
    .catch((err) => {
      res.json(err);
    });
})
.catch((err) => {
  res.json(err);
});
},

// Delete user to team
deleteUserFromTeam: (req, res) => {
Team.findOne({
where: {
  id: req.params.id,
},
})
.then((team) => {
  team
    .removeUsers(req.body.user_id)
    .then((response) => {
      if(response==0){
        res.json({msg:"User not found from team"});
      }else{ res.json({msg:"User removed from team"});}
     
    })
    .catch((err) => {
      res.json(err);
    });
})
.catch((err) => {
  res.json(err);
});
},

};