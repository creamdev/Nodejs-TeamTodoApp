'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User,{
        foreignKey: 'creator_id',
        as: 'users'
      })
      Todo.belongsTo(models.Team,{
        foreignKey: 'team_id',
        as: 'teams'
      })
    }
  }
  Todo.init({
    todo: DataTypes.STRING,
    creator_id: DataTypes.INTEGER,
    team_id:DataTypes.INTEGER,
    isDone: DataTypes.BOOLEAN,
    isPrivate: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  }, { timestamps: false });
  return Todo;
};