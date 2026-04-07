import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';

export default function Cart() {
  const { carrinho } = useLocalSearchParams();
  const router = useRouter();

  // 🔥 adiciona quantidade automaticamente
  const inicial = carrinho ? JSON.parse(carrinho) : [];

  const agruparItens = (lista) => {
    const mapa = {};

    lista.forEach((item) => {
      if (mapa[item.nome]) {
        mapa[item.nome].quantidade += 1;
      } else {
        mapa[item.nome] = { ...item, quantidade: 1 };
      }
    });

    return Object.values(mapa);
  };

  const [itens, setItens] = useState(agruparItens(inicial));
  const [horario, setHorario] = useState('');
  const [pagamento, setPagamento] = useState('');

  const total = itens.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  // ➕ aumentar quantidade
  const aumentar = (index) => {
    const novo = [...itens];
    novo[index].quantidade += 1;
    setItens(novo);
  };

  // ➖ diminuir quantidade
  const diminuir = (index) => {
    const novo = [...itens];

    if (novo[index].quantidade > 1) {
      novo[index].quantidade -= 1;
    } else {
      novo.splice(index, 1);
    }

    setItens(novo);
  };

  const finalizarPedido = () => {
    if (itens.length === 0) {
      Alert.alert('Erro', 'Carrinho vazio');
      return;
    }

    if (!horario || !pagamento) {
      Alert.alert('Erro', 'Preencha horário e pagamento');
      return;
    }

    router.push({
      pathname: '/status',
      params: {
        total,
        horario,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Carrinho</Text>

      {itens.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text>
            {item.nome} - R$ {item.preco.toFixed(2)}
          </Text>

          {/* 🔥 QUANTIDADE */}
          <View style={styles.quantidadeContainer}>
            <TouchableOpacity onPress={() => diminuir(index)} style={styles.qtdBtn}>
              <Text>-</Text>
            </TouchableOpacity>

            <Text style={styles.qtdTexto}>x{item.quantidade}</Text>

            <TouchableOpacity onPress={() => aumentar(index)} style={styles.qtdBtn}>
              <Text>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

      {/* 🔥 HORÁRIO */}
      <Text style={styles.label}>Horário:</Text>
      <View style={styles.opcoes}>
        {['12:00', '12:30', '13:00'].map((h) => (
          <TouchableOpacity
            key={h}
            style={[
              styles.opcao,
              horario === h && styles.opcaoSelecionada,
            ]}
            onPress={() => setHorario(h)}
          >
            <Text>{h}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 🔥 PAGAMENTO */}
      <Text style={styles.label}>Pagamento:</Text>
      <View style={styles.opcoes}>
        {['Pix', 'Cartão', 'Dinheiro'].map((p) => (
          <TouchableOpacity
            key={p}
            style={[
              styles.opcao,
              pagamento === p && styles.opcaoSelecionada,
            ]}
            onPress={() => setPagamento(p)}
          >
            <Text>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

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
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  quantidadeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  qtdBtn: {
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 5,
  },
  qtdTexto: {
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  total: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  label: {
    marginTop: 15,
  },
  opcoes: {
    flexDirection: 'row',
    marginTop: 10,
  },
  opcao: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  opcaoSelecionada: {
    backgroundColor: '#3d13f6',
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