import * as testController from "@/http/controllers/test-controller";
import { signupController } from "@/http/controllers/signup-controller";
import { Router } from "express";
import { verifyJWTMiddleware } from "@/http/middlewares/verifyJWT";
import { signinController } from "@/http/controllers/signin-controller";
import { getTweetController } from "@/http/controllers/get-tweet-controller";
import { addTweetController } from "@/http/controllers/add-tweet-controller";
import { getTweetAnswersController } from "@/http/controllers/get-tweet-answers-controller";
import { checkIfTweetIsLikedByUserController } from "@/http/controllers/check-tweet-liked-by-user-controller";
import { getUserController } from "@/http/controllers/get-user-controller";
import { getUserTweetsController } from "@/http/controllers/get-user-tweets-controller";
import { userFollowController } from "@/http/controllers/user-follow-controller";

export const router = Router();

router.get("/test", testController.test);
router.get("/privatetest", verifyJWTMiddleware, testController.privateTest);

router.post("/auth/signup", signupController);
router.post("/auth/signin", signinController);

router.post("/tweet", verifyJWTMiddleware, addTweetController);
router.get("/tweet/:id", verifyJWTMiddleware, getTweetController);
router.get("/tweet/:id/answers", verifyJWTMiddleware, getTweetAnswersController);
router.post("/tweet/:id/like", verifyJWTMiddleware, checkIfTweetIsLikedByUserController);

router.get("/user/:slug", verifyJWTMiddleware, getUserController);
router.get("/user/:slug/tweets", verifyJWTMiddleware, getUserTweetsController);
router.post("/user/:slug/follow", verifyJWTMiddleware, userFollowController);
// router.put("/user");
// router.put("/user/avatar");
// router.put("/user/cover");

// router.get("/feed");
// router.get("/search");
// router.get("/trending");
// router.get("/suggestions");
