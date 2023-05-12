import { Box, Button, Flex, Heading, Highlight, Text } from '@chakra-ui/react';
import { HelperMessage } from '../../molecules/HelperMessage/HelperMessage';
import { HeaderProps } from './header.interfaces';
import { useNavigate } from 'react-router-dom';

export const Header = ({ title, message }: HeaderProps) => {
  const navigate = useNavigate();

  const texts = message ? message.split('\\n') : [''];
  return (
    <Flex
      width="100%"
      flexDirection="column"
      position="fixed"
      top="0"
      zIndex="2"
    >
      <Flex
        bg="black.500"
        p={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          bg="yellow.500"
          h={6}
          color="black.500"
          onClick={() => navigate('/')}
        >
          Voltar
        </Button>
        {title && (
          <Heading fontSize="24px" color="white.1000">
            {title}
          </Heading>
        )}
        <HelperMessage>
          <>
            {texts.map(text => {
              return (
                <>
                  <Text>{text}</Text>
                  <br></br>
                </>
              );
            })}
          </>
        </HelperMessage>
      </Flex>
    </Flex>
  );
};
