// EditSuperheroPage.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSuperhero, updateSuperhero } from '../app/superheroSlice';
import SuperheroForm from './SuperheroForm';
import { ISuperhero } from '../interfaces/superhero.interface';

const EditSuperheroPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const superhero = useSelector((state: RootState) => {
        if (id !== undefined) {
            return state.superheroes.list.find(hero => hero.id === +id)
        } else {
            return undefined;
        }
    });

    useEffect(() => {
        if (id) {
            dispatch(fetchSuperhero(+id));
        }
    }, [dispatch, id]);

    const handleUpdate = (updatedSuperheroData: ISuperhero) => {
        const { id, ...rest } = updatedSuperheroData;
        if (id !== undefined) {
            dispatch(updateSuperhero({ id: +id, updatedSuperheroData: rest }));
            navigate(`/superhero/${id}`);
        }


    }

    if (!superhero) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Edit Superhero</h2>
            <SuperheroForm
                initialData={superhero}
                handleSubmit={handleUpdate}
                nickname={superhero.nickname}
                real_name={superhero.real_name}
                origin_description={superhero.origin_description}
                superpowers={superhero.superpowers}
                catch_phrase={superhero.catch_phrase}
                heroimages={superhero.heroimages} />
        </div>
    );
};

export default EditSuperheroPage;
