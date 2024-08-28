import './App.css';
import 'react-image-crop/dist/ReactCrop.css';
import Card from './components/Card';
import Post from './components/Post';
import { useState, useEffect } from 'react';

function App() { 
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [audio, setAudio] = useState(null);   
  const [postText, setPostText] = useState('');

  const handlePost = (data) => {
    setImage(data.image); 
    setVideo(data.video);
    setAudio(data.audio);
    setPostText(data.text);
  };

  useEffect(() => {
  }, [image,video,audio, postText]);  

  return (
    <div className='App'>
      <Card onPost={handlePost} />  
      <Post image={image} video={video} audio={audio} text={postText} />
    </div>
  );
}

export default App;
