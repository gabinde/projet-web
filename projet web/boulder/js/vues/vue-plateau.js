import { Observateur } from "../patterns/observateur.js";


export class VuePlateau extends Observateur
{
    //controleur en charge du plateau de jeu
    #controleurPlateau;


    /**
     * Constructeur
     * @param {ControleurPlateau} ControleurPlateau Controleur en charge du plateau
     */
    constructor(controleurPLateau)
    {
        super();

        this.#controleurPlateau = controleurPLateau;
        this.#controleurPlateau.ajouterObservateur(this); //se place en observateur

        this.mettreAJour();
        
    }
       /**
     * Actualise la vue
     */


    mettreAJour(){
        this.afficherPlateau();
      
    }

    afficherPlateau()
    {
        
        //Récupère la balise du plateau de jeu et vide son contenu 
    
        const plateauHTML = document.querySelector("plateau");
        plateauHTML.innerHTML = "";

        let diamArecup = 0;
        const diamantArecupHTML = document.getElementById("Diams-a-collectés")

        // création d'une variable récupérant le nombre de diamant totale

        //recupere le plateau de jeu gérer par le controleur
        const plateau = this.#controleurPlateau.plateau;

        //récupèrer la balise HTML des diamant présents initialement
        plateau.grille.forEach((ligne) => 
        {
            //Création d'une div étant chacune une ligne du plateau de jeu
            const ligneHTML = document.createElement("div");

            ligne.forEach((piece) =>
            {
                //création d'une div étant chacune une case du tableau de jeu
                const position = document.createElement("div");
                if(piece)
                {
                    position.classList.add(piece.type);
                    if(piece.type === 'diamant')
                    {
                        diamArecup++;
                    }
                    

                }
            
                //Ajout de la case HTML à la ligne HTML
                ligneHTML.appendChild(position);
            })
            //Ajout de la ligne HTML au plateau HTML

            plateauHTML.appendChild(ligneHTML);
        }) 
        diamantArecupHTML.innerHTML = diamArecup;
        
    }

    
}
