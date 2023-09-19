import React, { useState } from 'react';
import { ISuperhero } from '../interfaces/superhero.interface';
import { TextField, Button } from '@mui/material';

interface SuperheroFormProps extends ISuperhero {
    initialData: {
        nickname: string;
        real_name: string;
        origin_description: string;
        superpowers: string[];
        catch_phrase: string;
        heroimages: string[];
    };
    handleSubmit: (formData: any) => void;
}

const SuperheroForm: React.FC<SuperheroFormProps> = ({ initialData, handleSubmit }) => {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(formData);
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <div style={{ marginBottom: '1rem' }}>
                <TextField
                    fullWidth
                    label="Nickname"
                    variant="outlined"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                />
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <TextField
                    fullWidth
                    label="Real Name"
                    variant="outlined"
                    name="real_name"
                    value={formData.real_name}
                    onChange={handleChange}
                />
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <TextField
                    fullWidth
                    label="Origin Description"
                    variant="outlined"
                    name="origin_description"
                    value={formData.origin_description}
                    onChange={handleChange}
                />
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <TextField
                    fullWidth
                    label="Superpowers (comma-separated)"
                    variant="outlined"
                    name="superpowers"
                    value={formData.superpowers}
                    onChange={handleChange}
                />
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <TextField
                    fullWidth
                    label="Catch Phrase"
                    variant="outlined"
                    name="catch_phrase"
                    value={formData.catch_phrase}
                    onChange={handleChange}
                />
            </div>

            <div>
                <TextField
                    fullWidth
                    label="Hero Images (comma-separated URLs)"
                    variant="outlined"
                    name="heroimages"
                    value={formData.heroimages}
                    onChange={handleChange}
                />
            </div>

            <Button type="submit" variant="contained" fullWidth>
                Save Changes
            </Button>
        </form>
    );
};

export default SuperheroForm;
