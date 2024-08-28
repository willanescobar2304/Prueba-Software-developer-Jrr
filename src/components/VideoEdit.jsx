import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './Card';
import user from '../assets/mujer.jpg';
import './imageEdit.css';
import './VideoEdit.css';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { faX, faPlus, faPenToSquare, faImage, faCirclePlay, faMicrophone, faTag, faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { Button, Fab, Modal } from '@mui/material';
import { useState } from 'react';

function VideoEdit({ closeModal, videoSelect, styles, options, onPost }) { 
  const [editVideo, setEditVideo] = useState(false);
  const [text, setText] = useState('')

  const handlePost = () => {
    const returnVideo = videoSelect;
    const returnText = text;

    if (typeof onPost === 'function') {
      onPost({ video: returnVideo, text: returnText });
      console.log(onPost)
      console.log(text)
      closeModal();
    } else {
      console.error('onPost is not a function');
    }
  };

  const handleEditVideo = () => {
    setEditVideo(true);
  }

  const handleCloseEditVideo = () => {
    setEditVideo(false);
  }

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
          <video id='video-post' src={videoSelect} controls autoPlay onLoadedData={(e) => e.currentTarget.play()} style={{ maxHeight: '400px', objectFit: 'cover' }}>
          </video>
          <div className="floating-buttons">
            <Fab style={{ bottom: "17vw", left: "0.8vw", outline: 'none', backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white" }} size="medium">
              <FontAwesomeIcon icon={faPlus} id='post-buttons-icons' />
            </Fab>
            <Fab onClick={handleEditVideo} style={{ bottom: "17vw", left: "0.8vw", outline: 'none', textTransform: 'none', backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: 'initial', color: "white", width: "10.5vw", borderRadius: "10px", alignItems: 'center' }} size="medium">
              <FontAwesomeIcon icon={faPenToSquare} color='black' id='post-buttons-icons-video' size='2x' />
              <h3>Edit thumbnail</h3>
            </Fab>
            <Fab style={{ bottom: "17vw", left: "17vw", outline: 'none', backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white" }} onClick={closeModal} size="medium">
              <FontAwesomeIcon icon={faX} id='post-buttons-icons' />
            </Fab>
          </div>
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
          <h3>Post</h3>
        </Button>
      </div>
      <Modal open={editVideo} onClose={handleCloseEditVideo}>
        <div className="container-edit-video">
          <div id='head-edit-video'>
            <h3>Edit thumbnail</h3>
            <Fab style={{ left: "29vw", backgroundColor: "transparent", borderColor: "none", boxShadow: "none", width: "auto", height: "auto", padding: 0, minWidth: 0, outline: "none" }} onClick={closeModal} size="medium">
                <FontAwesomeIcon icon={faX} color='white' />
            </Fab>
          </div>
          <div id='upload-video-edit' className='dash-border-box'>
                <FontAwesomeIcon className='icon-video-edition' icon={faCameraRetro} size='10x'/>
                <p>Add a photo or upload</p>
          </div>
          <div id='cancel-or-saved'>
            <Button onClick={handleCloseEditVideo} id='cancel-edit-video'>
                <h4>Cancel</h4>
            </Button>
            <Button onClick={handleCloseEditVideo} id='saved-edit-video'>
                <h4>Saved</h4>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

VideoEdit.propTypes = {
  closeModal: PropTypes.func.isRequired,
  videoSelect: PropTypes.string,
  styles: PropTypes.object,
  options: PropTypes.array,
  onPost: PropTypes.func.isRequired
};

export default VideoEdit;
