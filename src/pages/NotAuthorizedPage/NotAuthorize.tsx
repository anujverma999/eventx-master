import { Container, Title, Text, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const NotAuthorized = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title order={1}>Not Authorized</Title>
      <Text>You don't have permission to access this page.</Text>
      <Button onClick={() => navigate('/')}>
        Return to Dashboard
      </Button>
    </Container>
  );
};

export default NotAuthorized;