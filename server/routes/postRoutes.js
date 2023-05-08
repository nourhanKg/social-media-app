import express from "express";
import verifyToken from "../middleware/authorization.js";
import * as controllers from "../controllers/postController.js";
const router = express.Router();

router.get("/", verifyToken, controllers.getAllPosts);
router.get("/:userId/posts", verifyToken, controllers.getUserPosts);
router.patch("/:id/like", verifyToken, controllers.likeUnlikePost);
export default router;
