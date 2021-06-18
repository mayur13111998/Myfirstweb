//init code 
import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
// icon 
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
// product component
const Products = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [product, setProduct] = useState([])
    // Load all product
    const LoadProduct = async () => {
        await axios.get('http://127.0.0.1:3333/api/product').then(res => {
            if (res.status === 201) {
                setIsLoading(true)
            } else {
                setProduct(res.data)
                setIsLoading(false)
            }
        })
    }
    // useEffecr calll this calll to all product load method
    React.useEffect(() => {
        LoadProduct()
    }, [])
    // this method is delete product
    const deleteProduct = async (id) => {
        await axios.delete(`http://127.0.0.1:3333/api/product/${id}`).then(res=>{
            LoadProduct()
        })
        LoadProduct()
    }
    // This method is print message which product is not loaded or product is empty
    const message = () => {
        return (<>
            <div className="text-white">
                No Product avilable....
            </div>
        </>)
    }
    // return method is heree....
    return (
        <div className="root_table pt-10">
            <div className="container ">
                {/* this is section move to add product component */}
                <div className="flex justify-content-end">
                    <Link to="/addproduct"><button type="button" className="btn btn-primary "><AddIcon /> Add Product</button></Link>
                </div>
                <div className="">
                {/* product table start here  */}
                {
                    isLoading ? message() :
                        <div className="table-responsive">
                            <table  className="table ">
                                <thead className="text-white">
                                    <tr>
                                        <td>#</td>
                                        <td>Product Name</td>
                                        <td>Product Price</td>
                                        <td>Product Image</td>
                                        <td>Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.map((data, index) => (
                                        <tr key={index} className="text-white">
                                            <td >{index + 1}</td>
                                            <td>{data.product_name}</td>
                                            <td>{data.product_price}.00</td>
                                            <td><img src={`http://127.0.0.1:3333/file/${data.product_image}`} width="100px" /></td>
                                            <td>
                                                <Link to={`/product/${data.product_id}/edit`}> <button type="button" className="btn btn-primary"><EditIcon /></button></Link>
                                                <Link to={`/product/${data.product_id}`}><button type="button" className="btn btn-outline-primary ml-2 mr-2"><VisibilityIcon /></button></Link>
                                                <button type="button" className="btn btn-danger" onClick={() => deleteProduct(data.product_id)}><DeleteIcon /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                }
                {/* end of product section  */}
                </div>
            </div>
        </div>
    )
}
// export product component
export default Products
