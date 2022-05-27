import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'

function App() {

  const [foodName, setfoodName] = useState("");
  const [days, setDays] = useState(0);


  const [foodList, setfoodList] = useState([]);

  const [newFoodName, setNewFoodName] = useState('');

  useEffect(() => {

    axios.get('http://localhost:5000/read')
      .then((response) => {
        setfoodList(response.data)
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err)
      })

  }, []);

  const addList = (e) => {
    e.preventDefault()
    // console.log(foodName);
    axios.post('http://localhost:5000/insert', {
      foodName: foodName,
      days: days
    }
      ,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
  }


  const updateFood = (id) => {
    axios.put('http://localhost:5000/update', {
      id: id,
      newFoodName: newFoodName
    }
    )
  }

  const deleteFood = (id) => {

    axios.delete(`http://localhost:5000/delete/${id}`

    )
  }

  return (

    <div >

      <form className="App" onSubmit={addList}>

        <h1>Crud App With MERN</h1>

        <label>Food Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setfoodName(event.target.value)
          }} />

        <label>Days Since You At it:</label>
        <input
          type="number"
          onChange={(event) => {
            setDays(event.target.value)
          }} />

        <button >Add To List</button>

      </form>

      <div className="App">

        <h1>Food List</h1>

        <table >
          <tbody>
            {
              foodList.map((val, index) => {
                return (

                  <tr key={index} >

                    <td> S.NO : "{index + 1} "</td>
                    <td> Food Name : "{val.foodName} "</td>
                    <td> Days :: " {val.daysSinceIAte} "</td>
                    <td><input
                      className='tableItemsCenter'
                      type="text"
                      placeholder='New Food Name ....'
                      onChange={(event) => {
                        setNewFoodName(event.target.value)
                      }}
                    /> </td>
                    <td><button onClick={() => { updateFood(val._id) }} className='tableItemsCenter'>Update</button></td>
                    <td><button onClick={() => { deleteFood(val._id) }} className='tableItemsCenter'> Delete </button></td>

                  </tr>

                )
              }
              )
            }

          </tbody>

        </table>

      </div>

    </div>
  );

}

export default App;



