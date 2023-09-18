import React from 'react';
import { ISuperhero } from '../../interfaces/superhero.interface';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { deleteSuperhero } from '../../app/superheroSlice';
import { Link, useNavigate } from 'react-router-dom';

interface SuperheroDetailProps {
    superhero: ISuperhero;
}

const SuperheroDetail: React.FC<SuperheroDetailProps> = ({ superhero }) => {
    const { id, nickname, real_name, origin_description, superpowers, heroimages, catch_phrase } = superhero;
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleDelete = () => {
        if (id) {
            dispatch(deleteSuperhero(id));
            navigate('/');
        }
    }

    const handleBack = () => {
        navigate('/');
    }
    return (
        <div>
            <div>
                <h2>Nickname: {nickname}</h2>
                <p>Real Name: {real_name}</p>
                <p>Catch phrase: {catch_phrase}</p>
                <p>Origin description: {origin_description}</p>
                <p>Superpowers:</p>
                <ul>
                    {superpowers.map((power, index) => (
                        <li key={index}>{power}</li>
                    ))}
                </ul>
                {heroimages.map((image, index) => (
                    <img key={index} src={image} alt={`${superhero.nickname} - Image ${index}`} width="300"
                        height="200" />
                ))}
            </div>
            <Link to={`/superhero/edit/${id}`}>
                <button>Редагувати</button>
            </Link>
            <button onClick={handleBack}>Назад</button>
            <button onClick={handleDelete}>Видалити</button>
        </div>

    );
};

export default SuperheroDetail;
