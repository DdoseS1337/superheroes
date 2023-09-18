import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import SuperheroApi from '../services/api';
import { ISuperhero } from '../interfaces/superhero.interface';

const superheroApi = new SuperheroApi();

export const fetchSuperheroes = createAsyncThunk(
    'superheroes/fetchSuperheroes',
    async () => {
        return await superheroApi.getAllSuperheroes();
    }
);

export const fetchSuperhero = createAsyncThunk(
    'superheroes/fetchSuperhero',
    async (id: number) => {
        return await superheroApi.getSuperheroById(id);
    }
);
export const createSuperhero = createAsyncThunk(
    'superheroes/createSuperhero',
    async (superheroData: ISuperhero) => {
        return await superheroApi.createSuperhero(superheroData);
    }
);

export const updateSuperhero = createAsyncThunk(
    'superheroes/updateSuperhero',
    async ({ id, updatedSuperheroData }: { id: number, updatedSuperheroData: ISuperhero }) => {
        return await superheroApi.updateSuperhero(id, updatedSuperheroData);
    }
);

export const deleteSuperhero = createAsyncThunk(
    'superheroes/deleteSuperhero',
    async (id: number) => {
        return await superheroApi.deleteSuperhero(id);
    }
);


const superheroesSlice = createSlice({
    name: 'superheroes',
    initialState: {
        list: [] as ISuperhero[],
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSuperheroes.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchSuperhero.fulfilled, (state, action) => {
                const superhero = action.payload;
                const index = state.list.findIndex(hero => hero.id === superhero.id);
                if (index !== -1) {
                    state.list[index] = superhero;
                }
                state.loading = false;
            })
            .addCase(createSuperhero.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(updateSuperhero.fulfilled, (state, action) => {
                state.list = state.list.map(hero =>
                    hero.id === action.payload.id ? action.payload : hero
                );
            })
            .addCase(deleteSuperhero.fulfilled, (state, action) => {
                const delSuperhero = action.payload;
                state.list = state.list.filter(hero => hero.id !== +delSuperhero.id);
            });
    }
})

export default superheroesSlice.reducer;
