'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Team.hasMany(models.Todo,{
        foreignKey: 'team_id',
        as: 'todos'
      })
      Team.belongsToMany(models.User,{
        through: models.TeamUser,
        foreignKey:'TeamId',
      })
    }
  }
  Team.init({
    name: DataTypes.STRING,
    creator_id: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Team',
  }, { timestamps: false });
  return Team;
};