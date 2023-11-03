import { GalleriesController } from "./galleries.controller"
import { methodNotAllowed } from "../middleware/error.handlers"
import { galleriesRouter } from "./galleries.router"

galleriesRouter
	.route("/:gallery_id/colors")
	.get(GalleriesController.listGalleryColors)
	.post(GalleriesController.createGalleryColor)
	.put(GalleriesController.updateGalleryColor)
	.all(methodNotAllowed)
