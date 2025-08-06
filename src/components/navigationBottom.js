import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';
import home from "../screens/home";
import targetRegister from "../screens/targetRegister";
import History from "../screens/history";
import colors from "../styles/colors";

const { Navigator, Screen } = createBottomTabNavigator();

export function NavigationBottom(){
    return(
        <Navigator 
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.black_primary, 
                tabBarInactiveTintColor: '#9CA3AF',
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 1,
                    borderTopColor: '#E5E7EB',
                    height: 60,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
            }}
        >
            <Screen 
                component={home} 
                name="Meta atual"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon 
                            name={focused ? 'home' : 'home-outline'} 
                            size={size} 
                            color={color} 
                        />
                    ),
                }}
            /> 
            <Screen 
                component={History} 
                name="Histórico"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon 
                            name={focused ? 'bar-chart' : 'bar-chart-outline'} 
                            size={size} 
                            color={color} 
                        />
                    ),
                }}
            />
        </Navigator>
    )
}