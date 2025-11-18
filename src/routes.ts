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

//EVENT
import { CreateEventController } from "./controllers/event/CreateEventController";
import { ListAllEventsController } from "./controllers/event/ListAllEventsController";
import { ListEventController } from "./controllers/event/ListEventController";
import { DeleteEventController } from "./controllers/event/DeleteEventController";

//SPEAKER
import { CreateSpeakerController } from "./controllers/speaker/CreateSpeakerController";
import { ListAllSpeakersController } from "./controllers/speaker/ListAllSpeakersController";
import { ListSpeakerController } from "./controllers/speaker/ListSpeakerController";
import { UpdateSpeakerController } from "./controllers/speaker/UpdateSpeakerController";
import { DeleteSpeakerController } from "./controllers/speaker/DeleteSpeakerController";

// EVENTO <-> PALESTRANTE


// INSCRIPTIONS
import { CreateInscriptionController } from "./controllers/inscription/CreateInscriptionController";
import { DeleteInscriptionController } from "./controllers/inscription/DeleteInscriptionController";
import { ListParticipantsByEventController } from "./controllers/inscription/ListParticipantsByEventController";
import { ListUserEventsController } from "./controllers/inscription/ListUserEventsController";
import { MarkPresenceController } from "./controllers/inscription/MarkPresenceController";


//CATEGORY
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { AddSpeakerToEventController } from "./controllers/event_speaker/AddSpeakerToEventController";
import { RemoveSpeakerFromEventController } from "./controllers/event_speaker/RemoveSpeakerFromEventController";
import { ListSpeakersByEventController } from "./controllers/event_speaker/ListSpeakersByEventController";


// CERTIFICATES
import { GenerateCertificateController } from "./controllers/certificate/GenerateCertificateController";
import { GenerateAllCertificatesController } from "./controllers/certificate/GenerateAllCertificatesController";
import { ValidateCertificateController } from "./controllers/certificate/ValidateCertificateController";
import { ListUserCertificatesController } from "./controllers/certificate/ListUserCertificatesController";
import { GenerateCertificatePDFController } from "./controllers/certificate/GenerateCertificatePDFController";


//PDF




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

//EVENT ROUTES
router.post('/createEvent', isAuthenticated, new CreateEventController().handle);
router.get('/listAllEvents', new ListAllEventsController().handle);
router.get('/listEvent', new ListEventController().handle);
router.delete('/deleteEvent', isAuthenticated, new DeleteEventController().handle);

//SPEAKER
router.post("/createSpeaker", isAuthenticated, new CreateSpeakerController().handle);
router.get("/listAllSpeakers", new ListAllSpeakersController().handle);
router.get("/listSpeaker", new ListSpeakerController().handle);
router.put("/updateSpeaker", isAuthenticated, new UpdateSpeakerController().handle);
router.delete("/deleteSpeaker", isAuthenticated, new DeleteSpeakerController().handle);

//EVENT SPEAKER
router.post("/event/addSpeaker", isAuthenticated, new AddSpeakerToEventController().handle);
router.delete("/event/removeSpeaker", isAuthenticated, new RemoveSpeakerFromEventController().handle);
router.get("/event/speakers", new ListSpeakersByEventController().handle);


//INSCRIPTION
router.post("/event/subscribe", isAuthenticated, new CreateInscriptionController().handle);
router.delete("/event/unsubscribe", isAuthenticated, new DeleteInscriptionController().handle);
router.get("/event/participants", isAuthenticated, new ListParticipantsByEventController().handle);
router.get("/me/events", isAuthenticated, new ListUserEventsController().handle);
router.post("/event/presence", isAuthenticated, new MarkPresenceController().handle);


// Emitir para 1 usuário
router.post("/certificate/generate", isAuthenticated, new GenerateCertificateController().handle);

// Emitir para todos presentes no evento
router.post("/certificate/generateAll", isAuthenticated, new GenerateAllCertificatesController().handle);

// Listar certificados do usuário
router.get("/me/certificates", isAuthenticated, new ListUserCertificatesController().handle);

// Validar certificado
router.get("/certificate/validate", new ValidateCertificateController().handle);

//PDF
router.post("/certificate/pdf", isAuthenticated, new GenerateCertificatePDFController().handle
);

//CATEGORIA
router.post("/createCategory", isAuthenticated, new CreateCategoryController().handle);


//UTIL
//router.get('/verify-email', new VerifyEmailController().handle);

//CARTILHA
router.post('/createCartilha', isAuthenticated, upload.fields([
    { name: "pdfFile", maxCount: 1 },
    { name: "imageFile", maxCount: 1 },
]), new CreateCartilhaController().handle);
router.get('/listAllCartilhas', new ListAllCartilhasController().handle);
router.get('/listCartilhas', new ListCartilhasController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle)