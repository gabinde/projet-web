import {Piece, TERRE} from "./piece.js"

/**
     * Constructeur
     * @param {Plateau} plateau : plateau sur lequel est placée la pièce 
     * @param {Coordonnee} coordonnee : Coordonnee de la pièce sur le plateau
     */

export class Terre extends Piece
{
    constructor(plateau, coordonnee)
    {
        super(TERRE, plateau, coordonnee);
    } 
}