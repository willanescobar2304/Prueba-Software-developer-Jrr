import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";
import PropTypes from 'prop-types';
import Select from 'react-select';
import './Card';
import user from '../assets/mujer.jpg';
import './imageEdit.css';
import './AudioEdit.css'; 
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { faX, faImage, faCirclePlay, faMicrophone, faTag} from '@fortawesome/free-solid-svg-icons';
import { Button, Fab} from '@mui/material';
import { useState } from 'react';

function AudioEdit({ closeModal, audioSelect, styles, options, onPost }) { 
  const [text, setText] = useState('');

  const tracks = [{
    url: audioSelect, 
    title: "Ocean",
    tags: ["house"]
  }];

  const handlePost = () => {
    const returnAudio = audioSelect;
    const returnText = text;

    if (typeof onPost === 'function') {
      onPost({ audio: returnAudio, text: returnText });
      closeModal();
    } else {
      console.error('onPost is not a function');
    }
  };


  return (
    <div className='Modal-container'>
      <div className='head-text'>
        <div id='head-title'>
          <h3>Crear una publicación</h3>
        </div>
        <Fab style={{ left: "29vw", backgroundColor: "transparent", borderColor: "none", boxShadow: "none", width: "auto", height: "auto", padding: 0, minWidth: 0, outline: "none" }} onClick={closeModal} size="medium">
          <FontAwesomeIcon icon={faX} color='white' />
        </Fab>
      </div>
      <div id='body-post'>
        <div className='user-post'>
          <img src={user} alt="" className="image" />
        </div>
        <div className='image-post'>
            <Player
              trackList={tracks}
              includeTags={false}
              includeSearch={false}
              showPlaylist={false}
              sortTracks={true}
              autoPlayNextTrack={true}
            />
        </div>
      </div>
      <div className="component" id='post-text-input'>
        <textarea placeholder='writing a comment' className="input-text" id='text-input-post' value={text} onChange={(e) => setText(e.target.value)} />
        <Fab
          style={{
            top: 55, right: 20, backgroundColor: "transparent",
            borderColor: "none", boxShadow: "none", width: "auto", height: "auto",
            padding: 0, minWidth: 0, outline: "none"
          }}
          size="small"
        >
          <FontAwesomeIcon icon={faFaceSmile} style={{ fontSize: 24, color: "white" }} />
        </Fab>
      </div>
      <div id='menu-options'>
        <div className='add' id='options-post'>
          <p>Agregar</p>
          <Fab style={{ backgroundColor: "transparent", borderColor: "none", boxShadow: "none", width: "auto", height: "auto", padding: 0, minWidth: 0, outline: "none" }} size="large">
            <FontAwesomeIcon color="white" icon={faImage} size='2x' />
          </Fab>
          <Fab style={{ backgroundColor: "transparent", borderColor: "none", boxShadow: "none", width: "auto", height: "auto", padding: 0, minWidth: 0, outline: "none" }} size="medium">
            <FontAwesomeIcon color="white" icon={faCirclePlay} size='2x' />
          </Fab>
          <Fab style={{ backgroundColor: "transparent", borderColor: "none", boxShadow: "none", width: "auto", height: "auto", padding: 0, minWidth: 0, outline: "none" }} size="medium">
            <FontAwesomeIcon color="white" icon={faMicrophone} size='2x' />
          </Fab>
          <Fab style={{ backgroundColor: "transparent", borderColor: "none", boxShadow: "none", width: "auto", height: "auto", padding: 0, minWidth: 0, outline: "none" }} size="medium">
            <FontAwesomeIcon color="white" icon={faTag} size='2x' />
          </Fab>
        </div>
        <Select
          id='select-post-options'
          options={options}
          styles={styles}
          isSearchable={false}
        />
        <Button id='button-post-options' onClick={handlePost}>
          <h3 style={{ textTransform: 'none' }}>Post</h3>
        </Button>
      </div>
    </div>
  );
}

AudioEdit.propTypes = {
  closeModal: PropTypes.func.isRequired,
  audioSelect: PropTypes.string,
  styles: PropTypes.object,
  options: PropTypes.array,
  onPost: PropTypes.func.isRequired
};

export default AudioEdit;
