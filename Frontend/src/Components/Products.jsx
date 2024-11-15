import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Modal, TextInput } from 'flowbite-react';
import StudentData from './StudentData';
function Products() {

    const [products, setProduct] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const apiKey = 'http://localhost:3000/api/get'
            try {
                const response = await axios.get(apiKey);
                setProduct(response.data.productsData);
            }
            catch (err) {
                console.log(err);
            }
        }

        getData();
    }, []);


    // Save student data
    const [showModal, setShowModal] = useState(false);
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        description: '',
        image: null

    });

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setProductData((pre) => ({
            ...pre, 
            image: file,
        }))
        console.log(productData.image)
    }


    const handleSaveChanges = () => {
        // Save changes logic here
        console.log(productData);


        const newProductData = new FormData();
        newProductData.append("name", productData.name);
        newProductData.append("price", productData.price);
        newProductData.append("description", productData.description);
        newProductData.append("image", productData.image);

        //sending data to api

        fetch("http://localhost:3000/api/products", { method: "POST", body: newProductData, })
            .then((response) => response.json())
            .then((data) => {
                console.log('Product add success', data);
                handleCloseModal();
            })
            .catch((err) => console.log(err));


    };











    return (
        <div>
            <div className='bg-purple-500 text-center my-4 text-3xl text-white'>Products</div>
            <div className='flex justify-between mb-4'>
                <div classame=''></div>
                <Button gradientDuoTone='purpleToPink' onClick={handleOpenModal}>
                    Add Products
                </Button>
            </div>
            <div className='min-h-screen'>
                <div className=" shadow-md rounded-lg  ">
                    <table className="min-w-full  bg-white border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 text-center">Product Name</th>
                                <th className="px-4 py-2 text-center ">Price</th>
                                <th className="px-4 py-2 text-center ">Description</th>
                                <th className="px-4 py-2 text-center ">Product Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2 text-black font-bold">{product.name}</td>
                                    <td className="px-4 py-2 text-gray-600">{product.price}</td>
                                    <td className="px-4 py-2 text-gray-600">{product.description}</td>
                                    <td className="px-4 py-2 text-gray-600">
                                        
                                        <img src={`http://localhost:3000/uploads/${product.image}`} alt='product Images'/>
                                        </td>
                                    <td className="px-4 py-2 text-gray-600">
                                        
                                        <img src={`http://localhost:3000/${product.image}`} height={70} width={70} className='rounded' alt='product Images'/>
                                        </td>
                                <td>
                                        <Button color='light' onClick={() => handleEdit(product)}>Edit</Button>
                                    </td>
                                    <td className="px-4 py-2 text-gray-600"></td>
                                    <td className=''>
                                        <Button color="failure" onClick={() => handleDelete(product)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* modal Start*/}
            {/* modal */}
            <Modal show={showModal} onClose={handleCloseModal} size="lg">
                <Modal.Header>
                    Product Information
                </Modal.Header>
                <Modal.Body>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={productData.name}
                                onChange={handleChange}
                                placeholder="Enter full name"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="text"
                                name="price"
                                value={productData.price}
                                onChange={handleChange}
                                placeholder="Enter any amount"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <input
                                type="text"
                                name="description"
                                value={productData.description}
                                onChange={handleChange}
                                placeholder="Enter description"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>



                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">images</label>
                            <input
                                type="file"
                                name="image"
                                // value={productData.image}
                                onChange={handleImageChange}
                                placeholder="upload Images"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer className='flex justify-end'>
                    <Button color="gray" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button gradientDuoTone='purpleToPink' onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* modal End*/}
        </div>
    )
}

export default Products