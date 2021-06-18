import React from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'

const EditProduct = () => {
    const { id } = useParams()
    const [product_id, setproduct_id] = React.useState('')
    const [product_price, setProduct_price] = React.useState('')
    const [product_name, setproduct_name] = React.useState('')
    const [cover_image, setcover_image] = React.useState([])
    let history = useHistory();

    const loadProduct = async () => {
        const data = await axios.get(`http://127.0.0.1:3333/api/product/${id}`);
        setProduct_price(data.data.product.product_price)
        setproduct_id(data.data.product.product_id)
        setproduct_name(data.data.product.product_name)
        setcover_image(data.data.product.product_image)
    }

    React.useEffect(() => {
        loadProduct()
    }, [])
    const [image, setImage] = React.useState('')
    const editProduct = async (e) => {
        e.preventDefault();


        const product = new FormData()

        if (image) {

            product.append('product_image', image)
            product.append('product_name', product_name)
            product.append('product_price', product_price)

            await axios.patch(`http://127.0.0.1:3333/api/product/${product_id}/edit`, product).then((response) => {
                history.push('/products')
            }).catch((err) => {
                console.log(err);
            })
        } else {

            product.append('product_name', product_name)
            product.append('product_price', product_price)

            await axios.patch(`http://127.0.0.1:3333/api/product/${product_id}/edit2`, product).then((response) => {
                history.push('/products')
            }).catch((err) => {
                console.log(err);
            })
        }




    }
    const [imageState,setImageState] = React.useState()
    const [display,setDisplay] = React.useState('')
    return (
        <>
            <div className=" root_edit h-screen flex ">
                <div className="m-auto flex flex-col">
                    <form onSubmit={editProduct} className="flex flex-col" encType="multipart/form-data" >
                        <h1 className="mb-4 p-4 text-5xl text-white">Edit Product</h1>
                        <input type="text" value={product_name} onChange={(e) => setproduct_name(e.target.value)} placeholder="Enter Product Name" className="p-2 rounded-lg outline-none"></input>
                        <input type="text" value={product_price} onChange={(e) => setProduct_price(e.target.value)} placeholder="Enter Product Price" className="p-2 rounded-lg outline-none mt-2"></input>

                        <img style={{display:`${display}`}} src={`http://127.0.0.1:3333/file/${cover_image}`} width="100px" height="100px" className="mt-2 " />
                        <img src={imageState} className="mt-2" width="100px"/>
                        <label htmlFor="file" className="py-2 px-2 bg-white my-2 rounded-lg"> <input type="file"
                            onChange={(e) => {
                                setImage(e.target.files[0])
                                const reader = new FileReader();

                                reader.onload = () => {
                                    if (reader.readyState === 2) {
                                        setImageState(reader.result)
                                        setDisplay('none')
                                    }
                                }
                                reader.readAsDataURL(e.target.files[0])
                            }}
                            id="file" ></input> {cover_image}</label>
                        <button type="submit" className="p-4 mt-4 focus:outline-none rounded-lg text-lg font-extrabold text-white">Edit Product</button>
                    </form>

                </div>
            </div>
        </>)


}

export default EditProduct
