import React, { useEffect } from 'react';
import { View, Image, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getDBConnection } from '../services/database';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-gesture-handler';
import colors from '../styles/colors';
import NavigationBottom from '../components/navigationBottom'
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import OpticalSet, { opticalSet } from '../components/opticalSet'

export default function home({ }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbar} />
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Resumo do Mês</Text>
                <Text style={styles.cardItem}>Total: 10</Text>
                <Text style={styles.cardItem}>Meta: 120</Text>
                <Image source={require('../../assets/target.png')} style={styles.image} />
            </View>

            <Image source={require('../../assets/optical.png')} style={styles.opticalImage} />

            {/* <OpticalSet style={{ flex: 1 }} /> */}

            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>Nova Venda</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignContent: 'center'
    },
    card: {
        backgroundColor: colors.purple_primary,
        margin: 16,
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
    image: {
        width: 85,
        height: 85,
        position: 'absolute',
        top: 20,
        right: 20,
    },
    button: {
        margin: 16,
        backgroundColor: colors.purple_primary,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        top: '20%'
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