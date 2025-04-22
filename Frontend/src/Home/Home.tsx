import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PlusIcon } from '@heroicons/react/solid';
import { BASE_URL } from '../constants/constant.js';
import { Product } from '../types/products';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Loader from '../components/Loader';
import ProductFormModal from '../components/ProductFormModal';
import ProductViewModal from '../components/ProductViewModal';
import Navbar from '../components/Navbar.js';
import toast from "react-hot-toast";

const Home = () => {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);  // Load data once when component mounts

  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(BASE_URL + 'product')
      .then((response) => {
        setData(response.data);  // Directly update data
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleDelete = (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios
        .delete(`${BASE_URL}product/${productId}`)
        .then(() => {
          // Directly remove deleted product from state
          setData(data.filter((product) => product.id !== productId));
          toast.success('Product deleted successfully');
        })
        .catch((error) => {
          console.log('Error deleting product', error);
          toast.error('Failed to delete product');
        });
    }
  };

  const handleView = (product: Product) => {
    setSelectedProduct(product);
    setShowViewModal(true); 
  };

  return (
    <>
    <Navbar />
    <div className="shadow-md rounded-md m-8">
      <div className="overflow-x-auto">
        <div className="flex px-5 justify-between items-center flex-wrap">
          <h1 className="text-3xl font-bold">Product List</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center mt-3 md:mt-0 cursor-pointer"
            onClick={() => {
              setSelectedProduct(null);
              setShowModal(true);
            }}
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Product
          </button>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <table className="table table-zebra mt-4">
            <thead className="bg-teal-100 text-teal-800">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Is In Store</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product: Product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td
                    className={`px-4 py-2 mt-1 text-sm font-semibold rounded-full flex items-center justify-center ${product.isInStore
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                      }`}
                  >
                    {product.isInStore ? 'Yes' : 'No'}
                  
                  </td>
                  <td>{product.prices}</td> {/* Fixed this line */}
                  <td>
                    <div className="flex items-center gap-3">
                      <FaEdit className="text-blue-500 cursor-pointer text-xl" onClick={() => handleEdit(product)} />
                      <FaTrash className="text-red-500 cursor-pointer text-xl" onClick={() => handleDelete(product.id)} />
                      <FaEye className="text-green-500 cursor-pointer text-xl" onClick={() => handleView(product)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {data.length === 0 && <h1 className="text-center p-5 text-xl">No Data</h1>}

      {showModal && (
        <ProductFormModal
          onClose={() => {
            setShowModal(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
          refreshData={fetchData}  // Pass fetchData to refresh after adding/updating
        />
      )}

      {showViewModal && selectedProduct && (
        <ProductViewModal
          onClose={() => {
            setShowViewModal(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
        />
      )}
    </div>
    </>
  );

};


export default Home;
