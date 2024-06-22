import React from 'react';
import axios from 'axios';


const getToken=()=>{
    return localStorage.getItem('USER_KEY');
}

export const userLogin=(authRequest)=>{
    return axios({
        'method':'POST',
        'url':`${process.env.hostUrl||'https://kbase-backend-b5135e83fa8d.herokuapp.com'}/auth/login`,
        'data':authRequest
    })
}

export const fetchUserData=(authRequest)=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'https://kbase-backend-b5135e83fa8d.herokuapp.com'}/auth/userinfo`,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}