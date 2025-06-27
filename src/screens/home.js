import React, { useEffect } from 'react';
import { View, Image, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { getDBConnection } from '../services/database';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-gesture-handler';
import colors from '../styles/colors';

export default function home() {    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbar} />
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Resumo do Mês</Text>
                <Text style={styles.cardItem}>Total: 10</Text>
                <Text style={styles.cardItem}>Meta: 120</Text>
                <Image source={require('../../assets/target.png')} style={styles.image} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    // navbar: {
    //     height: 56,
    //     backgroundColor: '#fff',
    //     justifyContent: 'center',
    //     ...Platform.select({
    //         ios: {
    //             shadowColor: '#000',
    //             shadowOffset: { width: 0, height: 2 },
    //             shadowOpacity: 0.1,
    //             shadowRadius: 4,
    //         },
    //         android: {
    //             elevation: 4,
    //         },
    //     }),
    // },
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
});