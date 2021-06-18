import axios from 'axios'
import React, { useEffect, useState, memo } from 'react'
import { Link, useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Divider, IconButton } from '@material-ui/core';


const Addorderitem = () => {
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)
    const [customer, setCustomer] = useState([])
    const [product, setProduct] = useState([])
    const [order_no, setOrder_no] = useState()
    const [quantity, setQuanity] = useState(1)
    const [price, setprice] = useState(0)
    const [total_amount, settotalAmount] = useState(0)
    const [customer_id, setCustomer_id] = useState('')
    const [product_id, setProduct_id] = useState('')
    const [order, setOrder] = useState([])
    const [data, setData] = useState([])
    const [Product_name, setProduct_name] = useState()
    const loadCustomer = async () => {
        await axios.get('http://127.0.0.1:3333/api/customer').then(res => {
            if (res.status === 201) {
                setIsLoading(true)
            } else {
                setCustomer(res.data.customer)
                setIsLoading(false)
            }
        })
    }

    const loadProduct = async () => {
        await axios.get('http://127.0.0.1:3333/api/product').then(res => {
            if (res.status === 201) {
                setIsLoading(true)
            } else {
                setProduct(res.data)
                setIsLoading(false)
            }
        })
    }


    useEffect(() => {
        loadCustomer();
        loadProduct();
    }, [])
    const message = () => {
        return (
            <div className="text-white">
                No  order place plz contact to admin..........
            </div>
        )
    }
    const [productData, setProductData] = useState([])
    const loadArry = () => {
        const chack = data.find(data => data.Product_name === 'Pen')
        console.log(chack)
    }
    const mayuradd = () => {
        setData([
            ...data, {
                product_id: product_id,
                Product_name: Product_name,
                quantity: quantity,
                price: price,
                total_amount: total_amount
            }])

    }
    const [cartMessage, setcartMessage] = useState('')
    const [display, setDisplay] = useState('none')
    const addorder = async (e) => {
        if (data.length === 0) {

            setDisplay('none')
            setData([
                ...data, {
                    product_id: product_id,
                    Product_name: Product_name,
                    quantity: quantity,
                    price: price,
                    total_amount: total_amount
                }])

        } else {
            const demo = data.find(item => item.product_id === product_id)
            if (demo) {
                setDisplay('')
                setcartMessage('This is product is already in the cart!')
            } else {
                setDisplay('none')
                setData([
                    ...data, {
                        product_id: product_id,
                        Product_name: Product_name,
                        quantity: quantity,
                        price: price,
                        total_amount: total_amount
                    }])
            }
        }
        loadArry()
        loadCustomer()
        setMainTotal(mainTotal + total_amount)
        setQuanity(1)
        setprice(0)
        settotalAmount(0)
        e.preventDefault();
    }
    const addQuamity = () => {
        if (quantity === 1) {
            setQuanity(1)
        } else {
            setQuanity(quantity - 1)
        }
    }
    useEffect(() => {
        settotalAmount(price * quantity)
    }, [quantity])
    const [mainTotal, setMainTotal] = useState(0)
    const [ErrorMassage, setErrorMassage] = useState('')

    const addMainOrder = async () => {
        if (customer_id == "") {
            setErrorMassage('Select Customer.....')
        } else if (data.length !== 0) {
            console.log(data.length)

            setErrorMassage('')
            await axios.post('http://127.0.0.1:3333/api/order', { total_amount: mainTotal, customer_id: customer_id }).then(res => {
                if (res.status === 200) {
                    data.map((data, index) => (

                        axios.post('http://127.0.0.1:3333/api/order/addorderitems', {
                            order_no: res.data.order.order_no,
                            product_id: data.product_id,
                            quantity: data.quantity,
                            price_per_item: data.price,
                            amount: data.total_amount
                        }).then(res => history.push('/orders'))
                    ))
                }
            })
        } else {
            alert('plz Enter the Product ')
        }
    }

    const deleteDataProduct = async (product_id, amount) => {
        setData([...data.filter(id => id.product_id !== product_id)])
        setMainTotal(mainTotal - amount)
        if (!data) {
            setMainTotal(0)
        }
        if(data.length === 0){
            setMainTotal(0)
        }
    }

    const remove = async () => {
        setData([])
    }


    const [quatity_array, setQuatity_array] = useState('')

    useEffect(() => {
        if (data.length === 0) {
            setMainTotal(0)
        }
    }, [mainTotal])


    const cartquantityINC = (index, quantity) => {
        let total=  data[index].total_amount
        data[index].quantity = quantity + 1
        data[index].total_amount = data[index].price * data[index].quantity
        let subTotal =  (mainTotal - total) + data[index].total_amount
        setMainTotal(subTotal)
        
        history.push('addorderitem')
    }
    const cartquantityDNC = (index, quantity) => {
        if(data[index].quantity === 1){

        }else{
            let total=  data[index].total_amount
        data[index].quantity = quantity - 1
        data[index].total_amount = data[index].price * data[index].quantity
        let subTotal =  (mainTotal - total) + data[index].total_amount
        setMainTotal(subTotal)
        history.push('addorderitem')}
    }


    return (
        <div className="h-screen pt-10 flex bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 ...">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-6">
                        {
                            isLoading ? message() :
                                <div>
                                    <div className="row bg-white  font-bold rounded-2 p-6">
                                        <div className="col-12">
                                            <select className="form-select form-select-lg mb-3" defaultValue='' aria-label=".form-select-lg example">
                                                <option value="" selected disabled>Customber</option>
                                                {customer.map((data, index) => (
                                                    <option value={data.customer_id} key={index} onClick={(e) => {
                                                        setErrorMassage('')
                                                        remove()
                                                        setCustomer_id(data.customer_id)
                                                    }}>{data.customer_name}</option>
                                                ))}
                                            </select>
                                            <div className=" mb-3" style={{ marginTop: '-15px' }}>{ErrorMassage}</div>
                                        </div>
                                        <form onSubmit={addorder}>
                                            <div className="row mt-4">

                                                <div className="col-6">
                                                    <select className="form-select form-select-lg mb-3" defaultValue='' aria-label=".form-select-lg example">
                                                        <option value="" selected disabled>Product</option>
                                                        {product.map((data, index) => (
                                                            <option value={data.product_name} key={index} onClick={() => {
                                                                setDisplay('none')
                                                                setProduct_id(data.product_id)
                                                                setProduct_name(data.product_name)
                                                                settotalAmount(data.product_price)
                                                                setprice(data.product_price)
                                                                setQuanity(1)
                                                            }} >{data.product_name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-6">
                                                    <div className="flex mb-3">
                                                        <div className="w-1/5 rounded-l-md border-1 text-center p-2 bg-white" onClick={() => addQuamity()}><RemoveIcon /></div>
                                                        <div className="w-1/5 border-1 text-center p-2 bg-white">{quantity}</div>
                                                        <div className="w-1/5 rounded-r-md border-1 p-2 bg-white text-center" onClick={() => setQuanity(quantity + 1)}><AddIcon /></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pb-3 col-6  font-bold">
                                                Product Price: {price}.00
                                            </div>
                                            <div className="col-6  font-bold">
                                                Total Amount: {total_amount}.00
                                            </div>
                                            <button type="submit" className="btn btn-primary mt-4" ><AddIcon /> Add Product</button>

                                            <div class="mt-4 alert alert-danger" style={{ display: `${display}` }} role="alert">
                                                {cartMessage}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                        }
                    </div>
                    <div className="col-4">
                        <div className="p-4 font-bold bg-white rounded-2">
                            <div className="row">
                                <div className="col-12 text-gray-500 mb-2">
                                    Order Summary
                                </div>

                                <Divider />
                                <div className="col-6 mt-2">
                                    Total
                                </div>
                                <div className="col-6 mt-2 mb-2">
                                    Rs. {mainTotal}.00
                                </div>

                                <Divider />
                            </div>
                            <button type="button" className="btn btn-primary w-full mt-2" onClick={addMainOrder}><AddIcon /> Add Order</button>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="text-dark">
                                <tr>
                                    <td>Product No</td>
                                    <td>Quantity</td>
                                    <td>Price</td>
                                    <td>Total Price</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody className="text-dark">
                                {data.map((data, index) => (
                                    <tr key={index} className="text-dark">
                                        <td>Product ID: {data.product_id}
                                            <div>Product Name: {data.Product_name}
                                            </div></td>
                                        <td>

                                            <IconButton onClick={() => cartquantityDNC(index, data.quantity)}><RemoveIcon /></IconButton>
                                            {data.quantity}

                                            <IconButton onClick={() => cartquantityINC(index, data.quantity)}><AddIcon /></IconButton>
                                        </td>
                                        <td>{data.price}</td>
                                        <td>{data.total_amount}</td>
                                        <td>
                                            <button type="button" className="btn btn-danger" onClick={() => { deleteDataProduct(data.product_id, data.total_amount) }}><DeleteIcon /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>

                </div>
            </div>
            <div className="flex justify-content-end">

            </div>
        </div>
    )
}

export default memo(Addorderitem)
