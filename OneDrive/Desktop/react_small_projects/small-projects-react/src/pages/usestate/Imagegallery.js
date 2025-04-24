import React ,{useState} from 'react';
function Imagegallery(){
    const[image,setImage]=useState([
        {id:1,url:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbeautiful%2F&psig=AOvVaw0ddDzV-lv_j-EzP4ayPac0&ust=1745498773633000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNC2u-SX7owDFQAAAAAdAAAAABAE",like:0,dislike:0},
        {id:2,url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLat8bZvhXD3ChSXyzGsFVh6qgplm1KhYPKA&s",like:0,dislike:0},
        {id:3,url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s",like:0,dislike:0}
    ]);
    const handleLike=(id)=>{
        setImage(image.map(img=>img.id===id?{...img,like:img.like+1}:img))
    };
    const handleDislike=(id)=>{
        setImage(image.map(img=>img.id===id?{...img,dislike:img.dislike+1}:img));
    };

    return(
    <div style={{ display: 'flex', gap: '20px' }}>
      {image.map(image => (
        <div key={image.id}>
          <img src={image.url} alt="Gallery" style={{ width: '150px' }} />
          <div>
            <button onClick={() => handleLike(image.id)}>👍 {image.like}</button>
            <button onClick={() => handleDislike(image.id)}>👎 {image.dislike}</button>
          </div>
        </div>
      ))}
    </div>

    )
}
export default Imagegallery;