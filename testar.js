const readline = require('readline');
const opcoes = 0;

const leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

leitor.question("Escolha uma opção :\n1-levar uma surra\n2-levar outra surra\n3-bater um pouco\n-------------\n opt: ", (respota) => {

    switch (parseInt(respota)) {

        case 1:
            console.log("Apanhei muito meu Deus" );
            break;
        case 2:
            console.log('Morri!');
            break;
        case 3:
            console.log('Agora me vingo!');
        break
        default:
            console.log('Briga encerrada'+typeof respota);


    }

    leitor.close()
})