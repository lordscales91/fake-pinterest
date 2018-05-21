'use strict';

module.exports = (sequelize, DataTypes) => {
  var FollowRelation = sequelize.define('FollowRelation', {
    follower_id: DataTypes.INTEGER,
    followable_id: DataTypes.INTEGER,
    target_type: DataTypes.STRING
  }, { timestamps: false, underscored: true });
  FollowRelation.associate = function(models) {
    // associations can be defined here
  };
  return FollowRelation;
};