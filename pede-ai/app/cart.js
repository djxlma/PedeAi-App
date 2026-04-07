import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';

export default function Cart() {
  const { carrinho } = useLocalSearchParams();
  const router = useRouter();

  const [itens, setItens] = useState(
    carrinho ? JSON.parse(carrinho) : []
  );

  const [horario, setHorario] = useState('');
  const [pagamento, setPagamento] = useState('');

  const total = itens.reduce((acc, item) => acc + item.preco, 0);

  const removerItem = (index) => {
    const novoCarrinho = [...itens];
    novoCarrinho.splice(index, 1);
    setItens(novoCarrinho);
  };

  const finalizarPedido = () => {
    if (itens.length === 0) {
      Alert.alert('Erro', 'Seu carrinho está vazio!');
      return;
    }

    if (!horario || !pagamento) {
      Alert.alert('Erro', 'Preencha horário e pagamento!');
      return;
    }

    router.push({
      pathname: '/status',
      params: {
        total: total,
        horario: horario,
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Carrinho</Text>

      {itens.length === 0 ? (
        <Text style={styles.vazio}>Seu carrinho está vazio</Text>
      ) : (
        itens.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.nome}>
              {item.nome} - R$ {item.preco.toFixed(2)}
            </Text>

            <TouchableOpacity
              style={styles.botaoRemover}
              onPress={() => removerItem(index)}
            >
              <Text style={styles.textoRemover}>Remover</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      <Text style={styles.total}>
        Total: R$ {total.toFixed(2)}
      </Text>

      {/* CHECKOUT */}
      <Text style={styles.label}>Horário de retirada</Text>
      <TextInput
        style={styles.input}
        placeholder="12:30"
        value={horario}
        onChangeText={setHorario}
      />

      <Text style={styles.label}>Forma de pagamento</Text>
      <TextInput
        style={styles.input}
        placeholder="Pix / Cartão / Dinheiro"
        value={pagamento}
        onChangeText={setPagamento}
      />

      <TouchableOpacity style={styles.botao} onPress={finalizarPedido}>
        <Text style={styles.textoBotao}>Finalizar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f6f5ff',
  },
  titulo: {
    fontSize: 28,
    color: '#3d13f6',
    marginBottom: 20,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 20,
  },
  item: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  nome: {
    marginBottom: 5,
  },
  botaoRemover: {
    backgroundColor: '#f769b2',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  textoRemover: {
    color: '#fff',
  },
  total: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  label: {
    marginTop: 15,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  botao: {
    backgroundColor: '#3d13f6',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
  },
  textoBotao: {
    color: '#fff',
    textAlign: 'center',
  },
});