const serverURL = 'http://127.0.0.1:7878';

const chartURL = 'https://api.blockchain.info/charts';


export const search = async <T> (path: string, searchParam: string = '', params: any = {}): Promise<T[]> => {
    const query: URLSearchParams = new URLSearchParams(params);
    const response = await fetch(`${serverURL}/${path}?search=${searchParam}&${query.toString()}`, 
        {method: 'GET'}
    );
    return response.json();
}
// export const add = async (path: string, body: any = {}) => {
//     const response = await fetch(`${serverURL}/${path}`, 
//         {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(body),
//         }
//     );
//     return response.json();
// }

// export const update = async (path: string, body: any = {}) => {
//     const response = await fetch(`${serverURL}/${path}`, 
//         {
//             method: "PUT",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(body),
//         }
//     );
//     return response.json();
// }

// export const remove = async (path: string, params: any = {}) => {
//     const query: URLSearchParams = new URLSearchParams(params);
//     const response = await fetch(`${serverURL}/${path}?${query.toString()}`, 
//         {method: 'DELETE'}
//     );
//     return response.json();
// }

// export const save = async <T>(path: string, params: any): Promise<T[]> => {
//     const response = await fetch(`${serverURL}/${path}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json' // Specify JSON content type
//         },
//         body: JSON.stringify(params) // Convert params to JSON string and send in the body
//     });
//     return response.json();
// }