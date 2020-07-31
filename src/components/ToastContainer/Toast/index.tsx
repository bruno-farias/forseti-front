import React, { useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import { ToastMessage, useToast } from '../../../hooks/toast';

import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <Icon name="info circle" size="large" />,
  error: <Icon name="warning circle" size="large" />,
  success: <Icon name="check circle" size="large" />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container type={message.type} hasdescription={Number(!!message.description)} style={style}>
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <Icon name="close" />
      </button>
    </Container>
  );
};

export default Toast;
