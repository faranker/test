import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [ num, setNum ] = useState(0)
  const [ numConfirm, setNumConfirm ] = useState(0)
  const [ arr, setArr ] = useState([])
  const [ output, setOutput ] = useState([])

  const [ amount, setAmount ] = useState(1)
  const [ list, setList ] = useState('1')
  const [ arrProduct, setArrProduct ] = useState([
    {
    id: 1,
    list: "A",
    price: 99,
    amount: 0
  },
  {
    id: 2,
    list: "B",
    price: 199,
    amount: 0
  },
  {
    id: 3,
    list: "C",
    price: 3990,
    amount: 0
  }])

  const test = (nums, target) => {
    for(let i = 0; i < nums.length; i++){
      for(let j = i+1; j < nums.length; j++){
          if(nums[i] + nums[j] == target){
            setOutput([i, j])
            return [i, j]
          }
      }
    }
  }
  
  const onHandleAdd = (e) => {
    e.preventDefault()
    setArr((arr) => [...arr, parseInt(num)])
  }

  const onHandleConfirm = (e) => {
    e.preventDefault()
    test(arr, numConfirm)
  }

  const onHandleAddProduct = (e) => {
    e.preventDefault()
    console.log(list, amount);

    setArrProduct()
    // setArr((arr) => [...arr, parseInt(num)])
  }

  const addProduct = (id) => {
    // s
  }

  
  return (
    <div className="App">
      <section style={{marginBottom: '50px'}}>
        <h1>#1: Number Input-Output</h1>
        <p>nums : {JSON.stringify(arr)}</p>
        <form onSubmit={onHandleAdd}>
          <div style={{marginBottom: '20px'}}>
            <input type="number" onChange={e => setNum(e.target.value)} />
            <button type='submit'>Add nums</button>
          </div>
        </form>
      
        <div> 
          <form onSubmit={onHandleConfirm}>
            <label>target : </label>
            <input type="number" onChange={e => setNumConfirm(e.target.value)}></input>
            <button type='submit'>Confirm</button>
          </form>
        
        </div>
        <div><p>output : {JSON.stringify(output)}</p></div>
      </section>

      <section style={{marginBottom: '50px'}}>
        <h1>#3: Promotion Engine</h1>
        <ProductList />
      </section>
      
    </div>
  );
}

const Product = (props) => {
  const [ qty, setQty ] = useState(0)
  
  const add = () => {
    setQty(qty + 1)
    props.handleTotal(props);
  }
  
  return (
    <div >
      <p>{props.name} - {props.price} THB</p>
      <h2>Qty: {qty} item(s)</h2>
      <button onClick={add}>Add</button>
      <hr/>
    </div>
  );
}

const Total = (props) => {
    return (
      <div>
        <h3>Total: {parseFloat(props.total).toFixed(2)} THB</h3>
      </div>
    );
}

const ProductList = (props) => {
  const [ sum, setSum ] = useState([])
  const [ total, setTotal ] = useState(0)
  const [ stack, setStack ] = useState([])
  const [ productList, setProductList ] = useState([
    {
    id: 1,
    name: "A",
    price: 99
  },
  {
    id: 2,
    name: "B",
    price: 199
  },
  {
    id: 3,
    name: "C",
    price: 3990
  }])
  
  const calculateTotal = (data) => {
    setStack((stack) => [...stack, data.name])
    setSum((sum) => [...sum, data.price])
  }

  const sumProduct = () => {
    var checkA = stack.indexOf('A') > -1;
    var checkB = stack.indexOf('B') > -1;

    var price = sum.reduce((a, b) => a + b, 0)


    if (price >= 2000) {
      if (checkA && checkB === true) {
        var x = (price * 10) / 100
        var last = price - x
        setTotal(last - 50)
      } else {
        var x = (price * 10) / 100
        var last = price - x
        setTotal(last)
      }
      
    } else {
      if (checkA && checkB === true) {
        setTotal(price - 50)
      } else {
        setTotal(price)
      }
      
    }
    
    // console.log(stack);
    // console.log(sum);
    
  }

    var products = productList.map(function(product) {
      return (
        <Product name={product.name} price={product.price} handleTotal={calculateTotal}/>
      );
    });
    
    return (
      <div>
        {products}
        <Total total={total} />
        <button onClick={sumProduct}>Calculate</button>
      </div>
    ); 
}

export default App;
