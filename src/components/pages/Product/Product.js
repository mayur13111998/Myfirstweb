// init code 
import React, { useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom';
// icon
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Divider } from '@material-ui/core';
// Product view Component 
const Product = () => {
    // this fetch url parameteres and store in here
    const id = useParams()
    // product all details store in here.....
    const [product, setProduct] = useState([])
    // store product all details in this method
    const LoadProduct = async () => {
        const data = await axios.get(`http://127.0.0.1:3333/api/product/${id.id}`);
        setProduct(data.data.product)
    }
    // this is useeffect
    React.useEffect(() => {
        LoadProduct()
    }, [])

    //This is return  
    return (
        <div className="root_add pt-10">
            <div className="container ">
                {/* this link to move the products component */}
                <Link to="/products">
                    <button type="button" class="btn btn-secondary"><ArrowBackIcon /></button>
                </Link>
                <div className="row">
                    <div className="col-md-4 mt-4">
                        <img width="100%" src={`http://127.0.0.1:3333/file/${product.product_image}`} className="mg-thumbnail" alt="product image" />
                    </div>
                    <div className="col-md-6 mt-4 text-white">
                        <p className="h1">{product.product_name}</p>
                        <h4 className="mt-2" >Rs.{product.product_price}.00</h4>
                        <Divider className="bg-white" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
