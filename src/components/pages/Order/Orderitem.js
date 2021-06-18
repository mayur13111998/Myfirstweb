import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const ProductData = (props) => {
    const [product, setProduct] = useState([])

    const loadproduct = async () => {
        await axios.get(`http://127.0.0.1:3333/api/product/${props.id}`).then(res => {
            setProduct(res.data.product)
        }).catch(err => console.log(err))
    }
    useEffect(() => {
        loadproduct()
    }, [])
    return (<>
        <div>Produc Name : {product.product_name}</div>
        <img src={`http://127.0.0.1:3333/file/${product.product_image}`} width="50px"/>
    </>)
}




const Loadcustomer = (props) => {
    const [customer, setCustomer] = useState({
        customer_id: '',
        customer_name: ''
    })
    const loadCustomer = async () => {
        await axios.get(`http://127.0.0.1:3333/api/customer/${props.customer_id}`).then(res => {
            setCustomer({
                customer_id: res.data.customer.customer_id,
                customer_name: res.data.customer.customer_name
            })
            console.log(res.data.customer)
        })
    }
    useEffect(() => {
        loadCustomer()
    })
    return <div className="text-white text-2xl">Customer Name: {customer.customer_name}</div>
}
const Orderitem = () => {
    const { order_no } = useParams()
    const [isLoading, setIsLoadning] = useState(true)
    const [orderItem, setOrderItem] = useState()

    const [total_amount, setTotal_amount] = useState([])
    const [customer_id, setCustomer_id] = useState('')




    const loadOrderItems = async () => {
        await axios.get(`http://127.0.0.1:3333/api/order/${order_no}/orderitems`).then(res => {
            if (res.status == 201) {
                setIsLoadning(true)
            } else {
                setOrderItem(res.data)
                axios.get(`http://127.0.0.1:3333/api/order/${order_no}`).then(res => {
                    setTotal_amount(res.data.total_amount)
                    setCustomer_id(res.data.customer_id)

                })
                setIsLoadning(false)
            }
        }).catch(err => {
            setIsLoadning(true)
            console.log(err)
        })
    }
    useEffect(() => {
        loadOrderItems()
    }, [])
    const message = () => {
        return (
            <div className="text-white">
                No order Items avilable....
            </div>
        )
    }

    return (
        <div className="root_table pt-10">
            <div className="container">
                <Link to="/orders">
                    <button type="button" className="btn btn-secondary"><ArrowBackIcon /></button>
                </Link>
                {
                    isLoading ? message() :
                        <div>
                            <div className="flex justify-content-between">
                                <div className="text-white pt-2 pb-2 text-2xl">Order No: {order_no}</div>
                                <Loadcustomer customer_id={customer_id} />
                            </div>

                            <div className="row text-white">
                                <div className="col-md-12">
                                    <table class="table ">
                                        <thead >
                                            <tr className="text-white" >
                                                <th scope="col" >Product Items</th>
                                                <th scope="col" >Cost</th>
                                                <th scope="col" ></th>
                                                <th scope="col" >Qty</th>
                                                <th scope="col" >Total</th>
                                            </tr>
                                        </thead>
                                    
                                    <tbody>
                                        {
                                            orderItem.map((data, index) => (

                                                <tr key={index} className="text-white">

                                                
                                                    <td>
                                                        <ProductData id={data.product_id} />
                                                    </td>
                                                    <td>{data.price_per_item}</td>
                                                    <td className="text-gray-500">x</td>
                                                    <td>{data.quantity}</td>
                                                    <td>{data.amount}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                    </table>

                                <div className="text-white text-right pt-2 pb-2 text-2xl">Total Amount: {total_amount}</div>

                                </div>
                            </div>





{/* 
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="text-white">
                                        <tr>
                                            <td>Order Item No</td>
                                            <td>Product Detail</td>
                                            <td>Quantity</td>
                                            <td>price_per_item</td>
                                            <td>Amount</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orderItem.map((data, index) => (

                                                <tr key={index} className="text-white">

                                                    <td>{data.order_item_no}</td>
                                                    <td>Product ID : #{data.product_id}
                                                        <ProductData id={data.product_id} />
                                                    </td>
                                                    <td>{data.quantity}</td>
                                                    <td>{data.price_per_item}</td>
                                                    <td>{data.amount}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div> */}
                        </div>
                }
            </div>
        </div>
    )
}

export default Orderitem
