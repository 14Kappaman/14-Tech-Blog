const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const User = require('./User');

class Comment extends Model {
  
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    
    contents: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    creator_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "User",
            key: "id",

        }
    } ,
    created_on: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW


    }, 
    blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Post",
            key: "id",

        }
    } 
  },
  {
    
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);
Comment.belongsTo(User, {foreignKey: "creator_id"} )
module.exports = Comment;
