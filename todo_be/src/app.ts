import express from "express";
import cors from 'cors'
import TaskRoutes from "./modules/task/tasks.routes";
import UserRouter from "./modules/user/user.routes";
import cookieParser from "cookie-parser";


const app = express()
app.use(cors());

app.use(express.json())
app.use(cookieParser());
// app.use(
//     helmet.contentSecurityPolicy({
//         useDefaults: false, // disables default helmet CSP
//         directives: {
//             defaultSrc: ["'none'"],
//             connectSrc: ["'self'", "http://localhost:9500"], // allow localhost connections
//             scriptSrc: ["'self'"],
//             styleSrc: ["'self'"],
//             imgSrc: ["'self'"],
//         },
//     })
// );

// app.use((req, res, next) => {
//     res.setHeader(
//         "Content-Security-Policy",
//         "default-src 'none'; connect-src 'self' http://localhost:9500"
//     );
//     next();
// });


// app.get("/.well-known/appspecific/com.chrome.devtools.json", (_req, res) => {
//     res.status(204).end();
// });

app.get("/api/vinson", (req, res) => {
    res.json({
        message: "running"
    })
})
app.use("/api/task", TaskRoutes);
app.use("/api", UserRouter);

export default app

