import React from 'react';
import { Product } from '../types/products'; // ✅ Product interface import karo

interface ProductViewModalProps {
  onClose: () => void;
  product: Product;
}

const ProductViewModal: React.FC<ProductViewModalProps> = ({ onClose, product }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h3 className="text-lg font-bold">Product Details</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">Name</h4>
            <p>{product.name}</p>
          </div>
          <div>
            <h4 className="font-semibold">Price</h4>
            <p>{product.prices}</p>
          </div>
          <div>
            <h4 className="font-semibold">Description</h4>
            <p>{product.description}</p>
          </div>
          <div>
            <h4 className="font-semibold">In Store</h4>
            <p>{product.isInStore ? 'Yes' : 'No'}</p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;
