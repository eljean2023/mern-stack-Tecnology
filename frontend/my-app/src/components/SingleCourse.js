import React, { useState } from 'react'
import {Card, Button, Image} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate, useParams} from 'react-router-dom'

const SingleCourse = ({course}) => {


  var myWindow = window.open("", "MsgWindow", "width=200,height=100");
  //myWindow.document.write("<p>This is 'MsgWindow'. I am 200px wide and 100px tall!</p>");
 // https://www.youtube.com/watch?v=TcwDOwWQ-GE&list=RDTcwDOwWQ-GE&start_radio=1
 // https://www.youtube.com/watch?v=nweBl8j2rjs&list=RDMMnweBl8j2rjs&start_radio=1
  let timex = 3000
  var linkx = `${course.link}`
  var linkxxx;
  console.log(linkx)
 
  linkxxx = linkx.split("v=")[1]?.split("&")[0]

  console.log(linkxxx)
  let height = 600;
  let width = 1200;
  
  const navigate = useNavigate()
  const {id} = useParams()

  function openWin() {
    myWindow = window.open(linkx, 'popUpWindow', 'height=' + height + ', width=' + width + ', resizable=yes,scrollbars=yes,toolbar=yes');   // Opens a new window
    if(myWindow){
      setTimeout(()=>{
        myWindow.close()
      }, timex)
     // navigate(`/agendaAlls`)
    }
  }
  
  const AddToCart = () =>{
    navigate(`/cart/${id}`)
}

  function closeWin() {
    myWindow.close();  // Closes the new window
  }


{
  /*
    var sampleUrl = "https://www.youtube.com/shorts/O5qxOT2dXT4";

  var video_id = sampleUrl.split("v=")[1].substring(0, 10)

  console.log(video_id)
  */
}

  return (
    <Card className='my-3 p-3 rounded'>
    <a href={`/course/${course._id}`}>
    <Card.Title as='div'>
     {
      /*
       <strong> {product.title} </strong>
       <a href={`${product.title} target='_blank' `} target='_blank'>{product.name}</a>
      */
     }
      <Card.Text as='h4' className='text-center'>
         {course.name} 
      </Card.Text>


    </Card.Title>
    </a> 
    {
      /*
      <Card.Text as='div'>
      <div className='my-3'> {product.category} </div>
      </Card.Text>
      */
    }
    {/* <a href={`/product/${product._id}`}> */}

     {/*
       <video  controls oncontextmenu="return false" controlsList="nodownload noplaybackrate nofullscreen" loop id="video" style={{width:'100%', height: '100%'}} >
      <source  src={`${product.title}#t=20,30`} type="video/mp4" />
     
    </video>
     */}
        {/* https://www.youtube.com/embed/E7wJTI-1dvQ */}
    <iframe className='pointer-events' src={`https://www.youtube.com/embed/${linkxxx} `}
        frameborder='2'
        allow='autoplay; encrypted-media'
        //allowfullscreen
        //title='video'
        />

    <Button onClick={openWin} className='text-warning-x' >Play !</Button>
    <Button onClick={AddToCart}>Add To cart</Button>
      {/*
      
      <div>
      <iframe src={`${product.title}`}
        frameborder='2'
        allow='autoplay; encrypted-media'
        //allowfullscreen
        //title='video'
        />
        </div>

      */}
        
  {/*   </a>  */}
    <Card.Body>
  
      {
        /*
        
      <Card.Text as='h6'>
      <Button className='my-3 text-warning'> $ {product.price} </Button>
      </Card.Text>

        */
      }

 
    </Card.Body>

    </Card>
  )
}

export default SingleCourse

{/*
  products.map((product)=>{
      return <tr key={product._id} className='market'>
      <td className='text-warning-x'>{product.title}</td>
      <td>{product.category}</td>
      <td><video controls controlsList="nodownload" loop id="video" style={{width:'100%', height: '100%'}} >
          <source src={`${product.filename}#t=20,30`} type="video/mp4" />
      </video></td>
      <td> <Button onClick={AddToCart}>Add To cart</Button>
     </td>
     </tr>
  }
  )
*/}