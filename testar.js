const episodes = require('./src/database/services/episodesDatabase')


async function list(teste){
    const lis = await episodes.findAllEpisodes(teste)

return lis
}

console.log(list({page:1}))