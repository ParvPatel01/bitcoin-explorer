import { search} from './api-services';
import { LatestBlockModel } from '../models/LatestBlockModel';

export const getLatestBlock = async () => {
    return search<LatestBlockModel>('latest_block');
}
