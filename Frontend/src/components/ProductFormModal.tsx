import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../constants/constant.js';
import axios from 'axios';
import { Product } from '../types/products';
import toast from 'react-hot-toast';


interface ProductFormModalProps {
  onClose: () => void;
  refreshData: () => void;
  product: Product | null;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ onClose, refreshData, product }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState<string>('');  // Keeping it as string for the input
  const [productDescription, setProductDescription] = useState('');
  const [isInStore, setIsInStore] = useState(false);

  // Populate fields when product is passed
  useEffect(() => {
    if (product) {
      setProductName(product.name);
      setProductPrice(product.prices.toString()); // Convert price to string for input
      setProductDescription(product.description);
      setIsInStore(product.isInStore);
    } else {
      setProductName('');
      setProductPrice('');
      setProductDescription('');
      setIsInStore(false);
    }
  }, [product]);

  const handleSubmit = async () => {
    // Convert productPrice to a number before sending
    const updatedProduct = {
      id: product?.id,
      name: productName,
      prices: productPrice, // Convert price string to number
      description: productDescription,
      isInStore: isInStore,
    };

    try {
      if (product) {
        await axios.put(`${BASE_URL}product/${product.id}`, updatedProduct);
        toast.success('Product updated successfully');
      } else {
        await axios.post(`${BASE_URL}product/`, updatedProduct);
        toast.success('Product added successfully');
      }
      refreshData();
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h3 className="text-lg font-bold">{product ? 'Edit Product' : 'Add Product'}</h3>
        <p className="py-2">Enter product details below</p>
        <form className="space-y-4">
          {product && (
            <div>
              <label className="block text-sm font-medium">Product ID</label>
              <input
                type="text"
                className="input input-bordered w-full bg-gray-100"
                value={product.id}
                readOnly
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium">Product Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Product Price</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Product Description</label>
            <textarea
              className="input input-bordered w-full"
              rows={3}
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isInStore}
              onChange={() => setIsInStore(!isInStore)}
              className="checkbox checkbox-primary"
              id="inStoreCheckbox"
            />
            <label htmlFor="inStoreCheckbox" className="text-sm font-medium">
              Is In Store
            </label>
          </div>
        </form>

        <div className="flex justify-end mt-4 gap-2">
          <button className="btn btn-primary" onClick={handleSubmit}>
            {product ? 'Update Product' : 'Add Product'}
          </button>
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFormModal;
