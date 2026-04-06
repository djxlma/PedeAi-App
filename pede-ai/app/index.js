import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

// Simulação de um banco de dados
const cardapio = [
  {
    id: '1',
    nome: 'Coxinha de Frango',
    descricao: 'Massa crocante com bastante recheio de frango desfiado.',
    preco: 7.50,
    imagem: 'https://picsum.photos/seed/coxinha/100',
    disponivel: true,
  },
  {
    id: '2',
    nome: 'Pão de Queijo',
    descricao: 'Tradicional, assado na hora. Tamanho grande.',
    preco: 5.00,
    imagem: 'https://picsum.photos/seed/pao/100',
    disponivel: true,
  },
  {
    id: '3',
    nome: 'Suco de Laranja',
    descricao: 'Copo 500ml, natural sem açúcar.',
    preco: 8.00,
    imagem: 'https://picsum.photos/seed/suco/100',
    disponivel: false,
  }
];

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Cardápio</Text>
      
      {cardapio.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={{ uri: item.imagem }} style={styles.imagem} />
          
          <View style={styles.infoContainer}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.descricao}>{item.descricao}</Text>
            
            <View style={styles.rodapeCard}>
              <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
              
              {/* Lógica para mudar a cor de acordo com a disponibilidade do item */}
              <Text style={[styles.status, item.disponivel ? styles.statusDisponivel : styles.statusEsgotado]}>
                {item.disponivel ? 'Disponível' : 'Esgotado'}
              </Text>
            </View>

            <TouchableOpacity 
              style={[styles.botao, !item.disponivel && styles.botaoDesativado]}
              disabled={!item.disponivel}
            >
              <Text style={styles.textoBotao}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f5ff',
    padding: 20,
    paddingTop: 50,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3d13f6',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#08011e',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  imagem: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#08011e',
  },
  descricao: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  rodapeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  preco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f769b2',
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusDisponivel: {
    color: '#6ad408',
  },
  statusEsgotado: {
    color: '#d3d3d3',
  },
  botao: {
    backgroundColor: '#3d13f6',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  botaoDesativado: {
    backgroundColor: '#ccc',
  },
  textoBotao: {
    color: '#f6f5ff',
    fontWeight: 'bold',
  }
});