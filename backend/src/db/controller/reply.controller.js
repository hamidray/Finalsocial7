const Comment = require("../model/Comment");
const Post = require("../model/Post");
const Reply = require("../model/Reply");
const User = require("../model/User");

exports.addReply = async (userId, commentId, reply) =>
  await Reply.create({
    userId,
    commentId,
    reply,
  });

exports.getAllRepliesOfComment = async (commentId) =>
  await Reply.findAll({
    where: {
      commentId,
    },
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment",
          "userId",
          "postId",
          "createdAt",
          "updatedAt",
        ],
        include: [
          {
            model: Post,
            attributes: [
              "id",
              "title",
              "description",
              "imageUrl",
              "createdAt",
              "updatedAt",
            ],
            include: {
              model: User,
              attributes: [
                "id",
                "email",
                "firstName",
                "lastName",
                "isAdmin",
                "createdAt",
                "updatedAt",
              ],
            },
          },
        ],
      },
      {
        model: User,
        attributes: [
          "id",
          "email",
          "firstName",
          "lastName",
          "isAdmin",
          "createdAt",
          "updatedAt",
        ],
      },
    ],
    attributes: ["id", "reply", "createdAt", "updatedAt"],
    order: [["updatedAt", "DESC"]],
  });
