import React, { MouseEventHandler } from 'react';

import { RatingProps } from '../../pages/Landing';
import CardIcon from '../CardIcon';

import { Container } from './styles';

interface TileProps {
  title: string;
  type: 'nomination' | 'winner';
  poster: string;
  ratings?: RatingProps[];
  promote?: MouseEventHandler<HTMLButtonElement> | undefined;
  remove?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const MovieTile: React.FC<TileProps> = ({
  title,
  type,
  poster,
  remove,
  promote,
}) => {
  return (
    <Container>
      {poster !== 'N/A' && <img src={poster} alt={title} />}
      <legend>{title}</legend>
      <div>
        {type === 'nomination' && <CardIcon type="promote" action={promote} />}
        <CardIcon type="remove" action={remove} />
      </div>
    </Container>
  );
};

export default MovieTile;
