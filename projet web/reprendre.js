const nouvelle = document.getElementById("Nouveaux"); //récupération de l'élement nouveaux HTML
const reprendre = document.getElementById("Reprendre");//récupération de l'élement reprendre HTML

nouvelle.addEventListener("click", () => {
    localStorage.setItem("NEW" , 0); // sur l'évenement click on place la valeur 0 dans le local storage à la clef NEW
})
reprendre.addEventListener("click", () => {
    localStorage.setItem("NEW" , 1);// sur l'évenement click on place la valeur 1 dans le local storage à la clef NEW
})