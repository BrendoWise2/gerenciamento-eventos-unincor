import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { ListAllUsersController } from "./controllers/user/ListAllUsersController";
import { ListUserController } from "./controllers/user/ListUserController";
import { DeleteUserController } from "./controllers/user/DeleteUserController";
import { CreateCartilhaController } from "./controllers/cartilha/CreateCartilhaController";
import { ListAllCartilhasController } from "./controllers/cartilha/ListAllCartilhasController";
import { ListCartilhasController } from "./controllers/cartilha/ListCartilhasController";
import { upload } from "./config/multer";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { VerifyEmailService } from "./services/util/VerifyEmailService";
import { VerifyEmailController } from "./controllers/util/VerifyEmailController";


export const router = Router();

router.post("/teste", (req: Request, res: Response) => {

    throw new Error("Erro ao fazer a requisicao");
});

//USER
router.post('/createUser', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/listAllUsers', isAuthenticated, new ListAllUsersController().handle);
router.get('/listUser', isAuthenticated, new ListUserController().handle);
router.delete('/deleteUser', isAuthenticated, new DeleteUserController().handle);

//UTIL
router.get('/verify-email', new VerifyEmailController().handle);

//CARTILHA
router.post('/createCartilha', isAuthenticated, upload.fields([
    { name: "pdfFile", maxCount: 1 },
    { name: "imageFile", maxCount: 1 },
]), new CreateCartilhaController().handle);
router.get('/listAllCartilhas', new ListAllCartilhasController().handle);
router.get('/listCartilhas', new ListCartilhasController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle)