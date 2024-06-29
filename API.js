import axios from 'axios';
export {AxiosError} from 'axios';

export const api = axios.create({
  baseURL: 'https://veiopads.netlify.app/api/alex-cardoso/',
});
