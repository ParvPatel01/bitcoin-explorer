import { search} from './api-services';
import { GraphDataModel } from '../models/GraphDataModel';

export const getGraphData = async () => {
    return search<GraphDataModel>('graph');
}