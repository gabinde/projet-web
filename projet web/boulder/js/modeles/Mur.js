import { Piece, MUR } from "./piece.js";

/**
     * Constructeur
     * @param {Plateau} plateau : plateau sur lequel est placée la pièce 
     * @param {Coordonnee} coordonnee : Coordonnee de la pièce sur le plateau
     */
    
export class Mur extends Piece
{
    constructor(plateau, coordonnee)
    {
        super(MUR, plateau,coordonnee);
    }
}