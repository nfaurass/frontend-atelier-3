const convertirEnMajuscules = texte => texte.toUpperCase();
const filtrerLignesAvecI = lignes => lignes.filter(ligne => ligne.includes('I'));
const diviserEnLignes = texte => texte.split('\n');
const imprimerLignes = lignes => lignes.forEach(ligne => console.log(ligne));

const texte = `Ecrire un programme fonctionnel qui divise le texte en lignes,
convertit chaque ligne en majuscules,
tester sans la lettre recherchee
filtre les lignes contenant la lettre "I",
cette sans la lettre`;

const lignes = texte.split('\n');

imprimerLignes(filtrerLignesAvecI(diviserEnLignes(convertirEnMajuscules(texte))));