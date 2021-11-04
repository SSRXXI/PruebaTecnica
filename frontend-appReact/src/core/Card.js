import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import './Card.css';
import ShowImage from './ShowImage';
//import urlVideo from '../../public/videos/Wonderwall.mp4';
import VideoUrl from '../videos/Wonderwall.mp4';

const Card = ({ curso }) => {
  const [count, setCount] = useState(curso.count)
  return (
    <div className="card m-10 card-cont">
      <div className="">
        <ShowImage className="img" item={curso} url="curso" />
        <p>{curso.name}</p>
        <p>${curso.price}</p>
        <p>{curso.description}</p>
        <Link to={`/curso/${curso._id}`}>
          <button className="btn btn-success">Ver Mas</button>
        </Link>
      </div>
      <div className="justify-content">
        <ReactPlayer url={VideoUrl}
          width='320px'
          height='240px'
          
          controls />
      </div>
    </div>

  )
}

export default Card;