import express from "express";
import verifyToken from "../middleware/authorization.js";
import * as controllers from "../controllers/userController.js";
const router = express.Router();

router.get("/:id", verifyToken, controllers.getUserById);
router.get("/:id/friends", verifyToken, controllers.getUserFriends);
router.patch("/:id/:friendId", verifyToken, controllers.addRemoveFriends);

export default router;
