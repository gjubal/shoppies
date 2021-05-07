import React from 'react';
import { useTransition } from 'react-spring';

import Banner from './Banner';

import { BannerMessage } from '../../hooks/banner';
import { Container } from './styles';

interface BannerContainerProps {
  messages: BannerMessage[];
}

const BannerContainer: React.FC<BannerContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { top: '-120%', opacity: 0 },
      enter: { top: '0%', opacity: 1 },
      leave: { top: '-120%', opacity: 1 },
    },
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Banner key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default BannerContainer;
