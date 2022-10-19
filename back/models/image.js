module.exports = (sq, type) => {
  const Iamage = sq.define(
    "Image",
    {
      src: {
        type: type.STRING(200),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Iamage.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Iamage;
};
