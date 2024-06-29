import {
  Box,
  FormControl,
  Input,
  Heading,
  TextArea,
  Select,
} from 'native-base';
import { useState, useEffect } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Botao } from '../components/Botao';
import { api, AxiosError } from '../API';
import { useRoute } from '@react-navigation/native';

const stepSchema = yup
  .string()
  .matches(
    /Para fazer|Em andamento|Pronto/,
    'Os passos devem ser "Para fazer", "Em andamento" ou "Pronto"'
  );

const taskSchema = yup.object({
  title: yup
    .string()
    .required('É necessário informar o título')
    .min(4, 'O título precisa ter pelo menos 4 caracteres')
    .max(64, 'O título pode ter no máximo 64 caracteres'),
  description: yup
    .string()
    .required('É necessário informar a descrição')
    .min(8, 'A descrição precisa ter pelo menos 8 caracteres')
    .max(128, 'A descrição pode ter no máximo 128 caracteres'),
  step: stepSchema,
});

export function EditarTarefa({ navigation }) {
  const route = useRoute();
  const { id } = route.params;
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    step: 'Para fazer',
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/tasks/${id}`);
        setInitialValues(response.data);
      } catch (error) {
        console.error('Erro ao buscar a tarefa:', error);
      }
    };

    fetchTask();
  }, [id]);

  return (
    <Box safeArea w="100%" h="100%" bg={'rgba(0, 0, 0, 0.8)'} p={10}>
      <Box
        justifyContent="center"
        alignItems="center"
        bg="white"
        p={4}
        marginTop={50}
        borderWidth={1}
        borderColor="#254560"
        borderRadius={5}>
        <Formik
          enableReinitialize
          validationSchema={taskSchema}
          initialValues={initialValues}
          onSubmit={async (values, { resetForm, setFieldError }) => {
            try {
              await api.put(`/tasks/${id}`, values);
              resetForm();
              navigation.navigate('Tarefas');
            } catch (error) {
              if (error instanceof AxiosError) {
                const field = error.response.data.path;
                const errorMessage = error.response.data.message;
                setFieldError(field, errorMessage);
              } else {
                throw error;
              }
            }
          }}>
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <>
              <Heading>Editar Tarefa</Heading>
              <FormControl
                width="100%"
                marginTop={2}
                isInvalid={errors.title && touched.title}>
                <FormControl.Label>Título:</FormControl.Label>
                <Input
                  placeholder={'Digite o título da tarefa'}
                  type={'text'}
                  value={values.title}
                  onChangeText={handleChange('title')}
                  name={'title'}
                />
                <FormControl.ErrorMessage>
                  {errors.title}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                width="100%"
                marginTop={2}
                isInvalid={errors.description && touched.description}>
                <FormControl.Label>Descrição:</FormControl.Label>
                <TextArea
                  placeholder={'Digite a descrição da tarefa'}
                  type={'text'}
                  value={values.description}
                  onChangeText={handleChange('description')}
                  name={'description'}
                />
                <FormControl.ErrorMessage>
                  {errors.description}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                width="100%"
                marginTop={2}
                isInvalid={errors.step && touched.step}>
                <FormControl.Label>Situação:</FormControl.Label>
                <Select
                  selectedValue={values.step}
                  minWidth="200"
                  placeholder="Selecione a situação"
                  onValueChange={handleChange('step')}
                  _selectedItem={{
                    bg: '#254560',
                    _text: { color: 'white' },
                  }}>
                  <Select.Item label="Para fazer" value="Para fazer" />
                  <Select.Item label="Em andamento" value="Em andamento" />
                  <Select.Item label="Pronto" value="Pronto" />
                </Select>
                <FormControl.ErrorMessage>
                  {errors.step}
                </FormControl.ErrorMessage>
              </FormControl>
              <Botao
                action={handleSubmit}
                bgColor={'#254560'}
                textColor={'white'}
                mt={5}>
                Enviar
              </Botao>
            </>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
