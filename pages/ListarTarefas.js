import { Box, Heading, Spinner } from 'native-base';
import { useState, useEffect } from 'react';
import { api } from '../API';
import { SingleTask } from '../components/SingleTask';
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native';

export function ListarTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fazer = tarefas.filter((tarefa) => tarefa.step === 'Para fazer');
  const andamento = tarefas.filter((tarefa) => tarefa.step === 'Em andamento');
  const pronto = tarefas.filter((tarefa) => tarefa.step === 'Pronto');

  useEffect(() => {
    api
      .get('/tasks')
      .then((response) => {
        setTarefas(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [tarefas]);

  const renderItem = ({ item }) => <SingleTask lista={item} />;

  function separador() {
    return <Box mt={3} />;
  }

  function listaVazia() {
    return <Box>Não há conteúdo</Box>;
  }

  return (
    <Box safeArea w="100%" h="100%">
      {isLoading ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Spinner size="lg" />
        </Box>
      ) : (
        <ScrollView contentContainerStyle={{ gap: 5 }}>
          <Box justifyContent={'center'} alignItems={'center'} gap={5}>
            <Heading alignSelf={'flex-start'}>Para fazer</Heading>
            <FlatList
              data={fazer}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={separador}
              ListEmptyComponent={listaVazia}
            />
          </Box>
          <Box justifyContent={'center'} alignItems={'center'} gap={3}>
            <Heading alignSelf={'flex-start'}>Em andamento</Heading>
            <FlatList
              data={andamento}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={separador}
              ListEmptyComponent={listaVazia}
            />
          </Box>
          <Box justifyContent={'center'} alignItems={'center'} gap={3}>
            <Heading alignSelf={'flex-start'}>Pronto</Heading>
            <FlatList
              data={pronto}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={separador}
              ListEmptyComponent={listaVazia}
            />
          </Box>
        </ScrollView>
      )}
    </Box>
  );
}
