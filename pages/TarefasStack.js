import { createStackNavigator } from '@react-navigation/stack';
import { ListarTarefas } from './ListarTarefas';
import { EditarTarefa } from './EditarTarefa';

const Stack = createStackNavigator();
export function TarefasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tarefas"
        component={ListarTarefas}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Editar"
        component={EditarTarefa}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}