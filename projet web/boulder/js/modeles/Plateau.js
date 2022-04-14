import { Coordonnee } from "./Coordonee.js";
import { Diamant } from "./Diamant.js";
import { Mur } from "./Mur.js";
import { Rocher} from "./Rocher.js"
import { Rockford } from "./Rockford.js"
import { Terre } from "./Terre.js"
import { Vide } from "./vide.js";


export class Plateau 
{
    #grille; //grille du plateau

    /**
     * Constructeur
     * @param {niveau} niveau : niveau avec lequel initialiser le plateau 
     */

    constructor(niveau)
    {
        this.#grille = []; //déclaration grille
        this.#initialiserGrille();
        this.#placerComposant(niveau);
        this.diamant(); //récupère le nombre de diamants dans le niveau
    }

    get grille() {return this.#grille;}
   
    diamant() //récupère le nombre de diamants initiaux sur le plateau
    {
        let nbrDiamant = 0;
        for(let iLigne = 0 ; iLigne < 16; ++iLigne)
        {
            for(let iColonne = 0 ; iColonne < 32 ; ++iColonne)
            {
                if(this.#grille[iLigne][iColonne].type === 'diamant')
                {
                    nbrDiamant++
                } 
            }
        }
        const DiamantTotHTML = document.getElementById('Diams-tot');
        DiamantTotHTML.innerHTML = nbrDiamant;//affiche les diamants dans l'élement HTML DiamantTotHTML  
    }
    
    #initialiserGrille() // initialisation de la grille
    {
        this.#grille = [];
        for (let iLigne = 0 ; iLigne < 16; ++iLigne)
        {
            let ligne = [];

            for(let iColonne = 0 ; iColonne < 32 ; ++iColonne)
            {
                ligne.push(null);
            }
            this.#grille.push(ligne);
        }
    }
  
    

    #placerComposant(level) // Pour placer une pièce sur chaque case du plateau
    {   
        for(let iLigne = 0; iLigne <16 ; ++iLigne)
        {
            for(let iColonne = 0; iColonne < 32; ++iColonne)
            {
                if(level[iLigne][iColonne] === 'M') //Si M à la coordonnée, crée un MUR
                {
                    this.#grille[iLigne][iColonne] = new Mur(this, new Coordonnee({x:iLigne, y:iColonne}))
                }
                if(level[iLigne][iColonne] === 'T')//Si T à la coordonnée, crée une TERRE
                {
                    this.#grille[iLigne][iColonne] = new Terre(this, new Coordonnee({x:iLigne, y:iColonne}))
                }
                if(level[iLigne][iColonne] === 'P')//Si P à la coordonnée, crée un ROCKFORD
                {
                    this.#grille[iLigne][iColonne] = new Rockford(this, new Coordonnee({x:iLigne, y:iColonne}))
                }
                if(level[iLigne][iColonne] === 'V')//Si V à la coordonnée, crée un VIDE
                {
                    this.#grille[iLigne][iColonne] = new Vide(this, new Coordonnee({x:iLigne, y:iColonne}))
                }
                if(level[iLigne][iColonne] === 'D')//Si D à la coordonnée, crée un DIAMANT
                {
                    this.#grille[iLigne][iColonne] = new Diamant(this, new Coordonnee({x:iLigne, y:iColonne}))
                }
                if(level[iLigne][iColonne] === 'R')//Si R à la coordonnée, crée un ROCHER
                {
                    this.#grille[iLigne][iColonne] = new Rocher(this, new Coordonnee({x:iLigne, y:iColonne}))
                }
            }
        }
    }

    get Personnage() //récupération des coordonnées du personnage
    {
        for(let i = 0 ; i < 16; ++i)
        {
            for(let j = 0; j <32 ; ++j)
            {
               
                if(this.#grille[i][j].type == 'rockford') // si le type d'une pièce est rockford ...
                {
                    var coordonne = new Coordonnee({x:i , y:j}); // renvoie ses coordonnées

                }
            }
        }
        return coordonne ;
    }

    getPiece(coordonne) //récupération des coordonnées d'une pièce qui est sur le plateau
    {
        if(this.#estSurLePlateau(coordonne)) // Si la pièce est sur le plateau ...
        {
            return this.#grille[coordonne.x][coordonne.y]; //renvoie ses coordonnées

        }
        else{
        return null;
        }
    }

    #estSurLePlateau(coordonne) // vérifie qu'une pièce est sur le plateau
    {
        return coordonne.x >= 0 && coordonne.x < 16 && coordonne.y >= 0 && coordonne.y < 32;
    }    
}
