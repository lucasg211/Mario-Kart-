const player1 = {
    NOME: "Mário",
    velocidade:4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0
}

const player2 = {
    NOME:"Luigi",
    velocidade:3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0
}



async function rolldice(){
    return Math.floor(Math.random()* 6 + 1)

      /*o Math.random gera números entre 0 e 0.999999, portanto aqui nesse trecho, esse número dado é multiplicado por 6, passa a assumir um valor do tipo: 1.234567; 2.456777 e em seguida, é arredondado para baixo com o Math.floor

    OBS: o + 1 serve para que o dado nunca retorne 0, e para que o valor 6 possa ser alcançado, já que o valor máximo que a multiplicação poderia alcançar seria de 5.999999.

    
    
    */ 
   
}

//Com o uso do Switch aqui e dos valores do Random aqui, eu sorteio um bloco aleatório para que a corrida aconteça
async function getRandomBlock(){
    let random = Math.random()
    let result
    switch (true) {
        case random <0.33:
            result = "RETA"
            break;
        case random <0.66:
            result = "CURVA"
            break;
    
        default: result = "CONFRONTO" //Valor padrão que será usado caso nenhum result bata
            break;
    }
    return result
}

async function roundResult(CharacterName, block,diceResult,attribute) {
    console.log(`[${CharacterName}] ${block} | dado: ${diceResult} | atributo: ${attribute} | total: ${diceResult + attribute}`)
    
}

async function playRaceEngine(player1, player2){
    //Controle do número de rodadas:
    for(let round = 1; round <= 5;round++){
        console.log(`\n=== Rodada ${round} ===`)

        
        //Sorteio dos blocos
        let block = await getRandomBlock()
        console.log(`Bloco sorteado: ${block}`)

        //rolando os dados:
        let diceResult1 = await rolldice()
        let diceResult2 = await rolldice()

        let totaTestSkill1 = 0
        let totaTestSkill2 = 0

        if(block === "RETA"){                                                         
            totaTestSkill1 = diceResult1 + player1.velocidade
            totaTestSkill2 = diceResult2 + player2.velocidade
            await roundResult(player1.NOME, "RETA", diceResult1,player1.velocidade)
            await roundResult(player2.NOME, "RETA", diceResult2, player2.velocidade)


        }
        if(block === "CURVA"){
            totaTestSkill1 = diceResult1 + player1.manobrabilidade
            totaTestSkill2 = diceResult2 + player2.manobrabilidade

            await roundResult(player1.NOME, "CURVA", diceResult1,player1.manobrabilidade)
            await roundResult(player2.NOME, "CURVA", diceResult2, player2.manobrabilidade)

        }
        if(block === "CONFRONTO"){
            let powerResult1 = diceResult1 + player1.poder
             let powerResult2 = diceResult2 + player2.poder

            await roundResult(player1.NOME, "CONFRONTO", diceResult1,player1.poder)
            await roundResult(player2.NOME, "CONFRONTO", diceResult2, player2.poder)

            if(powerResult1 > powerResult2 && player2.pontos > 0){
                player2.pontos--
                console.log(`[CONFRONTO] ${player1.NOME} venceu! ${player2.NOME} perdeu 1 ponto.`)
            }

            if(powerResult2 > powerResult1 && player1.pontos > 0){
                player1.pontos--
                console.log(`[CONFRONTO] ${player2.NOME} venceu! ${player1.NOME} perdeu 1 ponto.`)
            }

            console.log(powerResult1 === powerResult2 ? "[CONFRONTO] Empate! Nenhum ponto foi perdido." : "")

        }

        if(totaTestSkill1 > totaTestSkill2){
            console.log(`🏁 ${player1.NOME} marcou um ponto!`)
            player1.pontos++
        } else if(totaTestSkill2 > totaTestSkill1){
            console.log(`🏁 ${player2.NOME} marcou um ponto!`)
             player2.pontos++


        }
        console.log("--------------------------------------------------")

           
        
        
        

        //

    }

}

async function finalResult(character1,character2) {
    console.log(`\n📊 Pontuação final`)
    console.log(`${character1.NOME} fez ${character1.pontos} ponto(s)`)
    console.log(`${character2.NOME} fez ${character2.pontos} ponto(s)`)

    if(character1.pontos > character2.pontos){
        console.log(`🎉 ${character1.NOME} é o vencedor do duelo!`)
    }
    
    if(character2.pontos > character1.pontos){
        console.log(`🎉 ${character2.NOME} é o vencedor do duelo!`)
    }
    
}


(async function(){
    console.log(`\n🚦 A corrida entre ${player1.NOME} e ${player2.NOME} está prestes a começar...`)

    await playRaceEngine(player1,player2)//O await é necessário para que o código seja executado em uma ordem orreta
    await finalResult(player1,player2)


})()