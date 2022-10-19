module.exports = (sq, type) => {
  const User = sq.define(
    "User",
    {
      email: {
        type: type.STRING(30),
        allowNull: false,
        unique: true,
      },
      nickname: {
        type: type.STRING(30),
        allowNull: false,
      },
      password: {
        type: type.STRING(100),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    });
  };
  return User;
};
