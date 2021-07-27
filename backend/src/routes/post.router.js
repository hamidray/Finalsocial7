const { Router } = require("express");
const {
  addComment,
  getAllCommentsOfPost,
} = require("../db/controller/comment.controller");
const {
  addPost,
  getAllPosts,
  deletePostById,
  deletePostByIdAndUserId,
} = require("../db/controller/post.controller");
const {
  react,
  getAllReactionsOfPost,
} = require("../db/controller/reaction.controller");
const {
  addReply,
  getAllRepliesOfComment,
} = require("../db/controller/reply.controller");
const handleUserAuthorization = require("../middleware/handleUserAuthorization");
const postImageUploadHandler = require("../middleware/postImageUploadHandler");

const postRouter = Router();

// POST ROUTES

postRouter.post(
  "/",
  handleUserAuthorization(),
  postImageUploadHandler(),
  async (req, res) => {
    try {
      const {
        body: { title, description },
        user,
        file,
      } = req;
      const { id } = user;
      let imageUrl = "";
      if (file?.filename)
        imageUrl = `${process.env.BASE_URL}/images/${file?.filename}`;
      if (!title || !description) {
        return res
          .status(400)
          .json({ message: "Missing mandatory parameters" })
          .end();
      }
      const post = await addPost(id, title, description, imageUrl);
      delete user.password;
      return res.json({ ...post.get(), user }).end();
    } catch (error) {
      return res.status(400).json({ message: "Invalid request", error }).end();
    }
  }
);

postRouter.delete("/:postId", handleUserAuthorization(), async (req, res) => {
  try {
    const {
      user: { id, isAdmin },
      params: { postId },
    } = req;
    const deleted = isAdmin
      ? await deletePostById(parseInt(postId))
      : await deletePostByIdAndUserId(parseInt(postId), id);
    if (deleted) {
      return res.json({ message: "Post deleted", deleted }).end();
    } else {
      return res
        .status(400)
        .json({ message: "Deletion not allowed or already deleted" })
        .end();
    }
  } catch (error) {
    return res.status(400).json({ message: "Invalid request", error }).end();
  }
});

postRouter.get("/", handleUserAuthorization(), async (req, res) => {
  try {
    const allPosts = await getAllPosts();
    return res.json(allPosts).end();
  } catch (error) {
    return res.status(400).json({ message: "Invalid request", error }).end();
  }
});

// REACTION ROUTES

postRouter.post(
  "/:postId/reaction",
  handleUserAuthorization(),
  async (req, res) => {
    try {
      const {
        body: { like },
        params: { postId },
        user,
      } = req;
      const { id } = user;
      let reaction = await react(id, parseInt(postId), like ? 1 : 0);
      if (reaction[0]) {
        reaction = reaction[0];
      }
      if (reaction[1]) {
        reaction = reaction[1];
      }
      delete user.password;
      return res
        .json({
          ...reaction.get(),
          user,
        })
        .end();
    } catch (error) {
      return res.status(400).json({ message: "Invalid request", error }).end();
    }
  }
);

postRouter.get(
  "/:postId/reaction/all",
  handleUserAuthorization(),
  async (req, res) => {
    try {
      const {
        params: { postId },
      } = req;
      const reactions = await getAllReactionsOfPost(parseInt(postId));
      let likes = 0;
      let unLikes = 0;
      reactions.forEach((reactions, i, values) => {
        !!reactions.getDataValue("like") ? likes++ : unLikes++;
      });
      return res.json({ likes, unLikes, reactions }).end();
    } catch (error) {
      return res.status(400).json({ message: "Invalid request", error }).end();
    }
  }
);

// COMMENTS ROUTES

postRouter.post(
  "/:postId/comment",
  handleUserAuthorization(),
  async (req, res) => {
    try {
      const {
        body: { comment },
        user,
        params: { postId },
      } = req;
      const { id } = user;
      const newComment = await addComment(id, parseInt(postId), comment);
      delete user.password;
      return res.json({ ...newComment.get(), user }).end();
    } catch (error) {
      return res.status(400).json({ message: "Invalid request", error }).end();
    }
  }
);

postRouter.get(
  "/:postId/comment/all",
  handleUserAuthorization(),
  async (req, res) => {
    try {
      const {
        params: { postId },
      } = req;
      const comments = await getAllCommentsOfPost(parseInt(postId));
      return res.json(comments).end();
    } catch (error) {
      return res.status(400).json({ message: "Invalid request", error }).end();
    }
  }
);

// REPLY ROUTES

postRouter.post(
  "/comment/:commentId/reply",
  handleUserAuthorization(),
  async (req, res) => {
    try {
      const {
        body: { reply },
        user,
        params: { commentId },
      } = req;
      const { id } = user;
      const newReply = await addReply(id, parseInt(commentId), reply);
      delete user.password;
      return res.json({ ...newReply.get(), user }).end();
    } catch (error) {
      return res.status(400).json({ message: "Invalid request", error }).end();
    }
  }
);

postRouter.get(
  "/comment/:commentId/reply/all",
  handleUserAuthorization(),
  async (req, res) => {
    try {
      const {
        params: { commentId },
      } = req;
      const relies = await getAllRepliesOfComment(parseInt(commentId));
      return res.json(relies).end();
    } catch (error) {
      return res.status(400).json({ message: "Invalid request", error }).end();
    }
  }
);

module.exports = postRouter;
