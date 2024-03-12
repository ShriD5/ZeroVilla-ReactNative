import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Title, Paragraph, Card, Button } from 'react-native-paper';

const ProductDetailsScreen = ({ route, navigation }) => {
    const { product } = route.params;
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const addToCart = async () => {
        try {
            const cartItems = await AsyncStorage.getItem('cartItems');
            let items = cartItems ? JSON.parse(cartItems) : [];
            items.push(product);
            await AsyncStorage.setItem('cartItems', JSON.stringify(items));
            setIsAddedToCart(true);
        } catch (error) {
            console.error(error);
        }
    };

    const navigateToCart = () => {
        navigation.navigate('Cart');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Card style={styles.card}>
                <Card.Cover source={{ uri: product.image }} style={styles.cover} />
                <Card.Content>
                    <Title>{product.title}</Title>
                    <Paragraph>{product.description}</Paragraph>
                    <Paragraph style={styles.price}>Price: ${product.price}</Paragraph>
                </Card.Content>
                <Card.Actions>
                    {isAddedToCart ? (
                        <Button mode="contained" style={styles.button} onPress={navigateToCart}>
                            View Cart
                        </Button>
                    ) : (
                        <Button mode="contained" style={styles.button} onPress={addToCart}>
                            Add to Cart
                        </Button>
                    )}
                </Card.Actions>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
    card: {
        marginVertical: 8,
    },
    cover: {
        height: 300,
    },
    price: {
        marginTop: 8,
        fontWeight: 'bold',
    },
    button: {
        marginHorizontal: 8,
    },
});

export default ProductDetailsScreen;