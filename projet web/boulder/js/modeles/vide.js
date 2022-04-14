import {Piece, VIDE} from "./piece.js"

/**
     * Constructeur
     * @param {Plateau} plateau : plateau sur lequel est placée la pièce 
     * @param {Coordonnee} coordonnée : Coordonnée de la pièce sur le plateau
     */

export class Vide extends Piece
{
    constructor(plateau, coordonnee)
    {
        super(VIDE, plateau, coordonnee);
    }

}