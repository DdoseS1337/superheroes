import { Link } from 'react-router-dom';
import React from 'react';
import { ISuperhero } from '../../interfaces/superhero.interface';


interface SuperheroListProps {
    superheroes: ISuperhero[];
}

const SuperheroList: React.FC<SuperheroListProps> = ({ superheroes }) => {
    return (
        <div>
            {superheroes.map(superhero => (
                <div key={superhero.id}>
                    <h2>{superhero.nickname}</h2>
                    <img src={superhero.heroimages[0]} alt={superhero.nickname} width="300" 
                        height="200" />
                    <Link to={`/superhero/${superhero.id}`}>Details</Link>
                </div>
            ))}
        </div>
    );
};

export default SuperheroList;