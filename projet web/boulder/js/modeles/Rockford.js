import {  Piece,ROCKFORD } from "./piece.js";

/**
     * Constructeur
     * @param {Plateau} plateau : plateau sur lequel est placée la pièce 
     * @param {Coordonnee} coordonnee : Coordonnee de la pièce sur le plateau
     */

export class Rockford extends Piece 
{
    constructor(plateau, coordonnee)
    {
        super(ROCKFORD,plateau,coordonnee)
    } 
}