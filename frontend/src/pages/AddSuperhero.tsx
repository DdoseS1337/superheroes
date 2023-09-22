import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSuperhero } from '../app/superheroSlice';
import { AppDispatch } from '../app/store';
import { ISuperhero } from '../interfaces/superhero.interface';
import { Button, TextField, Box } from '@mui/material';
import schema from '../utils/validationSchema';
import SuperheroForm from './SuperheroForm';

const AddSuperheroForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const formData = {
        nickname: '',
        real_name: '',
        origin_description: '',
        superpowers: [],
        catch_phrase: '',
        heroimages: []
    }


    const handleSubmit = (superHeroData: ISuperhero) => {
        dispatch(createSuperhero(superHeroData))
    };

    return (
        <Box sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}>
            <SuperheroForm
                initialData={formData}
                handleSubmit={handleSubmit}
                nickname={formData.nickname}
                real_name={formData.real_name}
                origin_description={formData.origin_description}
                superpowers={formData.superpowers}
                catch_phrase={formData.catch_phrase}
                heroimages={formData.heroimages} />
        </Box>
    );
};

export default AddSuperheroForm;
