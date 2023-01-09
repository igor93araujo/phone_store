import React, { useState } from 'react'
import { getItem } from '../services/Services/LocalStorageFunction'
import { Link } from 'react-router-dom';
import { BsFillCartXFill } from 'react-icons/bs'

export const Cart = () => {
  const [data, setData] = useState(getItem('carrinho') || []);
  return (
    <>
    <Link to='/'>Home</Link>
    <h1>Cart</h1>
    <div>
      {
        data.map((e)=>(
          <div key={e.id}>
            <h4>{e.title}</h4>
            <img src={e.thumbnail} alt={e.id}/>
            <h4>{e.price}</h4>
            <button>
             <BsFillCartXFill/>             
            </button>
          </div>
        ))
      }
    </div>
    </>
  )
}
