import React from 'react';
import { ISuperhero } from '../../interfaces/superhero.interface';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

interface SuperheroListProps {
    superheroes: ISuperhero[];
}

const SuperheroList: React.FC<SuperheroListProps> = ({ superheroes }) => {
    return (
        <Grid container spacing={2}>
            {superheroes.map(superhero => (
                <Grid item key={superhero.id} xs={12} sm={6} md={4} lg={3}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="300"
                            image={superhero.heroimages[0]}
                            alt={superhero.nickname}
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {superhero.nickname}
                            </Typography>
                            <Link to={`/superhero/${superhero.id}`}>Details</Link>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default SuperheroList;
