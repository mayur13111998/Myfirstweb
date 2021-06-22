import axios from 'axios'
import React, { useEffect, useState } from 'react'

import {useHistory} from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Customer = (props) => {
    const [customer, setCustomer] = useState([])
    const loadcustomer = async () => {
        await axios.get(`http://127.0.0.1:3333/api/customer/${props.id}`).then(res => {
            if (res.status === 200) {
                setCustomer(res.data.customer)
            }
        })
    }
    useEffect(() => {
        loadcustomer()
    }, [])
    return (<>
        {/* {customer.map((data,index)=>(
        <div>{data.customer_id}</div>
    ))} */}
        <div>{customer.customer_name} </div>
    </>)
}


const Orders = () => {
    const history = useHistory()
    const [order, setorder] = useState([])
    const [isLoading, setIsloading] = useState(true)
    const LoadOrder = async () => {
        const data = await axios.get('http://127.0.0.1:3333/api/order').then(res => {
            if (res.status == 201) {
                setIsloading(true)
            } else {
                setorder(res.data)
                setIsloading(false)
            }
        }).catch(err => {
            setIsloading(err)
        })
    }
    React.useEffect(() => {
        LoadOrder()
    }, [])


    const message = () => {
        return (<>
            <div className="text-white">
                No Order available......
            </div>
        </>)
    }

    const deleteorder = async (order_no) => {
        await axios.delete(`http://127.0.0.1:3333/api/order/${order_no}`).then(res=>{
            if(res.status === 200){
                axios.delete(`http://127.0.0.1:3333/api/order/${order_no}/orderitems`).then(res=>{
                    LoadOrder()
                })
            }
        })
        LoadOrder()
    }
    return (
        <div className="root_table pt-10">
            <div className="container ">
                <div className="flex justify-content-end">
                    <Link to="/addorderitem"><button type="button"  className="btn btn-primary mr-2" style={{backgroundColor:'#1e2f4a',borderColor:'#1e2f4a'}}><AddIcon /> Add Order Item</button></Link>
                    <Link to="/addorder"><button type="button" className="btn btn-primary " style={{backgroundColor:'#1e2f4a',borderColor:'#1e2f4a'}}><AddIcon /> Add Order</button></Link>
                </div>
                {isLoading ? message() :
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="text-white">
                                <tr>
                                    <td>Order No</td>
                                    <td>Order Date</td>
                                    <td>Total Amount</td>
                                    <td>Customer Name</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {order.map((data, index) => (
                                    <tr key={index} className="text-white">
                                        <td>{data.order_no}</td>
                                        <td>
                                            {moment(data.order_date).format('DD-MM-YYYY')}</td>
                                        <td>Rs.{data.total_amount}.00</td>
                                        <td>
                                            <Customer id={data.customer_id} />
                                        </td>
                                        <td>
                                            <Link to={`/oreder/${data.order_no}/orderitem`}><button type="button" className="btn btn-outline-primary mr-2"><VisibilityIcon /></button></Link>
                                            <button type="button" className="btn btn-danger" onClick={() => deleteorder(data.order_no)}><DeleteIcon/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    )
}

export default Orders
