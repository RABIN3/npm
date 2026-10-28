const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const plats = {
  1: { nom: 'Attiéké-poisson', prix: 1500 },
  2: { nom: 'Riz-poulet', prix: 2000 },
  3: { nom: 'Alloco-œuf', prix: 1000 }
};

function question(text) {
  return new Promise((resolve) => {
    rl.question(text, (reponse) => resolve(reponse));
  });
}

async function main() {
  console.log('============================');
  console.log('       CANTINE DU CAMPUS     ');
  console.log('============================');

  const nomClient = await question('Nom du client : ');
  const montantClient = Number(await question('Montant disponible (FCFA) : '));

  console.log('\nMenu des plats :');
  console.log('1 - Attiéké-poisson -> 1500 FCFA');
  console.log('2 - Riz-poulet -> 2000 FCFA');
  console.log('3 - Alloco-œuf -> 1000 FCFA');

  let codePlat = Number(await question('Entrer le code du plat : '));
  let plat = plats[codePlat];

  while (!plat) {
    console.log('Code invalide. Veuillez choisir entre 1 et 3.');
    codePlat = Number(await question('Entrer le code du plat : '));
    plat = plats[codePlat];
  }

  let quantite = Number(await question('Quantité souhaitée : '));
  while (!Number.isInteger(quantite) || quantite <= 0) {
    console.log('La quantité doit être un nombre entier supérieur à 0.');
    quantite = Number(await question('Quantité souhaitée : '));
  }

  const prixUnitaire = plat.prix;
  const total = prixUnitaire * quantite;

  console.log('\n--- FACTURE ---');
  console.log(`Client : ${nomClient}`);
  console.log(`Plat : ${plat.nom}`);
  console.log(`Prix unitaire : ${prixUnitaire} FCFA`);
  console.log(`Quantité : ${quantite}`);
  console.log(`Total : ${total} FCFA`);

  if (montantClient < total) {
    console.log(`Solde insuffisant. Il manque ${total - montantClient} FCFA.`);
  } else {
    const monnaie = montantClient - total;
    console.log(`Votre monnaie : ${monnaie} FCFA`);
    console.log('Merci pour votre achat, à bientôt !');
  }

  rl.close();
}

main();

