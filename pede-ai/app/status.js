import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Status() {
  const params = useLocalSearchParams();

  const pedido = params.pedido ? JSON.parse(params.pedido) : [];
  const total = params.total || '0.00';
  const horario = params.horario || '-';
  const pagamento = params.pagamento || '-';

  const [tempo, setTempo] = useState(20);
  const [status, setStatus] = useState('Pedido recebido');

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTempo((prev) => {
        if (prev <= 1) {
          clearInterval(intervalo);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    if (tempo > 15) {
      setStatus('Pedido recebido');
    } else if (tempo > 5) {
      setStatus('Preparando...');
    } else if (tempo > 0) {
      setStatus('Quase pronto...');
    } else {
      setStatus('Pronto para retirada!');
    }
  }, [tempo]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Status do Pedido</Text>

      <View style={styles.card}>
        {pedido.map((item) => (
          <Text key={item.id} style={styles.item}>
            {item.nome} x{item.quantidade}
          </Text>
        ))}

        <Text style={styles.info}>Horário: {horario}</Text>
        <Text style={styles.info}>Pagamento: {pagamento}</Text>
        <Text style={styles.info}>Total: R$ {Number(total).toFixed(2)}</Text>

        <Text style={styles.status}>Status: {status}</Text>
        <Text style={styles.tempo}>Tempo estimado: {tempo}s</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f5ff',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3d13f6',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  item: {
    fontSize: 16,
    marginBottom: 8,
    color: '#08011e',
  },
  info: {
    fontSize: 16,
    marginTop: 8,
    color: '#08011e',
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 18,
    color: '#f769b2',
  },
  tempo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#3d13f6',
  },
});