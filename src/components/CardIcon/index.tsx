import React, { MouseEventHandler } from 'react';
import { FiCheckCircle, FiTrash } from 'react-icons/fi';

import { Box } from './styles';

interface CardProps {
  type: 'promote' | 'remove';
  action?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const CardIcon: React.FC<CardProps> = ({ type, action }) => {
  return (
    <Box onClick={action}>
      {type === 'promote' ? <FiCheckCircle /> : <FiTrash color="#c53030" />}
    </Box>
  );
};

export default CardIcon;
