import axios from 'axios';
import { API_URL } from '../config';

export class BaseService {

  private readonly url: string = '';

  constructor(url: string) {
    this.url = url;

    this.list = this.list.bind(this);
  }

  async list() {
    const url = `${API_URL}/${this.url}`;
    return axios
      .get(url)
      .then(res => ({
        error: null,
        data: res.data,
      }))
      .catch(error => {
        console.error(error);
        return {
          error,
          data: null,
        };
      });
  }
}
