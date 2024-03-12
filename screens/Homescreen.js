import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Button } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const HomeScreen = ({ navigation }) => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products/categories');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = JSON.parse(JSON.stringify(await response.json()));
            console.log({ data });
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProductsByCategory = async (category) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = JSON.parse(JSON.stringify(await response.json()));
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products by category:', error);
        }
    };

    const handleSearch = async (query) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/category/${query}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = JSON.parse(JSON.stringify(await response.json()));
            setProducts(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <SafeAreaProvider>
        <View style={{ flex: 1, padding: 16 }}>
            <Searchbar
                placeholder="Search products..."
                onChangeText={setSearchQuery}
                value={searchQuery}
                onIconPress={() => handleSearch(searchQuery)}
                style={{ marginBottom: 16 }}
            />

            <View style={styles.categoryContainer}>
                {categories.map((category) => (
                    <Button
                        key={category}
                        mode="outlined"
                        style={styles.categoryButton}
                        onPress={() => fetchProductsByCategory(category)}
                    >
                        {category}
                    </Button>
                ))}
            </View>

            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card
                        style={{ marginVertical: 8 }}
                        onPress={() => navigation.navigate('ProductDetails', { product: item })}
                    >
                        <Card.Cover source={{ uri: item.image }} />
                        <Card.Content>
                            <Title>{item.title}</Title>
                            <Paragraph>${item.price}</Paragraph>
                        </Card.Content>
                    </Card>
                )}
            />
        </View>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    categoryButton: {
        marginRight: 8,
        marginBottom: 8,
    },
});

export default HomeScreen;