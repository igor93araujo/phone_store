import React, { useEffect, useState }from 'react';
import {BsFillCartCheckFill, BsFillCartPlusFill} from 'react-icons/bs';
import { getItem, setItem } from '../services/Services/LocalStorageFunction';
import { Link } from 'react-router-dom';

export const Store = () => {
  const itemUrl = 'https://api.mercadolibre.com/items/$ItemID';

  const [data, setData] = useState([]);
  const [cart, setCart] = useState(getItem('carrinho') || []); //Aqui ele verifica se tem algo no getItem, se tiver, ele vira o valor inicial do usestate, se nao, array 

  useEffect(()=>{
    const fecthApi = async () => {  
      const url = 'https://api.mercadolibre.com/sites/MLB/search?q=celular';
      const response = await fetch(url);
      const objJson = await response.json();
      setData(objJson.results)
    }
    fecthApi()
  },[]) //executar qndo a pag for carregada

  const handleClick = (obj) => {
    const element = cart.find((e)=> e.id === obj.id) // se for true, quer dizer q tenho esse elemento lá no cart. 
    //se tiver o elemento e ele tiver clicado, sig que ja tem o elemento e temos que remover ele do cart.
    if(element){
      const arrFilter = cart.filter((e)=> e.id !== obj.id); // se esse elem tiver id diferente do id do obj, sig que quero colocar ele no cart. 
      setCart(arrFilter);
      setItem('carrinho', arrFilter)
    } else { // se o elemento nao ta no carrinho, vc quer adc ele no carrinho, pegando os elementos e juntando c o novo. 
      setCart([...cart, obj]);
      setItem('carrinho', [...cart, obj])
    }
  }

  return (
    <div>
      <Link to='/cart'>Carrinho</Link>
      <h1>Store</h1>
      <div>
        {
          data.map((item)=>(
            <div key={item.id}>
              <h4>{item.title}</h4>
              <img src={item.thumbnail} alt={item.id} />
              <h4>{item.price}</h4>
              <button
              onClick={()=>handleClick(item)}
              >
                  {// verifica se nesse cart já há algum item, verificando pelo ID. 
                    cart.some((itemCart) => itemCart.id === item.id) ?
                    (<BsFillCartCheckFill/>) : (<BsFillCartPlusFill/>)
                  }
              </button>
            </div>
          ))
        }
      </div>
    </div>
  )
}
