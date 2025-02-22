/** @format */

import React, { useState, useEffect } from 'react'
import Products from './component/product'
import Cart from './component/cart'
import CartModal from './component/cartModal'
import './component/main.css'

function Main() {
	const [data, setData] = useState([
		// {
		// 	id: 1,
		// 	image: {
		// 		thumbnail: '/images/image-waffle-thumbnail.jpg',
		// 		mobile: '/images/image-waffle-mobile.jpg',
		// 		tablet: '/images/image-waffle-tablet.jpg',
		// 		desktop: '/images/image-waffle-desktop.jpg',
		// 	},
		// 	name: 'Waffle with Berries',
		// 	category: 'Waffle',
		// 	price: 6.5,
		// 	count: 0,
		// 	isClicked: false,
		// },
		// {
		// 	id: 2,
		// 	image: {
		// 		thumbnail: '/images/image-creme-brulee-thumbnail.jpg',
		// 		mobile: '/images/image-creme-brulee-mobile.jpg',
		// 		tablet: '/images/image-creme-brulee-tablet.jpg',
		// 		desktop: '/images/image-creme-brulee-desktop.jpg',
		// 	},
		// 	name: 'Vanilla Bean Crème Brûlée',
		// 	category: 'Crème Brûlée',
		// 	price: 7.0,
		// 	count: 0,
		// 	isClicked: false,
		// },
		// {
		// 	id: 3,
		// 	image: {
		// 		thumbnail: '/images/image-macaron-thumbnail.jpg',
		// 		mobile: '/images/image-macaron-mobile.jpg',
		// 		tablet: '/images/image-macaron-tablet.jpg',
		// 		desktop: '/images/image-macaron-desktop.jpg',
		// 	},
		// 	name: 'Macaron Mix of Five',
		// 	category: 'Macaron',
		// 	price: 8.0,
		// 	count: 0,
		// 	isClicked: false,
		// },
		// {
		// 	id: 4,
		// 	image: {
		// 		thumbnail: '/images/image-tiramisu-thumbnail.jpg',
		// 		mobile: '/images/image-tiramisu-mobile.jpg',
		// 		tablet: '/images/image-tiramisu-tablet.jpg',
		// 		desktop: '/images/image-tiramisu-desktop.jpg',
		// 	},
		// 	name: 'Classic Tiramisu',
		// 	category: 'Tiramisu',
		// 	price: 5.5,
		// 	count: 0,
		// 	isClicked: false,
		// },
		// {
		// 	id: 5,
		// 	image: {
		// 		thumbnail: '/images/image-baklava-thumbnail.jpg',
		// 		mobile: '/images/image-baklava-mobile.jpg',
		// 		tablet: '/images/image-baklava-tablet.jpg',
		// 		desktop: '/images/image-baklava-desktop.jpg',
		// 	},
		// 	name: 'Pistachio Baklava',
		// 	category: 'Baklava',
		// 	price: 4.0,
		// 	count: 0,
		// 	isClicked: false,
		// },
		// {
		// 	id: 6,
		// 	image: {
		// 		thumbnail: '/images/image-meringue-thumbnail.jpg',
		// 		mobile: '/images/image-meringue-mobile.jpg',
		// 		tablet: '/images/image-meringue-tablet.jpg',
		// 		desktop: '/images/image-meringue-desktop.jpg',
		// 	},
		// 	name: 'Lemon Meringue Pie',
		// 	category: 'Pie',
		// 	price: 5.0,
		// 	count: 0,
		// 	isClicked: false,
		// },
		// {
		// 	id: 7,
		// 	image: {
		// 		thumbnail: '/images/image-cake-thumbnail.jpg',
		// 		mobile: '/images/image-cake-mobile.jpg',
		// 		tablet: '/images/image-cake-tablet.jpg',
		// 		desktop: '/images/image-cake-desktop.jpg',
		// 	},
		// 	name: 'Red Velvet Cake',
		// 	category: 'Cake',
		// 	price: 4.5,
		// 	count: 0,
		// 	isClicked: false,
		// },
		// {
		// 	id: 8,
		// 	image: {
		// 		thumbnail: '/images/image-brownie-thumbnail.jpg',
		// 		mobile: '/images/image-brownie-mobile.jpg',
		// 		tablet: '/images/image-brownie-tablet.jpg',
		// 		desktop: '/images/image-brownie-desktop.jpg',
		// 	},
		// 	name: 'Salted Caramel Brownie',
		// 	category: 'Brownie',
		// 	price: 4.5,
		// 	count: 0,
		// 	isClicked: false,
		// },
		// {
		// 	id: 9,
		// 	image: {
		// 		thumbnail: '/images/image-panna-cotta-thumbnail.jpg',
		// 		mobile: '/images/image-panna-cotta-mobile.jpg',
		// 		tablet: '/images/image-panna-cotta-tablet.jpg',
		// 		desktop: '/images/image-panna-cotta-desktop.jpg',
		// 	},
		// 	name: 'Vanilla Panna Cotta',
		// 	category: 'Panna Cotta',
		// 	price: 6.5,
		// 	count: 0,
		// 	isClicked: false,
		// },
	])
	const [loading, setLoading] = useState(true)
	const getData = () => {
		fetch('data.json', {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (myJson) {
				console.log(myJson)
				setData(myJson)
				setLoading(false)
			})
	}
	useEffect(()=>{
		getData()
	},[])





	const [cart, setCart] = useState([])
	const [showModal, setShowModal] = useState(false)

	const handleAddToCart = (product) => {
		product.isClicked = true
		product.count = 1
		setCart((c) => [...cart, product])
		console.log(product.isClicked)
	}

	const handleClearCart = ()=>{
		setCart([])
		setShowModal(false)
		const resetData = data.map((item)=>({...item, isClicked : false}))
		setData(resetData)
	}

	const handleDecrement = (id) => {
		setData((prev) => {
			return prev.map((item) => {
				if (item.id === id && item.count > 1) {
					return { ...item, count: item.count - 1 }
				}
				return item
			})
		})
		setCart((prev) => {
			return prev.map((item) => {
				if (item.id === id && item.count > 1) {
					return { ...item, count: item.count - 1 }
				}
				return item
			})
		})
	}

	const handleIncrement = (id) => {
		setData((prev) => {
			return prev.map((item) => {
				if (item.id === id) {
					return { ...item, count: item.count + 1 }
				}
				return item
			})
		})
		setCart((prev) => {
			return prev.map((item) => {
				if (item.id === id) {
					return { ...item, count: item.count + 1 }
				}
				return item
			})
		})
	}

	const handleDelete = (product) => {
		product.isClicked = false
		setCart((prev) => {
			return prev.filter((item) => item.id !== product.id)
		})
	}

	const handleShowModal = () => {
		setShowModal(true)
		console.log(showModal)
	}

	useEffect(() => {
		const storedCart = localStorage.getItem('cart')
		if (storedCart) {
			setCart(JSON.parse(storedCart))
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart))
	}, [cart])

	return (
		<div className='main'>
			<div className='product__container'>
				<h1 className='mainHeader'>Deserts</h1>
				<div className='products'>
					{loading ? (
						<div className='loading'>
							<h2>Loading...</h2>
						</div>
					) : (
						<Products
							items={data}
							handleAddToCart={handleAddToCart}
							handleIncrement={handleIncrement}
							handleDecrement={handleDecrement}
						/>
					)}
				</div>
			</div>
			<Cart
				cart={cart}
				handleDelete={handleDelete}
				handleShowModal={handleShowModal}
			/>
			<div className='modal'>
				{showModal ? (
					<CartModal cartModalItems={cart} clearCart={handleClearCart} />
				) : null}
			</div>
		</div>
	)
}

export default Main
