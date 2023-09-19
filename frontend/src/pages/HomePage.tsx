import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { fetchSuperheroes } from '../app/superheroSlice';
import SuperheroList from '../features/superheroes/SuperheroList';
import { AppDispatch } from '../app/store';
import AddSuperheroForm from './AddSuperhero';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Pagination, Stack } from '@mui/material';

const Homepage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.superheroes.loading);
    const superheroes = useSelector((state: RootState) => state.superheroes.list);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const toggleFormVisibility = () => {
        setIsFormVisible(prev => !prev);
    }

    useEffect(() => {
        dispatch(fetchSuperheroes());
    }, [dispatch]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = superheroes.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (event: React.ChangeEvent<unknown>, pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    return (
        <Container sx={{ marginTop: '1rem' }}>
            <div className="homepage">
                <h2>Superheroes List</h2>
                <Button variant="contained" sx={{ marginBottom: '1rem' }} onClick={toggleFormVisibility}>Open Form</Button>
                {isFormVisible && <AddSuperheroForm />}
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <SuperheroList superheroes={currentItems} />
                        <Stack spacing={2} justifyContent="center" sx={{ marginTop: '1rem' }}>
                            <Pagination
                                count={Math.ceil(superheroes.length / itemsPerPage)}
                                page={currentPage}
                                onChange={paginate}
                            />
                        </Stack>
                    </>
                )}
            </div>
        </Container>
    );
}

export default Homepage;
