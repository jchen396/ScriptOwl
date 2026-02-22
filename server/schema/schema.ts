import CryptoJS from "crypto-js";
import mongoose from "mongoose";

// Mongoose models
import { User } from "../models/User";
import { Post } from "../models/Post";
import { Chat } from "../models/Chat";
import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
    GraphQLError,
    GraphQLBoolean,
    GraphQLFloat,
} from "graphql";
import { createTokens } from "../src/modules/auth";

// set up sendgrid for e-mail verifications
import sendgrid from "@sendgrid/mail";
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const DateType = new GraphQLObjectType({
    name: "Date",
    fields: () => ({
        date: {
            type: GraphQLString,
            resolve: (parent, __) => {
                return parent;
            },
        },
    }),
});
// Watch History Type
const WatchedPostType = new GraphQLObjectType({
    name: "WatchedPost",
    fields: () => ({
        postId: { type: GraphQLID },
        createdAt: {
            type: DateType,
        },
    }),
});

const FollowPayloadData = new GraphQLObjectType({
    name: "FollowPayloadData",
    fields: {
        userId: { type: GraphQLID },
        username: { type: GraphQLString },
    },
});
// User Type
const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        usernameLower: { type: GraphQLString },
        password: { type: GraphQLID },
        email: { type: GraphQLID },
        emailLower: { type: GraphQLString },
        points: { type: GraphQLInt },
        followers: { type: new GraphQLList(UserType) },
        following: { type: new GraphQLList(UserType) },
        friends: { type: new GraphQLList(UserType) },
        avatarKey: { type: GraphQLString },
        likedCommentsIds: { type: new GraphQLList(GraphQLID) },
        dislikedCommentsIds: { type: new GraphQLList(GraphQLID) },
        likedPostsIds: { type: new GraphQLList(GraphQLID) },
        dislikedPostsIds: { type: new GraphQLList(GraphQLID) },
        uploadedPostIds: { type: new GraphQLList(GraphQLID) },
        watchHistory: { type: new GraphQLList(WatchedPostType) },
        isVerified: { type: GraphQLBoolean },
        verificationCode: { type: GraphQLInt },
        createdAt: {
            type: DateType,
        },
    }),
});
// Comment Type
const CommentType = new GraphQLObjectType({
    name: "Comment",
    fields: () => ({
        id: { type: GraphQLID },
        commenter: {
            type: UserType,
            resolve(parent, __) {
                return User.findById(parent.commenter);
            },
        },
        comment: { type: GraphQLString },
        timestamp: { type: GraphQLString },
        likes: { type: GraphQLInt },
        dislikes: { type: GraphQLInt },
        createdAt: {
            type: DateType,
        },
    }),
});
// Post Type
const PostType = new GraphQLObjectType({
    name: "Post",
    fields: () => ({
        id: { type: GraphQLID },
        videoKey: { type: GraphQLID },
        description: { type: GraphQLString },
        title: { type: GraphQLString },
        category: { type: GraphQLString },
        likes: { type: GraphQLInt },
        dislikes: { type: GraphQLInt },
        views: { type: GraphQLInt },
        comments: { type: new GraphQLList(CommentType) },
        transcript: { type: GraphQLString },
        duration: { type: GraphQLInt },
        thumbnail: { type: GraphQLID },
        createdAt: {
            type: DateType,
        },
        publisher: {
            type: UserType,
            resolve(parent, __) {
                return User.findById(parent.publisher);
            },
        },
    }),
});
const ChatMessageType = new GraphQLObjectType({
    name: "ChatMessage",
    fields: () => ({
        id: { type: GraphQLID },
        sender: {
            type: GraphQLString,
        },
        receiver: {
            type: GraphQLString,
        },
        content: { type: GraphQLString },
        time: { type: GraphQLFloat },
        avatarKey: { type: GraphQLString },
        createdAt: {
            type: DateType,
        },
    }),
});
const ChatType = new GraphQLObjectType({
    name: "Chat",
    fields: () => ({
        id: { type: GraphQLID },
        roomId: { type: GraphQLString },
        messages: { type: new GraphQLList(ChatMessageType) },
    }),
});
// Follow Data Type
const FollowDataType = new GraphQLObjectType({
    name: "FollowData",
    fields: {
        following: { type: new GraphQLList(FollowPayloadData) },
        followers: { type: new GraphQLList(FollowPayloadData) },
        friends: { type: new GraphQLList(FollowPayloadData) },
    },
});
// Queries
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        // Return all posts in db
        posts: {
            type: new GraphQLList(PostType),
            args: { page: { type: GraphQLInt } },
            resolve(_, args) {
                // limit 20
                const limit = 20;
                return Post.find()
                    .limit(limit)
                    .skip((args.page - 1) * limit);
            },
        },
        // Return a post by post id
        post: {
            type: PostType,
            args: { id: { type: GraphQLID } },
            resolve(_, args) {
                return Post.findById(args.id);
            },
        },
        // Return all users in db
        users: {
            type: new GraphQLList(UserType),
            resolve(_, args) {
                return User.find();
            },
        },
        // Return user by user id
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(_, args) {
                return User.findById(args.id);
            },
        },
        userPosts: {
            type: new GraphQLList(PostType),
            args: { postIds: { type: new GraphQLList(GraphQLString) } },
            async resolve(_, args) {
                const postObjIds = args.postIds?.map((postId) => {
                    return new mongoose.Types.ObjectId(postId);
                });
                const post = await Post.find({ _id: { $in: postObjIds } });
                return post;
            },
        },
        userByUsername: {
            type: UserType,
            args: { username: { type: GraphQLString } },
            resolve(_, args) {
                const user = User.findOne({ username: args.username });
                return user;
            },
        },
        userByEmail: {
            type: UserType,
            args: { email: { type: GraphQLString } },
            resolve(_, args) {
                const user = User.findOne({ email: args.email });
                return user;
            },
        },
        avatarKeysById: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
            },
            async resolve(_, args) {
                try {
                    return await User.findById(args.id).populate([
                        { path: "following", select: "id username avatarKey" },
                        { path: "followers", select: "id username avatarKey" },
                        { path: "friends", select: "id username avatarKey" },
                    ]);
                } catch (err) {
                    console.error("Error fetching avatar keys:", err);
                }
            },
        },
        // Check token data stored in cookies
        checkTokens: {
            type: UserType,
            resolve(_, __, { res }) {
                if (!res.req.user_id) {
                    return null;
                }
                return User.findById(res.req.user_id);
            },
        },
        // Sign user out by remmoving cookies tokens
        signOutUser: {
            type: UserType,
            async resolve(_, __, { res }) {
                res.clearCookie("accessToken");
                res.clearCookie("refreshToken");
            },
        },
        // Log in by username
        logInUser: {
            type: UserType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(_, args, { res }) {
                return User.findOne({
                    username: args.username,
                }).then((user: any) => {
                    try {
                        if (user === null) {
                            throw new GraphQLError("User does not exist.");
                        }
                        const hashedPassword = CryptoJS.AES.decrypt(
                            user.password,
                            process.env.PASS_SEC,
                        );
                        const originalPassword = hashedPassword.toString(
                            CryptoJS.enc.Utf8,
                        );
                        if (originalPassword === args.password) {
                            const { accessToken, refreshToken } =
                                createTokens(user);
                            res.cookie("accessToken", accessToken, {
                                httpOnly: true,
                                sameSite: "None",
                                secure: true,
                                maxAge: 15 * 60 * 1000,
                            });
                            res.cookie("refreshToken", refreshToken, {
                                httpOnly: true,
                                sameSite: "None",
                                secure: true,
                                maxAge: 5 * 24 * 60 * 60 * 1000,
                            });
                            return user;
                        } else {
                            throw new GraphQLError(
                                "Username and password do not match.",
                            );
                        }
                    } catch (err) {
                        return err;
                    }
                });
            },
        },
        chatByRoomId: {
            type: ChatType,
            args: {
                roomId: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(_, args) {
                try {
                    const chat = await Chat.findOne({ roomId: args.roomId });
                    return chat;
                } catch (err) {
                    console.error("Error fetching chat messages:", err);
                }
            },
        },
    },
});

//Mutations
const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        // Create a user
        addUser: {
            type: UserType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLID) },
                email: { type: new GraphQLNonNull(GraphQLID) },
                picture: { type: GraphQLString },
                emailVerified: { type: GraphQLBoolean },
            },
            resolve(_, args) {
                return Promise.all([
                    User.findOne({
                        usernameLower: args.username.toLowerCase(),
                    }),
                    User.findOne({ emailLower: args.email.toLowerCase() }),
                ])
                    .then(async (res) => {
                        if (res[0]) {
                            throw new GraphQLError(
                                "Username is already taken.",
                            );
                        } else if (res[1]) {
                            throw new GraphQLError("Email is already taken.");
                        } else {
                            const encryptedPassword = CryptoJS.AES.encrypt(
                                args.password,
                                process.env.PASS_SEC,
                            ).toString();
                            const verificationCode = Math.floor(
                                100000 + Math.random() * 900000,
                            );
                            const user = new User({
                                username: args.username,
                                usernameLower: args.username.toLowerCase(),
                                password: encryptedPassword,
                                email: args.email,
                                emailLower: args.email.toLowerCase(),
                                points: 0,
                                followers: [],
                                following: [],
                                friends: [],
                                avatarKey: `${
                                    args.picture
                                        ? args.picture
                                        : "image-1687139427335-802564121.png"
                                }`,
                                likedCommentsIds: [],
                                dislikedCommentsIds: [],
                                likedPostsIds: [],
                                dislikedPostsIds: [],
                                watchHistory: [],
                                isVerified: args.emailVerified,
                                verificationCode,
                            });
                            await sendgrid.send({
                                to: `${args.email}`, // Your email where you'll receive emails
                                from: "support@jackiedev.com", // your website email address here
                                subject: `ScriptOwl Account Sign-Up Verification Code`,
                                html: `<div>
                <h2>Your ScriptOwl verification code is: </h2>
                <br/>
                <h3>${verificationCode}</h3>
            </div>`,
                            });
                            user.save();
                            const { password, ...others } = user;
                            return { ...others };
                        }
                    })
                    .catch((err) => {
                        return err;
                    });
            },
        },
        // Remove user by ID
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(_, args) {
                return User.findByIdAndDelete(args.id);
            },
        },
        verifyUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(_, args) {
                const user = await User.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            isVerified: true,
                        },
                    },
                    { new: true },
                );
                return user;
            },
        },
        resendCode: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
                email: {
                    type: GraphQLID,
                },
            },
            async resolve(_, args) {
                const verificationCode = Math.floor(
                    100000 + Math.random() * 900000,
                );
                const user = await User.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            verificationCode,
                        },
                    },
                    { new: true },
                );
                await sendgrid.send({
                    to: `${args.email}`, // Your email where you'll receive emails
                    from: "support@jackiedev.com", // your website email address here
                    subject: `vod_app Account Sign-Up Verification Code`,
                    html: `<div>
                <h2>Your vod_app verification code is: </h2>
                <br/>
                <h3>${verificationCode}</h3>
            </div>`,
                });
                return user;
            },
        },
        // Add a post
        addPost: {
            type: UserType,
            args: {
                videoKey: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString },
                category: { type: GraphQLString },
                publisher: { type: new GraphQLNonNull(GraphQLID) },
                transcript: { type: GraphQLString },
                duration: { type: GraphQLInt },
                thumbnail: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(_, args) {
                const post = new Post({
                    videoKey: args.videoKey,
                    title: args.title,
                    description: args.description,
                    publisher: args.publisher,
                    category: args.category,
                    transcript: args.transcript ? args.transcript : "",
                    duration: args.duration,
                    thumbnail: args.thumbnail,
                    likes: 0,
                    dislikes: 0,
                    views: 0,
                });
                const user = await User.findByIdAndUpdate(
                    args.publisher,
                    {
                        $push: {
                            uploadedPostIds: post._id.toString(),
                        },
                        $inc: {
                            points: 10,
                        },
                    },
                    { new: true },
                );
                post.save();
                return user;
            },
        },
        deletePost: {
            type: PostType,
            args: {
                publisherId: { type: new GraphQLNonNull(GraphQLID) },
                postId: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(_, args) {
                const [user, __] = await Promise.all([
                    User.findByIdAndUpdate(args.publisherId, {
                        $pull: { uploadedPostIds: args.postId },
                    }),
                    Post.findByIdAndDelete(args.postId),
                ]);
                return user;
            },
        },
        // Comment a post
        commentPost: {
            type: PostType,
            args: {
                postId: { type: new GraphQLNonNull(GraphQLID) },
                publisherId: { type: new GraphQLNonNull(GraphQLID) },
                commenter: { type: new GraphQLNonNull(GraphQLID) },
                comment: { type: new GraphQLNonNull(GraphQLString) },
                timestamp: { type: GraphQLString },
            },
            async resolve(_, args) {
                await Promise.all([
                    Post.findByIdAndUpdate(args.postId, {
                        $push: {
                            comments: {
                                id: new mongoose.Types.ObjectId(),
                                commenter: args.commenter,
                                comment: args.comment,
                                timestamp: args.timestamp,
                                likes: 0,
                                dislikes: 0,
                                createdAt: new Date(),
                            },
                        },
                    }),
                    User.findByIdAndUpdate(args.commenter, {
                        $inc: { points: 5 },
                    }),
                    User.findByIdAndUpdate(args.publisherId, {
                        $inc: { points: 5 },
                    }),
                ]);
            },
        },
        // Delete a comment
        deleteComment: {
            type: PostType,
            args: {
                commentId: { type: new GraphQLNonNull(GraphQLID) },
                postId: { type: new GraphQLNonNull(GraphQLID) },
                publisherId: { type: new GraphQLNonNull(GraphQLID) },
                commenter: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(_, args) {
                const objId = new mongoose.Types.ObjectId(args.commentId);
                await Promise.all([
                    Post.findByIdAndUpdate(args.postId, {
                        $pull: {
                            comments: { id: objId },
                        },
                    }),
                    User.findByIdAndUpdate(args.commenter, {
                        $inc: { points: -5 },
                    }),
                    User.findByIdAndUpdate(args.publisherId, {
                        $inc: { points: -5 },
                    }),
                ]);
            },
        },
        // Increase like count when pressed thumbs up button on post
        likePost: {
            type: PostType,
            args: {
                postId: { type: new GraphQLNonNull(GraphQLID) },
                userId: { type: new GraphQLNonNull(GraphQLID) },
                publisherId: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(_, args) {
                await Promise.all([
                    Post.findByIdAndUpdate(
                        args.postId,

                        {
                            $inc: { likes: 1 },
                        },
                    ),
                    User.findByIdAndUpdate(args.userId, {
                        $push: { likedPostsIds: args.postId },
                    }),
                    User.findByIdAndUpdate(args.publisherId, {
                        $inc: { points: 3 },
                    }),
                ]);
            },
        },
        // Decrease like count when pressed thumbs up button on post that was already liked
        unlikePost: {
            type: PostType,
            args: {
                postId: { type: new GraphQLNonNull(GraphQLID) },
                userId: { type: new GraphQLNonNull(GraphQLID) },
                publisherId: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(_, args) {
                await Promise.all([
                    Post.findByIdAndUpdate(args.postId, {
                        $inc: { likes: -1 },
                    }),
                    User.findByIdAndUpdate(args.userId, {
                        $pull: { likedPostsIds: args.postId },
                    }),
                    User.findByIdAndUpdate(args.publisherId, {
                        $inc: { points: -3 },
                    }),
                ]);
            },
        },
        // Increase dislike count when pressed thumbs up button on post
        dislikePost: {
            type: PostType,
            args: {
                postId: { type: new GraphQLNonNull(GraphQLID) },
                userId: { type: new GraphQLNonNull(GraphQLID) },
                publisherId: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(_, args) {
                await Promise.all([
                    Post.findByIdAndUpdate(args.postId, {
                        $inc: { dislikes: 1 },
                    }),
                    User.findByIdAndUpdate(args.userId, {
                        $push: { dislikedPostsIds: args.postId },
                    }),
                    User.findByIdAndUpdate(args.publisherId, {
                        $inc: { points: -3 },
                    }),
                ]);
            },
        },
        // Decrease dislike count when pressed thumbs up button on post that was already disliked
        undislikePost: {
            type: PostType,
            args: {
                postId: { type: new GraphQLNonNull(GraphQLID) },
                userId: { type: new GraphQLNonNull(GraphQLID) },
                publisherId: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(_, args) {
                await Promise.all([
                    Post.findByIdAndUpdate(args.postId, {
                        $inc: { dislikes: -1 },
                    }),
                    User.findByIdAndUpdate(args.userId, {
                        $pull: { dislikedPostsIds: args.postId },
                    }),
                    User.findByIdAndUpdate(args.publisherId, {
                        $inc: { points: 3 },
                    }),
                ]);
            },
        },
        // Increase like count when pressed thumbs up button on commment
        likeComment: {
            type: PostType,
            args: {
                postId: { type: new GraphQLNonNull(GraphQLID) },
                userId: { type: new GraphQLNonNull(GraphQLID) },
                commentId: { type: new GraphQLNonNull(GraphQLID) },
                commenterId: {
                    type: new GraphQLNonNull(GraphQLID),
                },
            },
            async resolve(_, args) {
                const objId = new mongoose.Types.ObjectId(args.commentId);
                await Promise.all([
                    Post.findOneAndUpdate(
                        {
                            _id: args.postId,
                            "comments.id": objId,
                        },
                        {
                            $inc: { "comments.$.likes": 1 },
                        },
                    ),
                    User.findByIdAndUpdate(args.userId, {
                        $push: { likedCommentsIds: args.commentId },
                    }),
                    User.findByIdAndUpdate(args.commenterId, {
                        $inc: { points: 2 },
                    }),
                ]);
            },
        },
        // Decrease like count when pressed thumbs up button on commment that was already liked
        unlikeComment: {
            type: PostType,
            args: {
                postId: { type: new GraphQLNonNull(GraphQLID) },
                userId: { type: new GraphQLNonNull(GraphQLID) },
                commentId: { type: new GraphQLNonNull(GraphQLID) },
                commenterId: {
                    type: new GraphQLNonNull(GraphQLID),
                },
            },
            async resolve(_, args) {
                const objId = new mongoose.Types.ObjectId(args.commentId);
                await Promise.all([
                    Post.findOneAndUpdate(
                        {
                            _id: args.postId,
                            "comments.id": objId,
                        },
                        {
                            $inc: { "comments.$.likes": -1 },
                        },
                    ),
                    User.findByIdAndUpdate(args.userId, {
                        $pull: { likedCommentsIds: args.commentId },
                    }),
                    User.findByIdAndUpdate(args.commenterId, {
                        $inc: { points: -2 },
                    }),
                ]);
            },
        },
        // Increase dislike count when pressed thumbs up button on commment
        dislikeComment: {
            type: PostType,
            args: {
                postId: { type: new GraphQLNonNull(GraphQLID) },
                userId: { type: new GraphQLNonNull(GraphQLID) },
                commentId: { type: new GraphQLNonNull(GraphQLID) },
                commenterId: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(_, args) {
                const objId = new mongoose.Types.ObjectId(args.commentId);
                await Promise.all([
                    Post.findOneAndUpdate(
                        {
                            _id: args.postId,
                            "comments.id": objId,
                        },
                        {
                            $inc: { "comments.$.dislikes": 1 },
                        },
                    ),
                    User.findByIdAndUpdate(args.userId, {
                        $push: { dislikedCommentsIds: args.commentId },
                    }),
                    User.findByIdAndUpdate(args.commenterId, {
                        $inc: { points: -2 },
                    }),
                ]);
            },
        },
        // Decrease dislike count when pressed thumbs up button on commment that was already disliked
        undislikeComment: {
            type: PostType,
            args: {
                postId: { type: new GraphQLNonNull(GraphQLID) },
                userId: { type: new GraphQLNonNull(GraphQLID) },
                commentId: { type: new GraphQLNonNull(GraphQLID) },
                commenterId: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(_, args) {
                const objId = new mongoose.Types.ObjectId(args.commentId);
                await Promise.all([
                    Post.findOneAndUpdate(
                        {
                            _id: args.postId,
                            "comments.id": objId,
                        },
                        {
                            $inc: { "comments.$.dislikes": -1 },
                        },
                    ),
                    User.findByIdAndUpdate(args.userId, {
                        $pull: { dislikedCommentsIds: args.commentId },
                    }),
                    User.findByIdAndUpdate(args.commenterId, {
                        $inc: { points: 2 },
                    }),
                ]);
            },
        },
        // Increase view count of post
        incrementViewCount: {
            type: PostType,
            args: {
                postId: { type: new GraphQLNonNull(GraphQLID) },
                views: { type: new GraphQLNonNull(GraphQLInt) },
                publisherId: { type: GraphQLID },
            },
            async resolve(_, args) {
                const [post, __] = await Promise.all([
                    Post.findByIdAndUpdate(args.postId, {
                        $set: {
                            views: args.views,
                        },
                    }),
                    args.publisherId
                        ? User.findByIdAndUpdate(args.publisherId, {
                              inc: { points: 1 },
                          })
                        : null,
                ]);
                return post;
            },
        },
        // Add video to watch history
        addWatchHistory: {
            type: UserType,
            args: {
                postId: { type: new GraphQLNonNull(GraphQLID) },
                userId: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(_, args) {
                await User.findByIdAndUpdate(args.userId, {
                    $addToSet: {
                        watchHistory: {
                            postId: args.postId,
                            createdAt: new Date(),
                        },
                    },
                });
            },
        },
        // Increase following count of user and follower count of publisher
        followUser: {
            type: UserType,
            args: {
                userId: { type: new GraphQLNonNull(GraphQLID) },
                username: { type: GraphQLString },
                publisherId: { type: new GraphQLNonNull(GraphQLID) },
                publisherName: { type: GraphQLString },
            },
            async resolve(_, args) {
                try {
                    await Promise.all([
                        User.findByIdAndUpdate(args.userId, {
                            $addToSet: {
                                following: args.publisherId,
                            },
                        }),
                        User.findByIdAndUpdate(args.publisherId, {
                            $addToSet: {
                                followers: args.userId,
                            },
                        }),
                    ]);
                } catch (err) {
                    console.error("Follow user failed:", err);
                }
                //Check if the current and target users are mutuals
                const [userFollowsPublisher, publisherFollowsUser] =
                    await Promise.all([
                        User.exists({
                            _id: args.userId,
                            following: args.publisherId,
                        }),
                        User.exists({
                            _id: args.publisherId,
                            followers: args.userId,
                        }),
                    ]);

                const areMutual =
                    !!userFollowsPublisher && !!publisherFollowsUser;
                // Add each other to their friends list if mutual conditions are met
                if (areMutual) {
                    await Promise.all([
                        User.findByIdAndUpdate(args.userId, {
                            $addToSet: {
                                friends: args.publisherId,
                            },
                        }),
                        User.findByIdAndUpdate(args.publisherId, {
                            $addToSet: {
                                friends: args.userId,
                            },
                        }),
                    ]);
                }
            },
        },
        // Decrease following count of user and follower count of publisher
        unfollowUser: {
            type: UserType,
            args: {
                userId: { type: new GraphQLNonNull(GraphQLID) },
                username: { type: GraphQLString },
                publisherId: { type: new GraphQLNonNull(GraphQLID) },
                publisherName: { type: GraphQLString },
            },
            async resolve(_, args) {
                try {
                    await Promise.all([
                        User.findByIdAndUpdate(args.userId, {
                            $pull: {
                                following: args.publisherId,
                            },
                        }),
                        User.findByIdAndUpdate(args.publisherId, {
                            $pull: {
                                followers: args.userId,
                            },
                        }),
                    ]);
                } catch (err) {
                    console.error("Unfollow user failed:", err);
                }
                //Check if the current and target users are mutuals
                const [userFollowsPublisher, publisherFollowsUser] =
                    await Promise.all([
                        User.exists({
                            _id: args.userId,
                            following: args.publisherId,
                        }),
                        User.exists({
                            _id: args.publisherId,
                            followers: args.userId,
                        }),
                    ]);

                const areMutual =
                    !!userFollowsPublisher && !!publisherFollowsUser;
                // // Remove each other to their friends list if mutual conditions are met
                if (!areMutual) {
                    try {
                        await Promise.all([
                            User.findByIdAndUpdate(args.userId, {
                                $pull: {
                                    friends: args.publisherId,
                                },
                            }),
                            User.findByIdAndUpdate(args.publisherId, {
                                $pull: {
                                    friends: args.userId,
                                },
                            }),
                        ]);
                    } catch (err) {
                        console.error("Mutual friend update failed:", err);
                    }
                }
            },
        },

        // Remove post by ID
        updateUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                avatarKey: { type: GraphQLString },
                password: { type: GraphQLID },
                username: { type: GraphQLString },
            },
            async resolve(_, args) {
                let encryptedPassword;
                if (args.password) {
                    encryptedPassword = CryptoJS.AES.encrypt(
                        args.password,
                        process.env.PASS_SEC,
                    ).toString();
                }
                return await User.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            avatarKey: args.avatarKey,
                            password: encryptedPassword,
                            username: args.username,
                        },
                    },
                    { new: true },
                );
            },
        },
        // Update a post
        updatePost: {
            type: PostType,
            args: {
                publisherId: { type: new GraphQLNonNull(GraphQLID) },
                postId: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                category: { type: GraphQLString },
            },
            async resolve(_, args) {
                const post = await Post.findByIdAndUpdate(
                    args.postId,
                    {
                        $set: {
                            title: args.title,
                            description: args.description,
                            category: args.category,
                        },
                    },
                    { new: true },
                );
                return post;
            },
        },
        messageFriend: {
            type: ChatType,
            args: {
                roomId: { type: new GraphQLNonNull(GraphQLID) },
                senderUsername: { type: new GraphQLNonNull(GraphQLString) },
                receiverUsername: { type: new GraphQLNonNull(GraphQLString) },
                content: { type: new GraphQLNonNull(GraphQLString) },
                time: { type: new GraphQLNonNull(GraphQLFloat) },
                avatarKey: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(_, args) {
                await Promise.all([
                    Chat.findOneAndUpdate(
                        { roomId: args.roomId },
                        {
                            $push: {
                                messages: {
                                    id: new mongoose.Types.ObjectId(),
                                    sender: args.senderUsername,
                                    receiver: args.receiverUsername,
                                    content: args.content,
                                    time: args.time,
                                    avatarKey: args.avatarKey,
                                    createdAt: new Date(),
                                },
                            },
                        },
                        { upsert: true, new: true },
                    ),
                ]);
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
});
