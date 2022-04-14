import { ControleurPlateau } from "../controleur/controleur-plateau.js"
import { VuePlateau } from "../vues/vue-plateau.js"

export class Application
{
    #controleurPlateau; //Contrôleur en charge du plateau de jeu

    #vuePlateau; //Vue en charge du plateau de jeu

    constructor()
    {  
        this.#controleurPlateau = new ControleurPlateau();
        this.#vuePlateau = new VuePlateau(this.#controleurPlateau);
    }
}
//Point d'entrée de l'application : démarrage une fois tous les éléments chargés
window.addEventListener("load", () => {
    const app = new Application(); //au chargement de la page , lance une nouvelle application
})


