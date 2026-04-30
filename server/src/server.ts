const express = require("express");
require("dotenv").config({ path: "../.env" });
const schema = require("./../schema/schema");
const { createHandler } = require("graphql-http/lib/use/express");
const cors = require("cors");
const port = process.env.PORT || 8080;
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
import { Request, Response } from "express";

// MongoDB configurations
import { Post } from "../models/Post";

// setting up multer environments
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: (req: Request, res: Response, cb: Function) => {
        cb(null, "src/uploads");
    },
    filename: function (req: Request, file: any, cb: Function) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
            null,
            file.fieldname +
                "-" +
                uniqueSuffix +
                path.extname(file.originalname),
        );
    },
});
const upload = multer({ storage: storage });

import { authenticateTokens } from "./modules/auth";
import { connectDB } from "../config/db";
const { spawn } = require("child_process");
import {
    generateAssessment,
    generateDefintion,
    generateTranslation,
    generateSummary,
} from "./modules/ai";
import { getYoutubeTranscript } from "./modules/youtubeTranscript";
const {
    uploadImage,
    getImageFileStream,
    uploadVideo,
    uploadThumbnail,
    getThumbnailFileStream,
} = require("./modules/s3");
const app = express();
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(
    cors({
        credentials: true,
        origin: [
            process.env.NODE_ENV === "development"
                ? "http://localhost:3000"
                : "https://scriptowl.vercel.app",
            "http://localhost:8081",
        ],
    }),
);

// connect to MongoDB database
connectDB();

app.use(cookieParser());
// authenticate tokens
app.use(async (req: Request, res: Response, next: Function) => {
    authenticateTokens(req, res, next);
});
// use GraphQL api
app.use(
    "/graphql",
    createHandler({
        schema,
        context: async (req: any) => {
            return req.context;
        },
    }),
);

// posting and fetching files to s3 via rest API
app.get("/images/:key", async (req: Request, res: Response) => {
    try {
        const key = req.params.key;
        const { Body } = await getImageFileStream(key);
        Body.pipe(res);
    } catch (e) {
        res.json(e).status(400);
    }
});

// Post image to AWS S3 Bucket
app.post("/images", upload.single("image"), async (req: any, res: Response) => {
    try {
        const key = await uploadImage(req.file);
        await unlinkFile(req.file.path);
        res.send({ key }).status(200);
    } catch (e) {
        res.json(e).status(400);
    }
});

// Post video to AWS S3 Bucket
app.post("/videos", upload.single("video"), async (req: any, res: Response) => {
    try {
        const filename = req.file.filename.split(".")[0];
        // Get video data from python script
        let result: string;
        const scriptPath = `${__dirname}/uploads/extract_video_data.py`;
        const pythonScript = spawn("python", [scriptPath, filename, "upload"]);
        pythonScript.stdout.on("data", (data: Buffer) => {
            result = data.toString();
        });
        pythonScript.stderr.on("data", (data: Buffer) => {
            console.error(`stderr: ${data}`);
        });
        pythonScript.on("close", async () => {
            // upload the rest of the content to s3
            const key = await uploadVideo(req.file);
            const thumbnailKey = await uploadThumbnail(`${filename}.jpg`);
            await unlinkFile(req.file.path);
            const thumbnailPath = `${__dirname}/uploads/${filename}.jpg`;
            await unlinkFile(thumbnailPath);
            res.send({ key, result, thumbnailKey }).status(200);
        });
        pythonScript.on("error", (err: string) => {
            console.log("Error: ", err);
        });
    } catch (e) {
        res.json(e).status(400);
    }
});

app.get("/thumbnails/:key", async (req: Request, res: Response) => {
    try {
        const key = req.params.key;
        const { Body } = await getThumbnailFileStream(key);
        Body.pipe(res);
    } catch (e) {
        res.json(e).status(400);
    }
});

// Ask ChatGPT to define a word from transcript
app.post("/chatgpt/define", async (req: Request, res: Response) => {
    try {
        const reply = await generateDefintion(req.body.word);
        return res.json(reply).status(200);
    } catch (e) {
        res.json(e).status(400);
    }
});

app.post("/chatgpt/services", async (req: Request, res: Response) => {
    try {
        let reply;
        if (req.body.option === "translate") {
            reply = await generateTranslation(
                req.body.transcript,
                req.body.language,
            );
        } else if (req.body.option === "summarize") {
            reply = await generateSummary(req.body.transcript);
        } else if (req.body.option === "assess") {
            reply = await generateAssessment(req.body.transcript);
        }
        console.log("REPLY TO SEND:", reply);
        return res.status(200).json(reply);
    } catch (e) {
        console.log("Error in /chatgpt/services:", e);
        res.status(400).json(e);
    }
});

app.get("/postCount", async (req: Request, res: Response) => {
    try {
        const count = await Post.find().countDocuments();
        res.json(count).status(200);
    } catch (e) {
        res.json(e).status(400);
    }
});

const { sendEmail } = require("./modules/sendgrid");

app.post("/sendgrid", async (req: Request, res: Response) => {
    try {
        const response = await sendEmail(req, res);
    } catch (e) {
        console.log(e);
        res.json(e).status(400);
    }
});

app.post(
    "/youtube",
    upload.single("video"),
    async (req: Request, res: Response) => {
        try {
            let youtubeURL = req.body.youtubeURL;
            const downloadVideo = req.body.downloadVideo ?? false;
            let result: string = "";
            if (downloadVideo) {
                let filename = req.body.title;
                const downloadPath = `${__dirname}/uploads/download_yt_video.py`;
                const pythonYTDownload = spawn("python", [
                    downloadPath,
                    youtubeURL,
                    filename,
                ]);
                pythonYTDownload.stdout.on("data", (data: Buffer) => {
                    result = data.toString();
                });
                pythonYTDownload.stderr.on("data", (data: Buffer) => {
                    console.error(`stderr: ${data}`);
                });
                const file = {
                    path: `${__dirname}/uploads/${filename}.mp4`,
                    filename: `${filename}.mp4`,
                };
                pythonYTDownload.on("close", async () => {
                    // upload the rest of the content to s3
                    const key = await uploadVideo(file);
                    const thumbnailKey = await uploadThumbnail(
                        `${filename}.jpg`,
                    );
                    await unlinkFile(file.path);
                    const thumbnailPath = `${__dirname}/uploads/${filename}.jpg`;
                    await unlinkFile(thumbnailPath);
                    res.send({ key, result, thumbnailKey }).status(200);
                });
                pythonYTDownload.on("error", (err: string) => {
                    console.log("Error: ", err);
                });
            } else {
                // Fetch transcript directly via Node.js (no Python needed)
                try {
                    result = await getYoutubeTranscript(youtubeURL);
                    if (!result) {
                        return res.status(500).json({
                            error: "Failed to fetch transcript",
                            details: "No transcript data returned",
                        });
                    }
                    res.status(200).json({ result });
                } catch (transcriptErr: any) {
                    console.error("Transcript fetch error:", transcriptErr.message);
                    return res.status(500).json({
                        error: "Failed to fetch transcript",
                        details: transcriptErr.message,
                    });
                }
            }
        } catch (e) {
            console.error("Error in /youtube endpoint:", e);
            res.status(500).json({ error: "Internal server error" });
        }
    },
);

const http = require("http");
const server = http.createServer(app);
// Socket.io for real-time chat
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const onlineUsers = new Map(); // userId -> socketId
io.on("connection", (socket: any) => {
    socket.on("user:online", (userId: number) => {
        onlineUsers.set(userId, socket.id);
        socket.broadcast.emit("user:status", { userId, status: "online" });
        // send the NEW user a snapshot of everyone already online
        const currentOnlineUsers = Array.from(onlineUsers.keys());
        socket.emit("users:snapshot", currentOnlineUsers);
    });
    socket.on("join", (room: string, username: string) => {
        socket.join(room);
    });
    socket.on("disconnect", () => {
        for (const [userId, socketId] of onlineUsers.entries()) {
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
                socket.broadcast.emit("user:status", {
                    userId,
                    status: "offline",
                });
                break;
            }
        }
    });
    socket.on(
        "message",
        (receiverId: string, messageObj: string, room: string) => {
            try {
                socket.broadcast.to(room).emit("message", messageObj);
                io.to(onlineUsers.get(receiverId)).emit("notifyUnread", room);
            } catch (e) {
                console.log("Error broadcasting message: ", e);
            }
        },
    );
    socket.on(
        "chat:read",
        ({
            roomId,
            userId,
            readAt,
        }: {
            roomId: string;
            userId: string;
            readAt: Date;
        }) => {
            socket
                .to(roomId)
                .emit("chat:read:update", { roomId, userId, readAt });
        },
    );
});

const authRouter = require("./modules/oauth");
const requestRouter = require("./modules/request");

// OAuth
app.use("/oauth", authRouter);
app.use("/request", requestRouter);

server.listen(port, () => {
    console.log(`PORT ${port} is running.`);
});
