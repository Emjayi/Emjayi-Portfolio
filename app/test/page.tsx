'use client'
import React, { useState } from 'react'
import { Navigation } from '../components/nav'
import Image from 'next/image'

const page = () => {
    const [popup, setPopup] = useState<Product | false>(false);
    interface Product {
        id: number;
        // other properties
    }
    const products = [
        {
            name: "prdouct one",
            description: "A product with many benefits that fit every occasion.",
            image: "/products/1.jpg",
            id: 1
        },
        {
            name: "prdouct two",
            description: "Another product with many benefits that fit every occasion.",
            image: "/products/2.jpg",
            id: 2
        },
        {
            name: "prdouct three",
            description: "The best product with many benefits that fit every occasion.",
            image: "/products/3.jpg",
            id: 3
        },
        {
            name: "prdouct four",
            description: "Wow! This is a product with many benefits that fit every occasion.",
            image: "/products/4.jpg",
            id: 4
        },
        {
            name: "prdouct five",
            description: "Wow! This is a product with many benefits that fit every occasion.",
            image: "/products/5.jpg",
            id: 5
        },

    ]

    return (
        <><Navigation />

            <div className='w-fit my-32 mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14'>
                {products.map(product => (
                    <div key={product.id}>
                        {popup && popup.id === product.id && (
                            <div id={`modal-${product.id}`} className=" duration-200 fixed bg-black/30 flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full">
                                <div className="relative p-4 w-full max-w-2xl max-h-full">

                                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">
                                                {product.name}
                                            </h3>
                                            <button onClick={() => setPopup(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                </svg>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                        </div>

                                        <div className="p-4 md:p-5 space-y-4">
                                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                {product.description}
                                            </p>
                                        </div>

                                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 focus:animate-spin">Add to cart</button>
                                            <button onClick={() => setPopup(false)} className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Maybe another time</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        }
                        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:shadow-xl">
                            <a>
                                <Image width={1000} height={1000} src={`${product.image}`}
                                    alt="Product" className=" h-60 w-72 object-cover rounded-t-xl" />
                                <button onClick={() => setPopup(product)} className=" bg-white hover:bg-white backdrop-filter backdrop-blur-xl bg-opacity-60 duration-300 rounded-tr-lg text-black px-4 py-2 relative bottom-8 my-[-80px]" type="button">
                                    Quick view
                                </button>
                                <div className="px-4 py-3 w-72">
                                    <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
                                    <p className="text-lg font-bold text-black truncate block capitalize">{product.name}</p>
                                    <p className="">{product.description}</p>

                                    <div className="flex items-center">
                                        <p className="text-lg font-semibold text-black cursor-auto my-3">$149</p>
                                        <del>
                                            <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                                        </del>
                                        <div className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                            <path
                                                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                        </svg></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                ))}
            </div>



        </>
    )
}

export default page
