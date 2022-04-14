import { Piece, DIAMANT } from "./piece.js";

/**
     * Constructeur
     * @param {Plateau} plateau : plateau sur lequel est placée la pièce 
     * @param {Coordonnee} coordonnee : Coordonnee de la pièce sur le plateau
     */

export class Diamant extends Piece
{
    constructor(plateau, coordonne)
    {
        super(DIAMANT, plateau, coordonne);
    }    
}