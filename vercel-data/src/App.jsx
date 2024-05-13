import { useState } from 'react'
import './App.css'
import  {products}  from './Data';

console.log(products)
function App() {


  return (

    <>
{products.map((Item,i)=>{
  return(
  <div className="main" key={Item.id} style={{border: '1px solid', padding: 10, margin: 10, textAlign:'center'}}>
  <h3>{Item.name}</h3>
  <p>{Item.description}</p>
  <p>{Item.price}</p>
  <p>{Item.category}</p>
  
  </div>)
})}
      
    </>
  )
}

export default App
