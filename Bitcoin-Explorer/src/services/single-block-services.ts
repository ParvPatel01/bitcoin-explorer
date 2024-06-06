
import { search} from './api-services';
import { SingleBlock } from '../models/SingleBlock';

export const getSingleBlockByHashValue = async (hash: string) => {
    return search<SingleBlock>(`rawblock`, hash, {});
}

// export const addComment = async (comment: SingleBlock) => {
//     return add(`comment`, comment);
// }

// export const updateComment = async (comment: SingleBlock) => {
//     return add(`comment`, comment);
// }

// export const removeCommentByCommentId = async (id: string) => {
//     return remove(`comment`, {_id: id});
// }

// export const removeCommentByUserId = async (id: number) => {
//     return remove(`comment`, {userId: id.toString()});
// }