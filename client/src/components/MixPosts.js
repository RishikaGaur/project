import React, { useEffect,useState } from 'react'
import { Outlet,useNavigate,useParams} from 'react-router-dom'
import axios from "axios"
import "./MixPosts.css"

const MixPosts = () => {
  const navigate = useNavigate();
  const [list,setList]=useState([])
  axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('LoginToken')}`;

  const fetchLlist = async () => {
    await axios
    .get("http://localhost:4000/post")
    .then((res) => {
      setList(res.data);
    })
    .catch((err) => {console.log(err); navigate("/")});
  }

  useEffect( () => {
    fetchLlist()
  }, [])

  return (
    <div className='mixpost'>
          {list.map(c=>{
            const {caption,content}=c;
            return(
              <>
         <div className='singlepost'>
           <div className='postcaption'>{caption}</div>
           <div className='postcontent'>{content}</div>
         </div>
              </>
            )
          })}
    </div>
  )
}

export default MixPosts
