import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSuperhero } from '../app/superheroSlice';
import { AppDispatch } from '../app/store';
import { ISuperhero } from '../interfaces/superhero.interface';
import { Button, TextField, Box } from '@mui/material';

const AddSuperheroForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState<ISuperhero>({
        nickname: '',
        real_name: '',
        origin_description: '',
        superpowers: [],
        catch_phrase: '',
        heroimages: []
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createSuperhero(formData));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}>
                <TextField
                    label="Nickname"
                    variant="outlined"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                />
                <TextField
                    label="Real Name"
                    variant="outlined"
                    name="real_name"
                    value={formData.real_name}
                    onChange={handleChange}
                />
                <TextField
                    label="Origin Description"
                    variant="outlined"
                    name="origin_description"
                    value={formData.origin_description}
                    onChange={handleChange}
                />
                <TextField
                    label="Superpowers"
                    variant="outlined"
                    name="superpowers"
                    value={formData.superpowers.join(',')}
                    onChange={(e) => {
                        const superpowers = e.target.value.split(',');
                        setFormData({ ...formData, superpowers });
                    }}
                />
                <TextField
                    label="Catch Phrase"
                    variant="outlined"
                    name="catch_phrase"
                    value={formData.catch_phrase}
                    onChange={handleChange}
                />
                <TextField
                    label="Hero Images (URLs comma-separated)"
                    variant="outlined"
                    name="heroimages"
                    value={formData.heroimages.join(',')}
                    onChange={(e) => {
                        const heroimages = e.target.value.split(',');
                        setFormData({ ...formData, heroimages });
                    }}
                />
                <Button type="submit" variant="contained">Submit</Button>
            </Box>
        </form>
    );
};

export default AddSuperheroForm;
