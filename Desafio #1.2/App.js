import ControllerMenus from './src/controller/ControllerMenus.js';
import PromptSync from 'prompt-sync';
const prompt = PromptSync({ sigint: true }); // Entrada de dados

const cm = new ControllerMenus();

cm.iniciarMenu();