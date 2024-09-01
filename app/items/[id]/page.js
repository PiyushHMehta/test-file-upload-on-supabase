'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const ItemDetail = () => {
    const router = useRouter();
    const [images, setImages] = useState([]);
    const imageRefs = useRef([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const imagesParam = params.get('images');
            if (imagesParam) {
                setImages(JSON.parse(imagesParam));
            }
        }
    }, []);

    useEffect(() => {
        if (images.length > 0) {
            gsap.from(imageRefs.current, {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 1,
                ease: 'power3.out',
            });
        }
    }, [images]);

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Item Details</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {images.map((image, index) => (
                    <div
                        key={index}
                        ref={(el) => (imageRefs.current[index] = el)}
                        className="image-item overflow-hidden rounded-lg shadow-lg"
                    >
                        <img src={image} alt={`Image ${index + 1}`} width={500} height={350} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
            <div className="text-center mt-8">
                <button
                    onClick={() => router.back()}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Back to Items
                </button>
            </div>
        </div>
    );
};

export default ItemDetail;
