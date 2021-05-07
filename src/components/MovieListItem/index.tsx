import React, { MouseEventHandler } from 'react';

import NominationButton from '../NominationButton';
import { RatingProps } from '../../pages/Landing';
import { Container } from './styles';

interface ListItemProps {
  id: string;
  title: string;
  type: string;
  year: string;
  poster: string;
  plot?: string;
  ratings?: RatingProps[];
  awards?: string;
  boxOffice?: string;
  action: MouseEventHandler<HTMLButtonElement>;
}

const MovieListItem: React.FC<ListItemProps> = ({
  id,
  title,
  year,
  poster,
  action,
}) => {
  return (
    <Container>
      <span>
        <legend>{title}</legend>
        <h4>{year}</h4>

        <NominationButton
          id={id}
          activeVersion="Nominate"
          inactiveVersion="Added"
          action={action}
        />
      </span>

      <span>{poster !== 'N/A' && <img src={poster} alt={title} />}</span>
    </Container>
  );
};

export default MovieListItem;
