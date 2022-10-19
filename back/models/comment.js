module.exports = (sq, type) => {
  const Comment = sq.define(
    "Comment",
    {
      content: {
        type: type.TEXT,
        allowNull: false,
      },
      // userId : ,
      // postId : ,
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
