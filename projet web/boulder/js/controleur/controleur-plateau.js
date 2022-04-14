import { Sujet } from "../patterns/sujet.js";
import { Plateau } from "../modeles/Plateau.js"
import { Vide } from "../modeles/vide.js";
import { Coordonnee } from "../modeles/Coordonee.js";
import { Rockford } from "../modeles/Rockford.js";
import { Rocher } from "../modeles/Rocher.js";

export class ControleurPlateau extends Sujet
{
    #plateau; //Plateau géré par le contrôleur

    constructor()
    {
        super(); //Appel du constructeur de la classe mère
        this.compteurNiveau = 0;
        this.deplacementTOT = 0;
        this.#plateau = new Plateau(this.recupNiveau()[this.compteurNiveau]);
        this.recupNiveau();
        this.RocherTombe();  
        this.deplacement();
        this.Win();
        this.goToMenu();
        this.retryLevel();  
    }

    get plateau() { return this.#plateau ;}   //getter du plateau
    set plateau(Plateau) {this.#plateau = Plateau;} //setter du plateau
    
    deplacement() //fonction pour la gestion du déplacement
    {
        const deplacementHTML = document.getElementById('Déplacement'); //récupération de l'élement HTML déplacement
        const retry = document.getElementById('retry'); //Recupération de l'élement HTML retry
        retry.onclick = () => { // sur click
            if(confirm("Voulez vous recommencer le niveau ? \nVotre progression sera perdue" )) // Affiche un message de confirmation et ses conséquences
            {
                this.deplacementTOT = 0;  // réinitialisation de la variable à 0
                deplacementHTML.innerHTML = this.deplacementTOT; // affichage de la variable déplacement dans le HTML
            }
        } 
        document.onkeydown = (event) => { // Sur un évenement onKeyDown
            let coordonne = this.#plateau.Personnage; //récupère la coordonnée de rockford
            
            switch(event.key) //Définition en fonction de la touche
            {
                case "z": // si c'est z, Z ou flèche du haut
                case "Z": 
                case "ArrowUp": 

                    let caseAuDessus = this.#plateau.grille[coordonne.x - 1][coordonne.y]; // récupération de la case du haut
                    if((caseAuDessus.type === 'terre') || ( caseAuDessus.type === 'vide') || (caseAuDessus.type === 'diamant')) // si elle est de type terre, vide ou diamant..
                    {   
                        this.#plateau.grille[coordonne.x - 1][coordonne.y] = new Rockford(this, new Coordonnee({ x: coordonne.x-1 , y:coordonne.y })); // on crée un rockford à la case du dessus
                        this.#plateau.grille[coordonne.x][coordonne.y] = new  Vide(this, new Coordonnee({x:coordonne.x, y:coordonne.y}));//on crée un vide où était rockford
                        coordonne = new Coordonnee({x : coordonne.x - 1  , y :coordonne.y});//on actualise les coordonnées
                        this.RocherTombe(); //on vérifie si des rochers peuvent effectuer des déplacements
                        this.Win();//on vérifie si le joueur n'a pas gagné
                        this.deplacementTOT++;//actualisation du nombre de déplacements 
                        deplacementHTML.innerHTML = this.deplacementTOT; // insertion dans le HTML
                    } 
                break;

                case "q": //si q, Q ou flèche de gauche 
                case "Q":
                case "ArrowLeft":
                    
                    let caseAGauche =  this.#plateau.grille[coordonne.x][coordonne.y - 1];  // Récupération de la case de gauche et celle d'après
                    let caseAGauche2 =  this.#plateau.grille[coordonne.x][coordonne.y -2]; 
                    if((caseAGauche.type === 'rocher' && (caseAGauche2.type != 'vide') ) || caseAGauche.type === 'mur'){}// cas de déplacements impossibles, aucune action effectuée
                    else if(caseAGauche.type === 'rocher' && caseAGauche2.type === 'vide')//cas de déplacement sur la gauche avec déplacement de rocher
                    {                   
                        this.#plateau.grille[coordonne.x][coordonne.y -1] = new Rockford(this, new Coordonnee({x: coordonne.x , y:coordonne.y -1 }))//case à gauche devient Rockford
                        this.#plateau.grille[coordonne.x][coordonne.y] = new  Vide(this, new Coordonnee({x:coordonne.x, y:coordonne.y}));//case de base devient vide
                        this.#plateau.grille[coordonne.x][coordonne.y -2] = new Rocher(this, new Coordonnee({x: coordonne.x , y:coordonne.y -2 })) //case deux fois à gauche devient rocher
                        coordonne = new Coordonnee({x : coordonne.x  , y :coordonne.y -1 });//actualisation de coordonnées
                        this.RocherTombe();//vérification mouvement rocher
                        this.Win();//vérification que la partie n'est pas gagnée
                        this.deplacementTOT++;//actualisation du nombre de déplacements effectués
                        deplacementHTML.innerHTML = this.deplacementTOT;   //insertion dans le HTML             
                    }
                    else//dans tous les autres cas
                    {
                        this.#plateau.grille[coordonne.x][coordonne.y -1] = new Rockford(this, new Coordonnee({ x: coordonne.x , y:coordonne.y -1 }));  //création de rockford à gauche
                        this.#plateau.grille[coordonne.x][coordonne.y] = new  Vide(this, new Coordonnee({x:coordonne.x, y:coordonne.y})); //création de vide 
                        coordonne = new Coordonnee({x : coordonne.x  , y :coordonne.y -1 });//actualisation des coordonnées
                        this.RocherTombe();//vérification mouvement rocher
                        this.Win();//vérification que la partie n'est pas gagnée
                        this.deplacementTOT++; //actualisation du nombre de déplacemenst effectués
                        deplacementHTML.innerHTML = this.deplacementTOT; //insertion dans le HTML          
                    }
                break;

                case "s"://si s, S ou flèche du bas sélectionnée
                case "S":
                case "ArrowDown":
                    let caseEnDessous = this.#plateau.grille[coordonne.x +1][coordonne.y]; // récupération de la case en desous et de la case au dessus
                    let test = this.#plateau.grille[coordonne.x -1][coordonne.y];
                    let NEWorNOt = localStorage.getItem("NEW");//vérification si le joueur est dans le cas d'une reprise de partie ou une nouvelle
                    let compteurSave = localStorage.getItem("saveCompteur");//récupération du niveau où le joueur à quitter le jeu
                
                    if (test.type === 'rocher' || caseEnDessous.type ==='rocher' || caseEnDessous.type === 'mur')//
                    {
                        if(caseEnDessous.type === 'rocher' || caseEnDessous.type === 'mur'){}//si case en dessous est un mur ou un rocher il ne se passe rien
                        else //sinon
                        {
                        this.#plateau.grille[coordonne.x -1][coordonne.y] =new  Vide(this, new Coordonnee({x:coordonne.x -1, y:coordonne.y}))//création d'une case vide
                        this.#plateau.grille[coordonne.x][coordonne.y] = new Rocher(this, new Coordonnee({x:coordonne.x, y:coordonne.y}))//on place rockford en bas puis...
                        confirm("Dommage !!! C'est perdu essayez encore !")  //on affiche que la partie est perdue

                        if(NEWorNOt == 0)//si nouvelle partie
                        {
                            this.#plateau = new Plateau(this.recupNiveau()[this.compteurNiveau]);//nouveaux plateaux au compteur 
                            this.RocherTombe();
                        }
                        if(NEWorNOt == 1) //cas de la reprise
                        {
                            localStorage.setItem("NEW", 0);//on remet dans le cas d'une nouvelle partie
                            let compteurAct = parseInt(this.compteurNiveau, 10); //on passe en int le compteur actuel
                            let compteurMem = parseInt(compteurSave, 10); // On passe en Int le compteur dans le localStorage
                            let somme = compteurAct + compteurMem;
                            this.#plateau = new Plateau(this.recupNiveau()[somme]);
                            this.RocherTombe();
                            this.compteurNiveau = somme;
                        }
                        this.notifier();//notification de la vue
                        }  
                    }
                    else if((caseEnDessous.type === 'terre') || ( caseEnDessous.type === 'vide') || (caseEnDessous.type === 'diamant'))
                    {
                        this.#plateau.grille[coordonne.x + 1][coordonne.y] = new Rockford(this, new Coordonnee({ x: coordonne.x+1 , y:coordonne.y}))
                        this.#plateau.grille[coordonne.x][coordonne.y] = new  Vide(this, new Coordonnee({x:coordonne.x, y:coordonne.y}))
                        coordonne = new Coordonnee({x : coordonne.x + 1 , y :coordonne.y})
                        this.RocherTombe(); 
                        this.Win();
                        this.deplacementTOT++;
                        deplacementHTML.innerHTML = this.deplacementTOT;  
                    }
                    break;

                case "d": // même principe que pour le cas de Q, q ou flèche  de gauche
                case "D":
                case  "ArrowRight":
                    let caseADroite =  this.#plateau.grille[coordonne.x][coordonne.y + 1]; 
                    let caseADroite2 =  this.#plateau.grille[coordonne.x][coordonne.y +2]; 
                    if((caseADroite.type === 'rocher' && (caseADroite2.type != 'vide') ) || caseADroite.type === 'mur'){}
                    else if(caseADroite.type === 'rocher' && caseADroite2.type === 'vide')
                    {
                        this.#plateau.grille[coordonne.x][coordonne.y +1] = new Rockford(this, new Coordonnee({x: coordonne.x , y:coordonne.y +1 }))
                        this.#plateau.grille[coordonne.x][coordonne.y] = new  Vide(this, new Coordonnee({x:coordonne.x, y:coordonne.y}));
                        this.#plateau.grille[coordonne.x][coordonne.y +2] = new Rocher(this, new Coordonnee({x: coordonne.x , y:coordonne.y +2 }))
                        coordonne = new Coordonnee({x : coordonne.x  , y :coordonne.y +1 });
                        this.deplacementTOT++;
                        deplacementHTML.innerHTML = this.deplacementTOT;
                        this.RocherTombe();
                        this.Win();
                    }
                    else
                    {  
                        this.#plateau.grille[coordonne.x][coordonne.y +1] = new Rockford(this, new Coordonnee({ x: coordonne.x , y:coordonne.y +1 }));
                        this.#plateau.grille[coordonne.x][coordonne.y] = new  Vide(this, new Coordonnee({x:coordonne.x, y:coordonne.y}));
                        coordonne = new Coordonnee({x : coordonne.x  , y :coordonne.y +1 });
                        this.RocherTombe();
                        this.Win();
                        this.deplacementTOT++; 
                        deplacementHTML.innerHTML = this.deplacementTOT;      
                    }
                break;  
            }
            this.notifier();  //notification de la vue
        }    
    }

    RocherTombe() //vérification des rochers
    {   
       for(let iRep = 0 ; iRep < 15 ; ++ iRep)
       {
            for (let iLigne = 0 ; iLigne < 16 ; ++iLigne)
            {
                for(let iColonne = 0 ; iColonne < 32 ; ++iColonne) //pour chaque case..
                { 
                    while((this.#plateau.grille[iLigne][iColonne].type === 'rocher' && this.#plateau.grille[iLigne +1 ][iColonne].type === 'vide') ) //tant qu'on trouve un rocher et qu'en dessous il s'agit d'une case vide...
                    {
                        this.#plateau.grille[iLigne][iColonne] = new Vide(this, new Coordonnee({ x: iLigne, y:iColonne}));//on crée un vide ou était le rocher
                        this.#plateau.grille[iLigne + 1][iColonne] = new Rocher(this, new Coordonnee({ x: iLigne +1, y:iColonne}));//on crée un rocher dans la case d'en bas
                    }
                }
                
            }
        }
        this.notifier();//notification de la vue
       
    }

    

    Win() //vérifie si le joueur à gagner
    {
        
        let compteDiamant = 0;//initialisation de la variable pour le compte
        for (let iLigne = 0 ; iLigne < 16 ; ++iLigne)
        {
            for(let iColonne = 0 ; iColonne < 32 ; ++iColonne)//pour chaque case..
            {
                if (this.#plateau.grille[iLigne][iColonne].type === 'diamant')// si c'est un diamant
                {
                    compteDiamant++; // incrémente la variable
                }
            }    
        }

        if(compteDiamant===0) //si plus de diamant
        {
            
            let listeLevel = JSON.parse( localStorage.getItem("listeLevel"));//récupère la liste de level en mémoire
            let newOrNot =  JSON.parse( localStorage.getItem("NEW")); //regarde dans quel cas on se situe
            let compteur = JSON.parse(localStorage.getItem("saveCompteur"));//regarde à quel niveau le joueur à sauvegarder
            this.deplacementTOT = 0; //remise à 0 des deplacements
            const deplacementHTML = document.getElementById('Déplacement'); //récupération de l'élement HTML déplacement
            deplacementHTML.innerHTML = this.deplacementTOT; // affichage de la variable déplacement dans le HTML
            confirm("You Win");//informe de la victoire
            this.compteurNiveau++; // on augmente de un sur quel niveau on est
            compteur;
            if(newOrNot == 1)//dans le cas de la reprise
            {
                if(this.compteurNiveau < listeLevel.length - compteur ) //si on a pas finis tous les niveaux
                {
                    
                    this.#plateau = new Plateau(this.recupNiveau()[compteur])  //création d'un plateau   
                    this.notifier(); //notification de la vue
                }
                else//si on a finit le jeu..
                {
                    localStorage.setItem("Save", null)//met à null la sauvegarde
                    alert("Vous avez fini le jeu !!! \nFELICITATION \nVous pouvez ajouter des niveaux dans le mode gestion pour continuer à vous amuser")
                    window.location.href = "../index.html" // renvoie vers la page d'accueil
                } 

            }
            if(newOrNot == 0)//dans le cas d'une nouvelle partie
            {
                if(this.compteurNiveau < listeLevel.length)
                {
                    this.#plateau = new Plateau(this.recupNiveau()[this.compteurNiveau])
                    this.notifier();
                }
                else
                {
                    localStorage.setItem("Save", null)
                    alert("Vous avez fini le jeu !!! \nFELICITATION \nVous pouvez ajouter des niveaux dans le mode gestion pour continuer à vous amuser")
                    window.location.href = "../index.html" // renvoie vers la page d'accueil
                } 
            }
        }
        this.notifier();//notifie la vue
        this.RocherTombe();//vérifie déplacement rocher au lancement de niveau
    }
    
    goToMenu() //fonction quand retour au menu
    {
        const menu = document.getElementById('Menu');// recupere l'élément retry de la page HTML
        menu.onclick = () => { // quand on click sur le bouton retry ...
            if(confirm("Voulez-vous retourner au menu  prinicipal? \nVous pourrez toujours reprendre là où vous en êtes."))// affiche un message de vérification et si on valide...
            {
                let levelSave =[];//initialise un tableau, sauvegarde chaque case avec les lettres correspondantes
                for(let iLigne = 0 ; iLigne <16 ; iLigne++)
                {
                    let lineSave = [];
                    for(let iColonne = 0; iColonne <32 ; ++iColonne)
                    {
                        if(this.#plateau.grille[iLigne][iColonne].type === 'rockford')
                        lineSave.push("P");
                        if(this.#plateau.grille[iLigne][iColonne].type === 'rocher')
                        lineSave.push("R");
                        if(this.#plateau.grille[iLigne][iColonne].type === 'terre')
                        lineSave.push("T"); 
                        if(this.#plateau.grille[iLigne][iColonne].type === 'diamant')
                        lineSave.push("D");
                        if(this.#plateau.grille[iLigne][iColonne].type === 'mur')
                        lineSave.push("M");
                        if(this.#plateau.grille[iLigne][iColonne].type === 'vide')
                        lineSave.push("V");
                    }
                    levelSave.push(lineSave);
                }
                localStorage.setItem("saveCompteur", JSON.stringify(this.compteurNiveau));//sauvegarde le compteur de niveau
                localStorage.setItem("Save" , JSON.stringify( levelSave));//sauvegarde le niveau
                window.location.href = "../index.html" // renvoie vers la page d'accueil
            }
        }
    }

    retryLevel() //recommencement d'un niveau
    {
        let NEWorNOt = localStorage.getItem("NEW");//récupère le cas dans lequelon se situe
        let compteurSave = localStorage.getItem("saveCompteur");//récupère le compteur
        const retry = document.getElementById('retry'); // recupere l'élément retry de la page HTML

        retry.onclick = () => {    // quand on click sur le bouton retry ...
            if(confirm("Voulez vous recommencer la partie? \nVotre progression sera perdue" )) // affiche un message de vérification et si on valide...
            {    
                if(NEWorNOt == 0)//cas d'une nouvelle partie
                {
                this.#plateau = new Plateau(this.recupNiveau()[this.compteurNiveau]);
                this.deplacementTOT = 0;
                const deplacementHTML = document.getElementById('Déplacement'); //récupération de l'élement HTML déplacement
                deplacementHTML.innerHTML = this.deplacementTOT; // affichage de la variable déplacement dans le HTML 
                }
                if(NEWorNOt == 1) //cas de la reprise
                {
                    localStorage.setItem("NEW", 0);
                    let compteurAct = parseInt(this.compteurNiveau, 10); //en int le compteur actuel
                    let compteurMem = parseInt(compteurSave, 10); // en Int le compteur dans le localStorage
                    let somme = compteurAct + compteurMem;
                    this.#plateau = new Plateau(this.recupNiveau()[somme]);
                    this.compteurNiveau = somme;
                    this.deplacementTOT = 0
                    const deplacementHTML = document.getElementById('Déplacement'); //récupération de l'élement HTML déplacement
                    deplacementHTML.innerHTML = this.deplacementTOT; // affichage de la variable déplacement dans le HTML
                }  
            }
            this.notifier();
            this.RocherTombe();
        }    
    }

    recupNiveau()//récupère le niveau à envoyer
    {   
        
    let listeLevel = [[ ['M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M']
    ,['M','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','M']
    ,['M','T','R','P','R','T','T','T','T','T','T','T','V','T','T','T','T','T','R','T','T','T','T','T','T','T','T','T','T','T','T','M']
    ,['M','T','T','T','T','T','T','T','T','T','T','T','T','T','V','V','V','V','V','D','R','R','T','T','T','T','T','T','T','T','T','M']
    ,['M','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','M']
    ,['M','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','M']
    ,['M','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','M']
    ,['M','T','T','T','T','T','T','T','T','T','T','T','T','R','R','R','T','T','T','R','R','R','T','T','T','T','T','T','T','T','T','M']
    ,['M','T','T','T','T','T','T','T','T','T','T','T','T','R','D','R','T','T','T','R','D','R','V','T','T','T','T','T','T','T','T','M']
    ,['M','M','M','M','M','M','M','M','T','T','T','T','T','R','R','R','T','T','T','R','R','R','T','T','T','T','T','T','T','T','T','M']
    ,['M','T','T','T','T','T','T','M','T','T','T','T','T','T','T','T','R','R','R','T','T','T','T','T','T','T','T','T','T','T','T','M']
    ,['M','T','T','T','T','T','D','M','T','T','T','T','T','T','T','T','R','D','R','T','T','T','T','T','T','T','T','T','T','T','T','M']
    ,['M','T','T','T','T','T','T','M','T','T','T','T','T','T','T','T','R','R','R','T','T','T','T','T','T','T','T','T','T','T','T','M']
    ,['M','T','T','T','T','T','T','M','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','M']
    ,['M','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','M']
    ,['M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M']],

     [[ 'M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M']
    ,['M','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','R','T','T','T','T','M']
    ,['M','T','R','P','R','T','T','T','T','T','T','T','V','T','T','T','T','T','R','T','T','T','T','T','T','T','R','T','T','T','T','M']
    ,['M','T','T','T','T','T','T','T','T','T','T','T','T','T','V','V','V','V','V','M','R','R','T','T','T','T','R','T','T','T','T','M']
    ,['M','T','T','T','T','T','T','T','T','T','R','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','R','T','T','T','T','M']
    ,['M','T','T','T','T','T','T','T','T','T','R','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','R','V','T','T','T','M']
    ,['M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','R','T','T','T','T','M']
    ,['M','T','T','T','T','T','T','T','R','R','R','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','R','T','T','T','T','M']
    ,['M','T','T','T','T','T','T','T','R','R','R','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','R','T','T','T','T','M']
    ,['M','T','T','T','T','T','T','T','R','R','R','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','R','T','T','T','T','M']
    ,['M','T','T','T','D','T','T','T','R','R','R','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','R','T','T','T','T','M']
    ,['M','T','T','T','T','T','T','T','R','R','R','T','T','T','T','T','T','D','T','T','T','T','T','T','T','T','R','T','T','T','T','M']
    ,['M','T','T','T','T','T','T','T','T','R','R','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','R','T','T','T','T','M']
    ,['M','T','T','T','T','T','T','T','V','D','R','T','T','T','T','T','T','T','T','T','T','T','T','T','T','V','R','T','T','T','T','M']
    ,['M','T','T','T','T','T','T','T','D','D','D','T','T','T','T','T','T','T','T','T','T','T','T','T','T','V','R','T','T','T','T','M']
    ,['M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M']],

    [[ 'M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M']
    ,['M','T','T','T','T','T','T','T','T','M','T','T','R','V','T','T','T','T','T','T','T','T','D','M','T','T','T','T','T','T','T','M']
    ,['M','T','R','P','R','T','T','T','T','M','T','T','M','V','M','M','M','M','M','M','M','M','M','M','T','T','T','T','T','T','T','M']
    ,['M','T','D','T','T','T','T','T','T','M','T','T','M','V','V','V','V','V','V','R','R','V','V','T','T','T','T','T','T','T','T','M']
    ,['M','T','T','T','T','T','T','T','T','M','T','T','M','V','M','M','M','M','M','V','M','M','V','M','T','T','T','T','T','T','T','M']
    ,['M','T','T','T','T','T','T','T','T','T','R','V','M','D','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','R','T','M']
    ,['M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','T','M','M']
    ,['M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','T','M','M']
    ,['M','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','R','D','M','T','T','M']
    ,['M','T','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','R','M','D','R','T','M']
    ,['M','T','T','T','T','T','T','T','T','T','T','T','T','T','M','R','D','T','T','T','T','T','T','T','T','M','R','D','D','R','T','M']
    ,['M','R','M','M','M','M','M','M','M','M','M','M','M','M','M','V','R','D','T','T','T','T','T','T','T','M','R','D','D','R','T','M']
    ,['M','R','T','T','T','T','T','T','V','R','T','T','T','T','D','V','R','T','T','T','T','T','T','T','T','V','R','D','D','R','T','M']
    ,['M','D','T','T','T','T','T','M','V','M','M','M','M','M','M','V','R','T','T','T','T','T','T','T','T','D','R','D','V','R','T','M']
    ,['M','D','T','T','T','T','T','T','T','T','T','T','T','D','M','V','R','T','T','T','T','T','T','T','T','D','D','V','V','R','D','M']
    ,['M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M']]]; //liste des niveaux de base

    
        
        let levelSave = JSON.parse(localStorage.getItem("Save"));//récupération du niveau sauvegarder
        let compteur = JSON.parse(localStorage.getItem("saveCompteur"));//récupération du compteur sauvegarder
        let newlisteLevel = [];//initialisation tableau
        if(JSON.parse(localStorage.getItem("listeLevel")) == null)//si rien dans le local Storage
        {
            localStorage.setItem("listeLevel" , JSON.stringify(listeLevel));//remet les niveaux de bases
        }   
        let listeLevelMEM = JSON.parse( localStorage.getItem("listeLevel"));//Récupère les niveaux en mémoire
        if(localStorage.getItem("NEW") == 0) //cas d'une nouvelle partie
        {
            return listeLevelMEM;//retourne la liste de niveau
        }
        else//cas de la reprise d'une partie
        {
            if(levelSave != null){ //si niveau sauvegardé..
                for(let i = 1 ; i < listeLevelMEM.length - compteur + 1 ; i++)
                    {
                        newlisteLevel[i ]= listeLevelMEM[i + compteur];//crée la nouvelle liste de niveau à partir de celui sauvegarder
                    }
                newlisteLevel[0] = levelSave; //le premier niveau de la nouvelle liste est le niveau sauvegardé
                return newlisteLevel;
            }
            else//si aucun niveau sauevgardé..
            {
                localStorage.setItem("NEW",0)//place à 0 et remet dans le cas d'une nouvelle partie
                return listeLevelMEM;
            }
        }
    }  
}