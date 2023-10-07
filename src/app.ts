/**
 * Required External Modules
 */

import express from "express"
import cors from "cors"
import helmet from "helmet"
import nocache from "nocache"
import { usersRouter } from "./users/users.router"
import { companiesRouter } from "./companies/companies.router"
import { galleriesRouter } from "./galleries/galleries.router"
import { videosRouter } from "./videos/videos.router"
import * as ErrorHandlers from "./middleware/error.handlers"
// import { validateAccessToken } from "./middleware/auth0.middleware";

/**
 * App Definition
 */

export const app = express()
// const CLIENT_ORIGIN_URL: string | undefined = process.env.CLIENT_ORIGIN_URL;

/**
 * Middleware and Handlers
 */

// Middleware
app.use(express.json())
app.set("json spaces", 2)
app.use(
	helmet({
		hsts: {
			maxAge: 31536000,
		},
		contentSecurityPolicy: {
			useDefaults: false,
			directives: {
				"default-src": ["'none'"],
				"frame-ancestors": ["'none'"],
			},
		},
		frameguard: {
			action: "deny",
		},
	}),
)
app.use((req, res, next) => {
	res.contentType("application/json; charset=utf-8")
	next()
})
app.use(nocache())
app.use(
	cors(),
	// {
	//     origin: CLIENT_ORIGIN_URL,
	//     methods: ["GET"],
	//     allowedHeaders: ["Authorization", "Content-Type"],
	//     maxAge: 86400,
	// }
)

// app.use("*", validateAccessToken)

// Route handlers
app.use("/users", usersRouter)
app.use("/companies", companiesRouter)
app.use("/galleries", galleriesRouter)
app.use("/videos", videosRouter)
//Error handlers
app.use(ErrorHandlers.notFound)
app.use(ErrorHandlers.errorHandler)
