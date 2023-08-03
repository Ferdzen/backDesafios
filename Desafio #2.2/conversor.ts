import ConversorModel from "./src/model/ConversorModel";
import ConversorController from "./src/controller/ConversorController";
import ConversorView from "./src/view/ConversorView";

/**
 * Cria os objetos model e view e passa como instância para o objeto controller.
 */
const conversorModel = new ConversorModel();
const conversorView = new ConversorView();
const conversorController = new ConversorController(
  conversorModel,
  conversorView
);

/**
 * Inicia execução do programa.
 */
conversorController.iniciaConversao();