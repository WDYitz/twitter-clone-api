import { Router } from "express";
import { verifyJWTMiddleware } from "@/http/middlewares/verifyJWT";
import * as testController from "@/http/controllers/test-controller";
import { signupController } from "@/http/controllers/signup-controller";
import { signinController } from "@/http/controllers/signin-controller";
import { getUserController } from "@/http/controllers/get-user-controller";
import { userFollowController } from "@/http/controllers/user-follow-controller";
import { getUserTweetsController } from "@/http/controllers/get-user-tweets-controller";
import { updateUserController } from "@/http/controllers/update-user-controller";
import { checkIfTweetIsLikedByUserController } from "@/http/controllers/check-tweet-liked-by-user-controller";
import { addTweetController } from "@/http/controllers/add-tweet-controller";
import { getTweetController } from "@/http/controllers/get-tweet-controller";
import { getTweetAnswersController } from "@/http/controllers/get-tweet-answers-controller";
import { getFeedController } from "@/http/controllers/get-feed-controller";
import { getSearchController } from "@/http/controllers/get-search-controller";
import { getTrendsController } from "@/http/controllers/get-trends-controller";
import { getSuggestionsController } from "../controllers/get-suggestions-controller";

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
router.put("/user", verifyJWTMiddleware, updateUserController);
// router.put("/user/avatar");
// router.put("/user/cover");

router.get("/feed", verifyJWTMiddleware, getFeedController);
router.get("/search", verifyJWTMiddleware, getSearchController);
router.get("/trending", verifyJWTMiddleware, getTrendsController);
router.get("/suggestions", verifyJWTMiddleware, getSuggestionsController);
