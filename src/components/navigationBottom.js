import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import home from "../screens/home";
import targetRegister from "../screens/targetRegister";

const { Navigator, Screen } = createBottomTabNavigator();

export function NavigationBottom(){

    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen component = {home} name="Meta atual"/> 
            <Screen component={targetRegister} name="Relatório"/>
        </Navigator>
    )
}