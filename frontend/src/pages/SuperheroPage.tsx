import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchSuperhero } from '../app/superheroSlice';
import SuperheroDetail from '../features/superheroes/SuperheroDetail';
import { Container, Typography } from '@mui/material';
const SuperheroPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
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

    if (!superhero) {
        return <div>Loading...</div>;
    }

    return (
        <Container maxWidth="md"> 
            <Typography variant="h4" align="center" gutterBottom> 
                Superhero Details
            </Typography>
            <SuperheroDetail superhero={superhero} />
        </Container>
    );
};

export default SuperheroPage;
