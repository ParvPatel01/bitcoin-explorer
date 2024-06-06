import {search} from './api-services';
import { BlockHeight } from '../models/BlockHeight';

export const getBlockHeight = async (height: number) => {
    return search<BlockHeight>(`block-height`, height.toString(), {format: 'json'});
}