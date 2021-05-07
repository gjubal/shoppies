import React, {
  useContext,
  useState,
  useEffect,
  MouseEventHandler,
} from 'react';

import { StorageContext } from '../../hooks/storage';
import { Container } from './styles';

interface ButtonProps {
  id: string;
  activeVersion: string;
  inactiveVersion: string;
  action: MouseEventHandler<HTMLButtonElement>;
}

const NominationButton: React.FC<ButtonProps> = ({
  id,
  activeVersion,
  inactiveVersion,
  action,
}) => {
  const { persistentNominations, persistentWinners } = useContext(
    StorageContext,
  );
  const [isNominated, setIsNominated] = useState(false);

  useEffect(() => {
    const matchInNominations = persistentNominations.find(
      item => item.imdbID === id,
    );
    const matchInWinners = persistentWinners.find(item => item.imdbID === id);

    if (matchInNominations || matchInWinners) {
      setIsNominated(true);
    } else {
      setIsNominated(false);
    }
  }, [persistentNominations, persistentWinners, id]);

  return (
    <Container type="button" onClick={action} disabled={isNominated}>
      <span>{isNominated ? inactiveVersion : activeVersion}</span>
    </Container>
  );
};

export default NominationButton;
