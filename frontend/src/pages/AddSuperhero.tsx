import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSuperhero } from '../app/superheroSlice';
import { AppDispatch } from '../app/store';
import { ISuperhero } from '../interfaces/superhero.interface';

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
            <div>
                <label>Nickname:</label>
                <input
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Real Name:</label>
                <input
                    type="text"
                    name="real_name"
                    value={formData.real_name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Origin Description:</label>
                <input
                    type="text"
                    name="origin_description"
                    value={formData.origin_description}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Superpowers:</label>
                <input
                    type="text"
                    name="superpowers"
                    value={formData.superpowers.join(',')}
                    onChange={(e) => {
                        const superpowers = e.target.value.split(',');
                        setFormData({ ...formData, superpowers });
                    }}
                />
            </div>
            <div>
                <label>Catch Phrase:</label>
                <input
                    type="text"
                    name="catch_phrase"
                    value={formData.catch_phrase}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Hero Images (comma-separated URLs):</label>
                <input
                    type="text"
                    name="heroimages"
                    value={formData.heroimages.join(',')}
                    onChange={(e) => {
                        const heroimages = e.target.value.split(',');
                        setFormData({ ...formData, heroimages });
                    }}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddSuperheroForm;
