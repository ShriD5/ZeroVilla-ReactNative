import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const CartScreen = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const items = await AsyncStorage.getItem('cartItems');
            setCartItems(items ? JSON.parse(items) : []);
        } catch (error) {
            console.error(error);
        }
    };

    const removeFromCart = async (item) => {
        try {
            const updatedItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
            await AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems));
            setCartItems(updatedItems);
        } catch (error) {
            console.error(error);
        }
    };

    const renderCartItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Cover source={{ uri: item.image }} style={styles.cover} />
            <Card.Content>
                <Title>{item.title}</Title>
                <Paragraph>Price: ${item.price}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button mode="contained" style={styles.button} onPress={() => removeFromCart(item)}>
                    Remove
                </Button>
            </Card.Actions>
        </Card>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCartItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    card: {
        marginVertical: 8,
    },
    cover: {
        height: 200,
    },
    button: {
        marginHorizontal: 8,
    },
});

export default CartScreen;