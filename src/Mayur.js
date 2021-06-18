import React, { useState } from 'react'

const Mayur = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const [allUser, setAllUser] = useState([])

    const handleSubmit = (e) => {
       
        e.preventDefault();
        const newUser = { email: email, password: password }
        setAllUser([...allUser, newUser])
      

    }
    // Demo
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <h1>mayur</h1>
                <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <button type="submit" >submit</button>
            </form>
                        {allUser.map((data, index) => (
                            <div>
                                <h4>{data.email}</h4>
                                <h4>{data.password}</h4>
                            </div>
                        )
                        )}
        </div>
    )
}

export default Mayur
