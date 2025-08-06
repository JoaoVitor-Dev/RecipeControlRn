
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  ActivityIndicator, 
  Alert,
  RefreshControl 
} from 'react-native';
 import { getDBConnection, obterHistoricoMetas } from '../services/database';

const History = () => {
  const [metas, setMetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);


  const carregarHistorico = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const db = await getDBConnection();
      const historicoMetas = await obterHistoricoMetas(db);
      setMetas(historicoMetas);
      
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
      Alert.alert('Erro', 'Não foi possível carregar o histórico de metas');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    carregarHistorico();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    carregarHistorico();
  };

  const renderMetaItem = ({ item }) => {
    const isAlcancada = item.status === 'ALCANÇADA';
    const porcentagem = item.quantidade > 0 ? Math.round((item.totalVendas / item.quantidade) * 100) : 0;

    return (
      <View style={styles.metaCard}>
        <View style={styles.metaHeader}>
          <Text style={styles.metaPeriodo}>{item.mes} {item.ano}</Text>
          <View style={[
            styles.statusBadge, 
            { backgroundColor: isAlcancada ? '#10B981' : '#000000ff' }
          ]}>
            <Text style={styles.statusText}>
              {isAlcancada ? '✓ ALCANÇADA' : '✗ NÃO ALCANÇADA'}
            </Text>
          </View>
        </View>
        
        <Text style={styles.metaNome}>{item.nome}</Text>
        
        <View style={styles.metaDetalhes}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Meta:</Text>
            <Text style={styles.metaValor}>{item.quantidade}</Text>
          </View>
          
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Vendas:</Text>
            <Text style={[
              styles.metaValor,
              { color: isAlcancada ? '#10B981' : '#6B7280' }
            ]}>
              {item.totalVendas}
            </Text>
          </View>
          
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Performance:</Text>
            <Text style={[
              styles.metaValor,
              { color: porcentagem >= 100 ? '#10B981' : porcentagem >= 80 ? '#F59E0B' : '#EF4444' }
            ]}>
              {porcentagem}%
            </Text>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <View style={[
              styles.progressBar, 
              { 
                width: `${Math.min(porcentagem, 100)}%`,
                backgroundColor: isAlcancada ? '#10B981' : '#000000ff'
              }
            ]} />
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000000ff" />
          <Text style={styles.loadingText}>Carregando histórico...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Histórico de Metas</Text>
        <Text style={styles.headerSubtitle}>
          {metas.length} {metas.length === 1 ? 'meta encontrada' : 'metas encontradas'}
        </Text>
      </View>
      
      {metas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma meta encontrada</Text>
          <Text style={styles.emptySubtext}>
            Cadastre sua primeira meta para começar a acompanhar seu histórico
          </Text>
        </View>
      ) : (
        <FlatList
          data={metas}
          renderItem={renderMetaItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
              colors={['#6B46C1']}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  listContainer: {
    padding: 16,
  },
  metaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 1,
  },
  metaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metaPeriodo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  metaNome: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 16,
    fontWeight: '500',
  },
  metaDetalhes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metaItem: {
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '500',
  },
  metaValor: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBackground: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
});

export default History;