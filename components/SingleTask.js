import React from 'react';
import { Box, Heading, Text } from 'native-base';
import { Botao } from './Botao';
import { AntDesign } from '@expo/vector-icons';
import { api } from '../API';
import { useNavigation } from '@react-navigation/native';

export function SingleTask({ lista }) {
  const navigation = useNavigation();

  const excluirTarefa = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
    } catch (error) {
      console.error('Erro ao excluir a tarefa:', error);
    }
  };

  const moverTarefa = async (id, direction) => {
    let newStep;
    if (direction === 'up') {
      if (lista.step === 'Pronto') {
        newStep = 'Em andamento';
      } else if (lista.step === 'Em andamento') {
        newStep = 'Para fazer';
      } else {
        return; 
      }
    } else if (direction === 'down') {
      if (lista.step === 'Para fazer') {
        newStep = 'Em andamento';
      } else if (lista.step === 'Em andamento') {
        newStep = 'Pronto';
      } else {
        return; 
      }
    }

    try {
      await api.patch(`/tasks/${id}/update-step`, { step: newStep });
    } catch (error) {
      console.error('Erro ao mover a tarefa:', error);
    }
  };

  return (
    <Box p={3} bg={'white'} w={'100%'} gap={1} borderRadius={10}>
      <Text>#{lista.id}</Text>
      <Heading size="md">{lista.title}</Heading>
      <Text>{lista.description}</Text>
      <Box
        gap={3}
        flexDirection={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        w={'100%'}>
        <Botao bgColor={'muted.300'} action={() => moverTarefa(lista.id, 'up')}>
          <AntDesign name="arrowup" size={18} color="black" />
        </Botao>
        <Botao bgColor={'muted.300'} action={() => moverTarefa(lista.id, 'down')}>
          <AntDesign name="arrowdown" size={18} color="black" />
        </Botao>
        <Botao
          action={() => excluirTarefa(lista.id)}
          bgColor={'danger.500'}
          textColor={'white'}>
          Excluir
        </Botao>
        <Botao bgColor={'#254560'} textColor={'white'}  action={() => navigation.navigate('Editar', { id: lista.id })}>
          Editar
        </Botao>
      </Box>
    </Box>
  );
}
