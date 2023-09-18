// SuperheroForm.tsx
import React, { useState } from 'react';
import { ISuperhero } from '../interfaces/superhero.interface';

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

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleFormSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        handleSubmit(formData);
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="nickname">Nickname:</label>
                <input
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    id="nickname"
                    style={{ width: '100%', padding: '0.5rem' }}
                />
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="real_name">Real Name:</label>
                <input
                    type="text"
                    name="real_name"
                    value={formData.real_name}
                    onChange={handleChange}
                    id="real_name"
                    style={{ width: '100%', padding: '0.5rem' }}
                />
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="origin_description">Origin Description:</label>
                <input
                    type="text"
                    name="origin_description"
                    value={formData.origin_description}
                    onChange={handleChange}
                    id="origin_description"
                    style={{ width: '100%', padding: '0.5rem' }}
                />
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="superpowers">Superpowers (comma-separated):</label>
                <input
                    type="text"
                    name="superpowers"
                    value={formData.superpowers}
                    onChange={handleChange}
                    id="superpowers"
                    style={{ width: '100%', padding: '0.5rem' }}
                />
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="catch_phrase">Catch Phrase:</label>
                <input
                    type="text"
                    name="catch_phrase"
                    value={formData.catch_phrase}
                    onChange={handleChange}
                    id="catch_phrase"
                    style={{ width: '100%', padding: '0.5rem' }}
                />
            </div>
            <div>
                <label htmlFor="heroimages" >Hero Images (comma-separated URLs):</label>
                <input
                    type="text"
                    name="heroimages"
                    value={formData.heroimages}
                    onChange={handleChange}
                    id="heroimages"
                    style={{ width: '100%', padding: '0.5rem' }}
                />
            </div>
            <button type="submit" style={{ width: '100%', padding: '0.5rem' }}>Save Changes</button>
        </form>

    );
};

export default SuperheroForm;
