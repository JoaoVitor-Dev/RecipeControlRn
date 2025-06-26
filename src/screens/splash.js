import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { getDBConnection, createTables } from '../services/database';
import { useNavigation } from '@react-navigation/native';

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

            const [result] = await db.executeSql(
                'SELECT * FROM metas WHERE mes = ? AND ano = ? LIMIT 1', [mes.toString(), ano]
            );

            const isTargetExists = result.rows.length > 0;

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
        checkTarget()
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
    backgroundColor: '#502F7E',
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