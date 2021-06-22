// init code 
import React, { useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom';
// icon
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Divider } from '@material-ui/core';
import { useEffect } from 'react';

const Product_img = (props) => {
    const [image, setImage] = useState([])
    const loadImage = async () => {
        await axios.get(`http://127.0.0.1:3333/api/product/${props.id}/all/product_images`).then(res => {
            setImage(res.data)
        })
    }
    React.useEffect(() => { loadImage() }, [])
    return (<>
        <div className="row">
            {image.map((data,i)=>(
                <img key={i} src={`http://127.0.0.1:3333/file/${data.image}`}  alt="product Image"/>
            ))}             
        </div>
    </>)
}

// Product view Component 
const Product = () => {
    // this fetch url parameteres and store in here
    const id = useParams()
    // product all details store in here.....
    const [product, setProduct] = useState([])
    const [isLoad,setIsLoad] = useState(false)
    const [message,setMessage] = useState('Loadding.......')
    // store product all details in this method
    const LoadProduct = async () => {
        const data = await axios.get(`http://127.0.0.1:3333/api/product/${id.id}`);
        setProduct(data.data.product)
        setIsLoad(true)
    }
    // this is useeffect
    React.useEffect(() => {
        LoadProduct()
    }, [])
    //This is return  
    return (
        <div className="root_add pt-10">
            <div className="container ">
            <Link to="/products">
                    <button type="button" className="btn btn-secondary"><ArrowBackIcon /></button>
                </Link>
            { isLoad && <>
                {/* this link to move the products component */}
              
                <div className="row">
                    <div className="col-md-4 mt-4">
                        <Product_img id={product.product_id} />
                    </div>
                    <div className="col-md-6 mt-4 text-white">
                        <p className="h1">{product.product_name}</p>
                        <h4 className="mt-2" >Rs.{product.product_price}.00</h4>
                        <Divider className="bg-white" />
                    </div>
                </div></>
                }
            </div>
        </div>
    )
}

export default Product
