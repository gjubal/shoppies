import React, { useEffect } from 'react';
import { FiInfo, FiXCircle } from 'react-icons/fi';

import { BannerMessage, useBanner } from '../../../hooks/banner';
import { Container } from './styles';

interface BannerProps {
  message: BannerMessage;
  style: Record<string, unknown>;
}

const icons = {
  info: <FiInfo size={24} />,
};

const Banner: React.FC<BannerProps> = ({ message, style }) => {
  const { removeBanner } = useBanner();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeBanner(message.id);
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeBanner, message.id]);

  return (
    <Container description={Number(!!message.description)} style={style}>
      {icons.info}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button type="button" onClick={() => removeBanner(message.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Banner;
