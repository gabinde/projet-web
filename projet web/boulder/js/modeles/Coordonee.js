export class Coordonnee
{
    //Abscisse
    #x; 
    
    //Ordonnée
    #y;

    /**
     * Constructeur
     * @param {Coordonnee} coordonnee : Coordonnee avec laquelle initialisée l'instance 
     */
    
    constructor(coordonnee)
    {
        this.#x = coordonnee.x;
        this.#y = coordonnee.y;
    }

    set x(value) { this.#x = value; }
    get x() { return this.#x;}

    set y(value) { this.#y = value; }
    get y() { return this.#y;}
}