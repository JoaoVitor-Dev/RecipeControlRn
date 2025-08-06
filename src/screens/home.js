import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { adicionarVenda, getDBConnection, obterIdMetaAtual, obterMetaComVendas } from '../services/database';
import { Text } from 'react-native-gesture-handler';
import colors from '../styles/colors';

export default function home({ }) {
   const [meta, setMeta] = useState({ id: null, quantidade: 0, totalVendas:0 });
   const [mesAtual, setMesAtual] = useState('');
   const [anoAtual, setAnoAtual] = useState(0);
   const [mesNumero, setMesNumero] = useState('');

   useEffect(() => {
       const date = new Date();
       const meses = [
           'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
           'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
       ];
       setMesAtual(meses[date.getMonth()]);
       setMesNumero((date.getMonth() + 1).toString());
       setAnoAtual(date.getFullYear());
   }, []);

   useEffect(() => {
  
       buscarMeta();
   }, [mesNumero, anoAtual]);

        const buscarMeta = async () => {
           if (mesNumero && anoAtual) {
               try {
                   const db = await getDBConnection();
                   const metaAtual = await obterMetaComVendas(db, mesNumero, anoAtual);
                   setMeta(metaAtual);
               } catch (error) {
                   console.log('Erro ao buscar meta:', error);
                   setMeta({ id: null, quantidade: 0 });
               }
           }
       };

   const handleNovaVenda = async () => {
       try {
           if (!meta.id) {
               Alert.alert('Erro', 'Meta não encontrada para este mês');
               return;
           }
           const db = await getDBConnection();
           await adicionarVenda(db, meta.id);
           Alert.alert('Nova venda adicionada com sucesso!');
           buscarMeta()
       } catch(err) {
           console.log(err);
           Alert.alert('Erro', 'Não foi possível adicionar a venda');
       }
   }

   return (
       <SafeAreaView style={styles.container}>
           <View style={styles.card}>
               <Text style={styles.cardTitle}>Resumo do Mês</Text>
               <Text style={styles.cardItem}>Receitas: {meta.totalVendas}</Text>
               <Text style={styles.cardItem}>Meta atual: {meta.quantidade}</Text>
               <Text style={styles.cardItemPendente}>Pendente: {Math.max(0, meta.quantidade - meta.totalVendas)}</Text>
               <Image source={require('../../assets/target.png')} style={styles.image} />
           </View>

           <Image source={require('../../assets/optical.png')} style={styles.opticalImage} />

           <TouchableOpacity style={styles.button} onPress={handleNovaVenda} >
               <Text style={styles.buttonText}>Registrar Venda</Text>
           </TouchableOpacity>
       </SafeAreaView>
   )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white_primary,
        alignContent: 'center',
        justifyContent: 'space-between'
    },
    card: {
        backgroundColor: colors.black_primary,
        marginLeft: 16,
        marginBottom:16,
        marginRight: 16,
        marginTop: 40,
        borderRadius: 12,
        padding: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: "#fff"
    },
    cardItem: {
        fontSize: 16,
        marginBottom: 8,
        color: '#fff',
    },
    cardItemPendente: {
        fontSize: 14,
        fontStyle: "italic",
        marginBottom: 1,
        color: '#fff',
    },
    image: {
        width: 85,
        height: 85,
        position: 'absolute',
        top: 20,
        right: 20,
    },
    button: {
        margin: 16,
        backgroundColor: colors.black_primary,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        bottom: '0%'
    },
    opticalImage: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});