import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Image,
    Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { getDBConnection, createTables, inserirMeta } from '../services/database';
import color from '../styles/colors'

export default function targetRegister() {

    const navigation = useNavigation();
    const [nome, setNome] = useState('');
    const [meta, setMeta] = useState('');
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

    const handleSalvar = async () => {
        if (!nome || !meta) {
            Alert.alert('Campos obrigatórios', 'Preencha todos os campos.');
            return;
        }

        try {
            const db = await getDBConnection();

            await inserirMeta(db, {
                mes: mesNumero,
                ano: anoAtual,
                nome: nome,
                quantidade: meta, 
            });

        Alert.alert('Meta salva com sucesso!');
        
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });

        } catch (err) {
            console.log(err)
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

            <LinearGradient colors={[color.black_primary, color.black_primary]} style={styles.header} />

            <Text style={styles.monthText}>{mesAtual}</Text>
            <Text style={styles.infoText}></Text>
            <Image source={require('../../assets/target.png')} style={styles.image} />

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Informações da Meta</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Informe seu nome"
                    placeholderTextColor="#999"
                    value={nome}
                    onChangeText={setNome}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Informe a meta"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={meta}
                    onChangeText={setMeta}
                />

                <TouchableOpacity style={styles.button} onPress={handleSalvar}>
                    <Text style={styles.buttonText}>Salvar Meta</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 187,
        width: '100%',
        position: 'absolute',
        top: 0,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    monthText: {
        marginTop: 108,
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 16,
    },
    infoText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 16,
        marginTop: 4,
    },
    image: {
        width: 110,
        height: 110,
        position: 'absolute',
        top: 40,
        right: 20,
    },
    card: {
        marginTop: 32,
        marginHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        elevation: 4, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 16,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: color.black_primary,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});