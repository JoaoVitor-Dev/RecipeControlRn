import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { getDBConnection } from '../services/database';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-gesture-handler';

export default function home(){
    return(
        <Text>Home</Text>
    )
}
