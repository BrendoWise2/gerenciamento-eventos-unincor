import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAdmin } from "./middlewares/isAdmin";

import { ListAllUsersController } from "./controllers/user/ListAllUsersController";
import { ListUserController } from "./controllers/user/ListUserController";
import { DeleteUserController } from "./controllers/user/DeleteUserController";

import { upload } from "./config/multer";
import { DetailUserController } from "./controllers/user/DetailUserController";

// EVENT
import { CreateEventController } from "./controllers/event/CreateEventController";
import { ListAllEventsController } from "./controllers/event/ListAllEventsController";
import { ListEventController } from "./controllers/event/ListEventController";
import { DeleteEventController } from "./controllers/event/DeleteEventController";

// SPEAKER
import { CreateSpeakerController } from "./controllers/speaker/CreateSpeakerController";
import { ListAllSpeakersController } from "./controllers/speaker/ListAllSpeakersController";
import { ListSpeakerController } from "./controllers/speaker/ListSpeakerController";
import { UpdateSpeakerController } from "./controllers/speaker/UpdateSpeakerController";
import { DeleteSpeakerController } from "./controllers/speaker/DeleteSpeakerController";

// EVENT SPEAKER
import { AddSpeakerToEventController } from "./controllers/event_speaker/AddSpeakerToEventController";
import { RemoveSpeakerFromEventController } from "./controllers/event_speaker/RemoveSpeakerFromEventController";
import { ListSpeakersByEventController } from "./controllers/event_speaker/ListSpeakersByEventController";

// INSCRIPTIONS
import { CreateInscriptionController } from "./controllers/inscription/CreateInscriptionController";
import { DeleteInscriptionController } from "./controllers/inscription/DeleteInscriptionController";
import { ListParticipantsByEventController } from "./controllers/inscription/ListParticipantsByEventController";
import { ListUserEventsController } from "./controllers/inscription/ListUserEventsController";
import { MarkPresenceController } from "./controllers/inscription/MarkPresenceController";

// CATEGORY
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";

// CERTIFICATES
import { GenerateCertificateController } from "./controllers/certificate/GenerateCertificateController";
import { GenerateAllCertificatesController } from "./controllers/certificate/GenerateAllCertificatesController";
import { ValidateCertificateController } from "./controllers/certificate/ValidateCertificateController";
import { ListUserCertificatesController } from "./controllers/certificate/ListUserCertificatesController";
import { GenerateCertificatePDFController } from "./controllers/certificate/GenerateCertificatePDFController";

// CARTILHA
import { CreateCartilhaController } from "./controllers/cartilha/CreateCartilhaController";
import { ListAllCartilhasController } from "./controllers/cartilha/ListAllCartilhasController";
import { ListCartilhasController } from "./controllers/cartilha/ListCartilhasController";

export const router = Router();

// ======================================
// USERS (ADMIN)
// ======================================
router.post('/createUser', isAuthenticated, isAdmin, new CreateUserController().handle);
router.get('/listAllUsers', isAuthenticated, isAdmin, new ListAllUsersController().handle);
router.delete('/deleteUser', isAuthenticated, isAdmin, new DeleteUserController().handle);

// LOGIN
router.post('/session', new AuthUserController().handle);

// Perfil próprio
router.get('/listUser', isAuthenticated, new ListUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);

// ======================================
// EVENTOS
// ======================================
router.post('/createEvent', isAuthenticated, isAdmin, new CreateEventController().handle);
router.delete('/deleteEvent', isAuthenticated, isAdmin, new DeleteEventController().handle);

router.get('/listAllEvents', new ListAllEventsController().handle);
router.get('/listEvent', new ListEventController().handle);

// ======================================
// SPEAKERS (ADMIN)
// ======================================
router.post("/createSpeaker", isAuthenticated, isAdmin, new CreateSpeakerController().handle);
router.put("/updateSpeaker", isAuthenticated, isAdmin, new UpdateSpeakerController().handle);
router.delete("/deleteSpeaker", isAuthenticated, isAdmin, new DeleteSpeakerController().handle);

// Públicos
router.get("/listAllSpeakers", new ListAllSpeakersController().handle);
router.get("/listSpeaker", new ListSpeakerController().handle);

// ======================================
// EVENT <-> SPEAKER (ADMIN)
// ======================================
router.post("/event/addSpeaker", isAuthenticated, isAdmin, new AddSpeakerToEventController().handle);
router.delete("/event/removeSpeaker", isAuthenticated, isAdmin, new RemoveSpeakerFromEventController().handle);

// Público
router.get("/event/speakers", new ListSpeakersByEventController().handle);

// ======================================
// INSCRIÇÕES (Usuário comum)
// ======================================
router.post("/event/subscribe", isAuthenticated, new CreateInscriptionController().handle);
router.delete("/event/unsubscribe", isAuthenticated, new DeleteInscriptionController().handle);
router.get("/event/participants", isAuthenticated, isAdmin, new ListParticipantsByEventController().handle);
router.get("/me/events", isAuthenticated, new ListUserEventsController().handle);
router.post("/event/presence", isAuthenticated, isAdmin, new MarkPresenceController().handle);

// ======================================
// CATEGORIAS (ADMIN)
// ======================================
router.post("/createCategory", isAuthenticated, isAdmin, new CreateCategoryController().handle);

// ======================================
// CERTIFICADOS
// ======================================
router.post("/certificate/generate", isAuthenticated, isAdmin, new GenerateCertificateController().handle);
router.post("/certificate/generateAll", isAuthenticated, isAdmin, new GenerateAllCertificatesController().handle);

router.post("/certificate/pdf", isAuthenticated, isAdmin, new GenerateCertificatePDFController().handle);

// Público
router.get("/me/certificates", isAuthenticated, new ListUserCertificatesController().handle);
router.get("/certificate/validate", new ValidateCertificateController().handle);

// ======================================
// CARTILHA (ADMIN cria, público vê)
// ======================================
router.post('/createCartilha', isAuthenticated, isAdmin, upload.fields([
    { name: "pdfFile", maxCount: 1 },
    { name: "imageFile", maxCount: 1 },
]), new CreateCartilhaController().handle);

router.get('/listAllCartilhas', new ListAllCartilhasController().handle);
router.get('/listCartilhas', new ListCartilhasController().handle);
