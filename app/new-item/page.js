'use client';

import { useState } from 'react';
import Link from 'next/link';
import supabaseClient from '@/lib/supabaseClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewItemForm = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

    async function handleImageUpload(e) {
        e.preventDefault();
        const file = e.target.files[0];
        if (!file) return; // No file selected

        // Upload the file to Supabase storage
        const { data, error } = await supabaseClient.storage.from('images').upload(`public/${file.name}`, file);
        if (error) {
            console.error('Upload error:', error);
            toast.error('Failed to upload image');
            return;
        }

        // Generate the public URL
        const { data: publicUrlData } = supabaseClient.storage.from('images').getPublicUrl(`public/${file.name}`);
        if (publicUrlData) {
            setImage(publicUrlData.publicUrl);
            console.log('Public URL:', publicUrlData.publicUrl);
        } else {
            console.error('Failed to retrieve public URL');
            toast.error('Failed to retrieve image URL');
        }
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        const res = await fetch('/api/items', {
            method: 'POST',
            body: JSON.stringify({ name, price, image }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!res.ok) {
            console.log('Failed to create item');
            toast.error('Failed to create item');
        } else {
            console.log('New item:', await res.json());
            toast.success('Item created successfully');
            setName('');
            setPrice('');
            setImage('');
        }
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
            <form
                onSubmit={handleFormSubmit}
                className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Cheese cake"
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        id="price"
                        type="text"
                        placeholder="$5"
                        value={price}
                        onChange={(ev) => setPrice(ev.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                    />
                </div>
                <div>
                    <input
                        type="file"
                        onChange={handleImageUpload}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Save
                </button>
            </form>

            <Link href='/' className="mt-4 text-blue-500 hover:text-blue-700">
                Back to home page
            </Link>

            {/* Toast Container */}
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default NewItemForm;
