import axios from 'axios';
import { ISuperhero } from '../interfaces/superhero.interface';

class SuperheroApi {
    instance: any;
    constructor() {
        this.instance = axios.create({
            baseURL: 'http://localhost:3001/superheroes',
        });
    }

    async getAllSuperheroes() {
        try {
            const response = await this.instance.get('/');
            return response.data;
        } catch (error) {
            console.error('Помилка отримання супергероїв:', error);
            throw error;
        }
    }

    async getSuperheroById(id: number) {
        try {
            const response = await this.instance.get(`/${id}`);
            return response.data;
        } catch (error) {
            console.error('Помилка отримання супергероя:', error);
            throw error;
        }
    }

    async createSuperhero(superheroData: ISuperhero) {
        try {
            const response = await this.instance.post('/', superheroData);
            return response.data;
        } catch (error) {
            console.error('Помилка створення супергероя:', error);
            throw error;
        }
    }

    async updateSuperhero(id: number, updatedSuperheroData: ISuperhero) {

        try {
            console.log('herre' + id)
            console.log(updatedSuperheroData);
            const response = await this.instance.put(`/${id}`, updatedSuperheroData);
            return response.data;
        } catch (error) {
            console.error('Помилка оновлення супергероя:', error);
            throw error;
        }
    }

    async deleteSuperhero(id: number) {
        try {
            const response = await this.instance.delete(`/${id}`);
            return response.data
        } catch (error) {
            console.error('Помилка видалення супергероя:', error);
            throw error;
        }
    }
}

export default SuperheroApi;
