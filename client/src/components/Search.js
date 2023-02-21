import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./Search.css"
import axios from "axios"

const Search = () => {
  const params = useParams();
  const userId = params.id;
  // console.log(userId)

  const navigate = useNavigate()
  const [list, setList] = useState([])
  const [svalue, setSvalue] = useState("")
  const [u, setU] = useState("")

  const reqDetail = {
    from: userId,
    to: u
  }

  const sendReq = async () => {
    console.log(reqDetail)
    // await axios.post("http://localhost:4000/request", reqDetail)
    // .then((res)=>{
    //   console.log(res)
    //   alert("Friend Request Send")
    // })
    // .catch((err)=>{
    //   console.log(err)
    //   alert("Not able to send request")
    // })
  }
  const searchResult = async () => {
    await axios
      .get("http://localhost:4000/user/" + svalue, {
        "headers": {
          authorization: `Bearer ${localStorage.getItem('LoginToken')}`
        }
      })
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.log(err)
        navigate("/")
      });
  }


  return (
    <div className='usersearch'>
      <input className='searchbar' onChange={(e) => { setSvalue(e.target.value) }}></input>
      <button className='searchbtn' onClick={searchResult}>Search</button>
      {list.map(c => {
        return (
          <>
            <div className='searchresults' key={c.id}>
              <div className='fullname'>{c.name}</div>
              <button className='sendreq' onClick={c}>Send Request</button>
            </div>
          </>
        )
      })}
    </div>
  )
}

export default Search
