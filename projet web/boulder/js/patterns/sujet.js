export class Sujet
{
    #observateurs;

    constructor()
    {
        this.#observateurs = [];
    }

    ajouterObservateur(observateur)
    {
        this.#observateurs.push(observateur);
    }

    notifier() //notifie l'ensemble des observateurs pour qu'ils se mettent à jour    
    {
        this.#observateurs.forEach((observateur) => {
            observateur.mettreAJour();
        });
    }
}