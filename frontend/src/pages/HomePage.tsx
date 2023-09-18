import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { fetchSuperheroes } from '../app/superheroSlice';
import SuperheroList from '../features/superheroes/SuperheroList';
import { AppDispatch } from '../app/store';
import AddSuperheroForm from './AddSuperhero';

const Homepage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.superheroes.loading);
    const superheroes = useSelector((state: RootState) => state.superheroes.list);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const toggleFormVisibility = () => {
        setIsFormVisible(prev => !prev);
    }

    useEffect(() => {
        dispatch(fetchSuperheroes());
    }, [dispatch]);

    return (
        <div className="homepage">
            <h2>Superheroes List</h2>
            <button onClick={toggleFormVisibility}>Open Form</button>
            {isFormVisible && <AddSuperheroForm />}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <SuperheroList superheroes={superheroes} />
            )}
        </div>
    );
}

export default Homepage;
