import React, { useState } from 'react'
import { getItem, setItem } from '../services/Services/LocalStorageFunction'
import { Link } from 'react-router-dom';
import { BsFillCartXFill } from 'react-icons/bs'

export const Cart = () => {
  const [data, setData] = useState(getItem('carrinho') || []);

  const removeItem = (obj) => {
    const arrFilter = data.filter((e)=>e.id !== obj.id); // se esse elem tiver id diferente do id do obj, sig que quero colocar todos, exceto esse no cart. 
    setData(arrFilter); //setando o map
    setItem('carrinho', arrFilter) //setando o localstorage para voltar com os icones dnv no store apos remover do carrinho. 
  }
  const subTotal = data.reduce((acc,curr)=> acc + curr.price, 0)
  return (
    <>
    <div>
    <Link to='/'>Home</Link>
    <h1>Cart</h1>
    <h3>{`SubTotal: R$ ${subTotal},00 `}</h3>
    </div>
    <div>
      {
        data.map((item)=>(
          <div key={item.id}>
            <h4>{item.title}</h4>
            <img src={item.thumbnail} alt={item.id}/>
            <h4>{`R$${item.price},00`}</h4>
            <button
            onClick={()=>removeItem(item)}
            >
             <BsFillCartXFill/>             
            </button>
          </div>
        ))
      }
    </div>
    </>
  )
}
