// init code 
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { IconButton } from '@material-ui/core'
// icons
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
// component
const Mayur = () => {
    const [Product_selete, setProduct_select] = useState('')
    const [customer, setCustomer] = useState([])
    const [product, setProduct] = useState([])

    const [product_cart,setProduct_cart] = useState({
        product_id: 0,
        product_name:'',
        product_price:0,
        product_quantity: 1,
        total_amount : 0
    })
 
    // Customer all load and display select filed
    const loadCustomer = async () => {
        await axios.get('http://127.0.0.1:3333/api/customer').then(res => {
            if (res.status === 200) {
                setCustomer(res.data.customer)
            }
        })
    }
    // product all load and display select filed
    const loadProduct = async () => {
        await axios.get('http://127.0.0.1:3333/api/product').then(res => {
            if (res.status === 200) {
                setProduct(res.data)
            }
        })
    }
    // useEffect component load that time call 
    useEffect(() => {
        loadCustomer()
        loadProduct()
    }, [])

    const handleProduct = (e) => {
            const id = e.target.value
            const product_id = product[id].product_id
            const product_price = product[id].product_price
            const product_name = product[id].product_name
            const product_quantity = 1
            const total_amount = product_price
            setProduct_cart({product_id,product_price,product_name,product_quantity,total_amount})
        }


    const handleQuntityDIN = () => {
        product_cart.product_quantity = product_cart.product_quantity - 1
    }
    
    const handleQuntityINS = () => {
        product_cart.product_quantity = product_cart.product_quantity + 1
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <select defaultValue="" className="w-full" >
                        <option value="" selected disabled >customer</option>
                        {
                            customer.map((data, index) => (
                                <option key={index} value={data.customer_id} >{data.customer_name}</option>
                            ))
                        }
                    </select>

                    <select defaultValue={Product_selete} className="w-full" onChange={handleProduct}>
                        <option value="" selected disabled >Product</option>
                        {
                            product.map((data, index) => (
                                <option key={index} value={index} >{data.product_name}</option>
                            ))
                        }
                    </select>

                    <div>{product_cart.product_price}</div>
                    <div className="flex">
                    <IconButton onClick={handleQuntityDIN}><RemoveIcon/></IconButton>
                    <div>{product_cart.product_quantity}</div>   
                    <IconButton onClick={handleQuntityINS}><AddIcon/></IconButton> 
                    </div>
                    
                    <div>{product_cart.total_amount}</div>
                    
                </div>
            </div>
        </div>
    )
}

export default Mayur
