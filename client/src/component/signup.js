import axios from 'axios';
import React, { useState } from 'react'

import {useHistory} from 'react-route-dom'

const Registration = () => {
    const [isSeller,setIsSeller] = useState(false);
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [cnfpassword,setCnfPassword] = useState();
    const [error,setError] = useState();

    const history = useHistory();

    
    const submitHandler = async () => {
        
        setError(`name:${name}, email:${email}, password: ${password}, confirm_password?: ${cnfpassword}, isSeller?: ${isSeller}`);

        // setLoading(true);
        if (!name || !email || !password || !cnfpassword) {
            // toast({
            //   title: "Please Fill all the Feilds",
            //   status: "warning",
            //   duration: 5000,
            //   isClosable: true,
            //   position: "bottom",
            // });
            // setLoading(false);

            setError("please fill all the fields")
            return;
        }
    
        try {
            const config = {
            headers: {
                "Content-type": "application/json",
            },
            };
            
            if(isSeller) {
                const { data } = await axios.post(
                    "/api/seller/",
                    { email, password },
                    config
                );
                setError(`login done- seller: ${data.name}`);

                localStorage.setItem("userInfo", JSON.stringify(data));


                history.push('/seller');
                
            }
            else {
                const { data } = await axios.post(
                    "/api/user/",
                    { email, password },
                    config
                );
                setError(`login done- buyer: ${data.name}`);

                localStorage.setItem("userInfo", JSON.stringify(data));

                history.push('/user');
            }
    
            // toast({
            // title: "Login Successful",
            // status: "success",
            // duration: 5000,
            // isClosable: true,
            // position: "bottom",
            // });

            
            // setChangeState(!changeState);
            // setLoading(false);
            // history.push("/chats");
            
        } catch (error) {
            // toast({
            // title: "Error Occured!",
            // description: error.response.data.message,
            // status: "error",
            // duration: 5000,
            // isClosable: true,
            // position: "bottom",
            // });
            // setLoading(false);

            setError("errorrrrrrrrrrrrr")
        }
    };
  return (
    <div>
    <div>Login</div>
        <select onChange={(e) => {setIsSeller(e.target.value)}}>
            <option value="true" >seller</option>
            <option value="false">buyer</option>
        </select>
        <input id='name' onChange={((e) => {setName(e.target.value)})} placeholder='name'/>
        <input type='email' id='email' onChange={((e) => {setEmail(e.target.value)})} placeholder='email'/>
        <input type='password' id='password' onChange={((e) => {setPassword(e.target.value)})} placeholder='password'/>
        <input type='password' id='cnfpassword' onChange={((e) => {setCnfPassword(e.target.value)})} placeholder='confirm password'/>
        <div>{error}</div>
        <button onClick={submitHandler}>Submit</button>
        
    </div>
  )
}

export default Login