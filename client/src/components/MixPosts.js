import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import "./MixPosts.css"

const MixPosts = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([])

  const fetchLlist = async () => {
    await axios
      .get("http://localhost:4000/post", {
        "headers": {
          authorization: `Bearer ${localStorage.getItem('LoginToken')}`
        }
      })
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => { 
        console.log(err)
      });
  }

  useEffect(() => {
    fetchLlist()
  }, [])

  return (
    <div className='mixpost'>
      {list.map(c => {
        const { id, caption, content, likes, comments } = c;
        return (
          <>
            <div className='singlepost' key={id}>
              <div className='postcaption'>{caption}</div>
              <div className='postcontent'>{content}</div>
              <div className='postfooter'>Likes:{likes} <br /> Comments:{comments}</div>
            </div>
          </>
        )
      })}
    </div>
  )
}

export default MixPosts
