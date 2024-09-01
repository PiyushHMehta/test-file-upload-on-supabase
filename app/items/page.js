'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const Items = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchItems() {
            const res = await fetch('/api/items');
            const data = await res.json();
            setItems(data);

            // GSAP stagger animation for images
            gsap.fromTo(
                '.item',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
            );
        }

        fetchItems();
    }, []);

    console.log(items);

    return (
        <div className="items-container py-10 px-6 bg-gray-100 min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {items?.length > 0 && items.map((item) => (
                    <div key={item._id} className="item bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
                        {item.images && item.images.length > 0 && (
                            <Image src={item.images[0]} width={400} height={300} alt={item.name} className="w-full h-64 object-cover" />
                        )}
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h2>
                            <p className="text-gray-600">${item.price}</p>
                            <Link
                                href={{
                                    pathname: `/items/${item._id}`,
                                    query: { images: JSON.stringify(item.images) }
                                }}
                                className="text-blue-500 hover:text-blue-700 text-lg font-medium"
                            >
                                View All
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <Link href="/" className="text-blue-500 hover:text-blue-700 text-lg font-medium">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Items;
