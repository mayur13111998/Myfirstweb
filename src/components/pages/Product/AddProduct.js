import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const AddProduct = () => {
    const [product_name, setproduct_name] = React.useState('')
    const [product_price, setProduct_price] = React.useState('')
    const [product_image,setProduct_image] = React.useState()
    const [image,setImage] = React.useState({
        imageURL:'',
        display:'none'
    })
    let history = useHistory();
    const addCustomer = async (e) => {
        e.preventDefault();
        
        const formdata = new FormData()
        formdata.append("product_name",product_name)
        formdata.append("product_price",product_price)
        formdata.append("product_image",product_image)
         
        await axios.post('http://127.0.0.1:3333/api/product', formdata).then((response) => {
            history.push('/products')
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            <form onSubmit={addCustomer}>
                <div className="h-screen flex bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 ...">
                    <div className="m-auto flex flex-col">
                        <h1 className="mb-4 p-4 text-5xl">Add Product</h1>
                        <input type="text" value={product_name} onChange={(e) => setproduct_name(e.target.value)} placeholder="Enter Product Name" className="p-2 rounded-lg outline-none"></input>
                        <input type="text" value={product_price} onChange={(e) => setProduct_price(e.target.value)} placeholder="Enter Product Price" className="p-2 rounded-lg outline-none mt-2"></input>
                        <img src={image.imageURL} className="mt-2 rounded-2" style={{display:`${image.display}`}} alt="Product_image" />
                        <label htmlFor="image" className="py-2 mt-2  rounded-lg bg-white px-2"> <input id="image" type="file" onChange={(e)=>{
                            setProduct_image(e.target.files[0])
                            const reader = new FileReader();
                            reader.onload = () => {
                                    if (reader.readyState === 2) {
                                        const display = { display: ' '}
                                        setImage(display)
                                        const imageURL ={ imageURL: reader.result}
                                        setImage(imageURL)
                                    }
                                }
                                reader.readAsDataURL(e.target.files[0])
 
                        }}/></label>
                        <button  type="submit" className="p-4 mt-4 focus:outline-none rounded-lg text-lg font-extrabold">Add Product</button>
                    </div>
                </div>
            </form>
        </>)
}

export default AddProduct
