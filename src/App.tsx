import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, Alert, Snackbar } from '@mui/material';
import { ProductForm } from './components/ProductForm';
import { ProductList } from './components/ProductList';
import { Product } from './types/product';
import { productApi } from './services/api';

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await productApi.getAllProducts();
            setProducts(data);
        } catch (err) {
            setError('Failed to load products');
        }
    };

    const handleAddProduct = async (product: Product) => {
        try {
            const newProduct = await productApi.createProduct(product);
            setProducts(prev => [...prev, newProduct]);
            setSuccessMessage('Product added successfully');
        } catch (err) {
            setError('Failed to add product');
        }
    };

    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg">
                <ProductForm 
                    onSubmit={handleAddProduct} 
                    onCancel={() => {}} 
                />
                <ProductList products={products} />
                
                <Snackbar
                    open={!!error}
                    autoHideDuration={6000}
                    onClose={() => setError('')}
                >
                    <Alert severity="error" onClose={() => setError('')}>
                        {error}
                    </Alert>
                </Snackbar>

                <Snackbar
                    open={!!successMessage}
                    autoHideDuration={6000}
                    onClose={() => setSuccessMessage('')}
                >
                    <Alert severity="success" onClose={() => setSuccessMessage('')}>
                        {successMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </>
    );
};

export default App; 