import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetailScreen from './screens/ProductDetailScreen';
import HomeScreen from './screens/Homescreen';
import CartScreen from "./screens/CartScreen";
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
    <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: '',
                    headerTitle: 'Zer0',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="ProductDetails"
                component={ProductDetailScreen}
                options={({ route }) => ({
                    title: route.params?.product?.title,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTintColor: '#fff',
                })}
            />
        </Stack.Navigator>
    </SafeAreaView>
);

const Navigation = () => (
    <NavigationContainer>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Cart') {
                        iconName = focused ? 'cart' : 'cart-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                header: () => null,
            })}
        >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Cart" component={CartScreen} />
            {/* <Tab.Screen name="Products" component={ProductsScreen} /> */}
            {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
        </Tab.Navigator>
    </NavigationContainer>
);

export default Navigation;