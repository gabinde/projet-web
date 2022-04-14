import { Coordonnee } from "./Coordonee.js";

export const VIDE = "vide";
export const DIAMANT = "diamant";
export const MUR = "mur";
export const ROCHER = "rocher";
export const ROCKFORD = "rockford";
export const TERRE = "terre";

export class Piece 
{
    //type de la case
    #type;

    //plateau du type de la case
    #plateau;

    //coordonne de la case
    #coordonne;

    /**
     * Constructeur
     * @param {string} type : Type de la pièce (VIDE, DIAMANT, MUR, ROCHER, ROCKFORD, TERRE) 
     * @param {Plateau} plateau : plateau sur lequel est placée la pièce 
     * @param {Coordonnee} coordonnee : Coordonnee de la pièce sur le plateau
     */
    constructor(type, plateau, coordonnee)
    {
        this.#coordonne = new Coordonnee(coordonnee);
        this.#plateau = plateau;
        this.#type = type;
    }

    set coordonnee(value) { this.#coordonne.x = value.x ; this.#coordonne.y = value.y;}
    get coordonnee() { return this.#coordonne;}
    get plateau() { return this.#plateau;}
    
    get type() { return this.#type;}
    set type(name) {this.#type = name;}
    

   
}