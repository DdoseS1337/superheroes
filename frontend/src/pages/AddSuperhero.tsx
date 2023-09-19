import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSuperhero } from '../app/superheroSlice';
import { AppDispatch } from '../app/store';
import { ISuperhero } from '../interfaces/superhero.interface';
import { Button, TextField, Box } from '@mui/material';
import schema from '../utils/validationSchema';

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

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { error } = schema.validate(formData, { abortEarly: false });
        console.log(error);
        if (error) {
            const validationErrors = error.details.reduce(
                (acc, curr) => ({ ...acc, [curr.context!.key!]: curr.message }),
                {}
            );
            setErrors(validationErrors);
            alert('Будь ласка, заповніть всі дані вірно.');
        } else if(Object.values(formData).every(value => value !== '')) {
            setErrors({});
            dispatch(createSuperhero(formData));
        } else {
            alert('Будь ласка, заповніть всі поля форми.');
        }
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
                    label="Superpowers (comma-separated)"
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
