import dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/../' + process.env['envfile'] })
import { NftService } from './service/nft.service';
import { FetchVotesService } from './service/fetch-votes.service';
import { logger } from './logger/logger';

const init = async () => {
    logger.info("Starting application - " + process.env['ENV'])
    new NftService(process.env['ENV'], process.env['SEED'], process.env['WS_CONNECTION'], new FetchVotesService(process.env['OPEN_GOV_API_URL']))
}

init()
