import React from 'react';
import { ISuperhero } from '../../interfaces/superhero.interface';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { deleteSuperhero } from '../../app/superheroSlice';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CardContent, ListItemIcon } from '@mui/material';

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
        <Card>
            <CardContent>
                <Typography variant="h4">Nickname: {nickname}</Typography>
                <Typography variant="body1">Real Name: {real_name}</Typography>
                <Typography variant="body1">Catch phrase: {catch_phrase}</Typography>
                <Typography variant="body1">Origin description: {origin_description}</Typography>
                <Typography variant="body1">Superpowers:</Typography>
                <List>
                    {superpowers.map((power, index) => (
                        <ListItem key={index}>
                            <ListItemIcon>
                                {index + 1}
                            </ListItemIcon>
                            <ListItemText primary={power} />
                        </ListItem>
                    ))}
                </List>
                {heroimages.map((image, index) => (
                    <img key={index} src={image} alt={`${superhero.nickname} - Image ${index}`} width="300" height="200" />
                ))}
            </CardContent>
            <Button onClick={handleBack}>Назад</Button>
            <Link to={`/superhero/edit/${id}`}>
                <Button startIcon={<EditIcon />}>Редагувати</Button>
            </Link>
            <Button startIcon={<DeleteIcon />} onClick={handleDelete}>Видалити</Button>
        </Card>
    );
};

export default SuperheroDetail;
