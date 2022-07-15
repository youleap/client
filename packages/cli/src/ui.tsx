import React, { useState, useEffect } from 'react';
import { Text } from 'ink';
import { handleAuthorization, getToken } from './services/authorization';
import fastify from 'fastify';

const server = fastify();
server.addContentTypeParser('application/x-www-form-urlencoded', () => {});

export default function App(): JSX.Element {
  const [token, setToken] = useState('8085');

  useEffect(() => {
    handleAuthorization('bla123').then((res) => {});
    server.listen({ port: 8085, host: 'localhost' });
    server.get('/', async (request) => {
      const token = await getToken(request.query.code);
      console.log(JSON.stringify(token));
      setToken(token);
      return token;
    });
  }, []);

  return (
    <Text>
      Listening on port <Text color="green">{token}</Text>
    </Text>
  );
}
