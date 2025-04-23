import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Product } from '../types/product';

interface ProductFormProps {
    onSubmit: (product: Product) => void;
    editProduct?: Product | null;
    onCancel: () => void;
}

const initialProduct: Product = {
    name: '',
    price: 0
};

export const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, editProduct, onCancel }) => {
    const [product, setProduct] = useState<Product>(initialProduct);

    useEffect(() => {
        if (editProduct) {
            setProduct(editProduct);
        } else {
            setProduct(initialProduct);
        }
    }, [editProduct]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(product);
        setProduct(initialProduct);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: name === 'price' ? Number(value) : value
        }));
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: '20px auto' }}>
            <Typography variant="h5" gutterBottom>
                {editProduct ? 'Edit Product' : 'Add New Product'}
            </Typography>
            <TextField
                fullWidth
                label="Product Name"
                name="name"
                value={product.name}
                onChange={handleChange}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={product.price}
                onChange={handleChange}
                margin="normal"
                required
                inputProps={{ min: 0, step: 0.01 }}
            />
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    {editProduct ? 'Update' : 'Add'} Product
                </Button>
                {editProduct && (
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={onCancel}
                        fullWidth
                    >
                        Cancel
                    </Button>
                )}
            </Box>
        </Box>
    );
}; 