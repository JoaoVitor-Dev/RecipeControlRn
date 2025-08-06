import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { getDBConnection, createTables, getTargetInOpen } from '../services/database';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';

export default function splash(){

    const navigation = useNavigation();

    useEffect(() => {
        const checkTarget = async () => {
        try{
            const db = await getDBConnection();

            await createTables(db)

            const now = new Date();
            const mes = now.getMonth() + 1;
            const ano = now.getFullYear();

            const isTargetExists = await getTargetInOpen(db, mes, ano)

            setTimeout(() => {
                navigation.reset({
                    index: 0,
                    routes: [{name: isTargetExists ? 'Home' : 'CadastroMeta'}]
                });
            }, 1500)
            
            }catch(err){
                console.log(err)
            }
        }
        checkTarget();
    }, [])

    return (
    <View style={styles.container}>
       <Image source={require('../../assets/logo_recipe_control_splash.png')} style={styles.image} />
      <ActivityIndicator size="large" color="#333" />
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black_primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 20,
    resizeMode: 'contain',
  },
});