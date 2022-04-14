import {Piece, ROCHER} from "./piece.js"
import  {Coordonnee } from "./Coordonee.js"

/**
     * Constructeur
     * @param {Plateau} plateau : plateau sur lequel est placée la pièce 
     * @param {Coordonnee} coordonnee : Coordonnée de la pièce sur le plateau
     */

export class Rocher extends Piece{

    constructor(plateau, coordonnee)
    {
        super(ROCHER, plateau, coordonnee);
    }
}