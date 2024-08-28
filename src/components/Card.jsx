import "./Card.css";
import user from '../assets/mujer.jpg';
import PropTypes from 'prop-types';
import ImageEdit from "./ImageEdit";
import VideoEdit from "./VideoEdit";
import AudioEdit from "./AudioEdit";
import { useState } from "react";
import Select from 'react-select';
import { Fab, Modal } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { faCirclePlay, faImage, faMicrophone, faTag } from "@fortawesome/free-solid-svg-icons";

const styles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#4a4a4a",
    borderColor: "transparent",
    borderRadius: 20,
    boxShadow: "none",
    color: "#959595"
  }),
  option: (styles) => ({
    ...styles,
    backgroundColor: "#4a4a4a",
    color: "#959595",
    '&:hover': {
      backgroundColor: "#555555"
    }
  }),
  menu: (styles) => ({
    ...styles,
    margin: 0,
    borderRadius: '14px',
    backgroundColor: "transparent"
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  placeholder: (styles) => ({
    ...styles,
    color: '#959595'
  }),
  singleValue: (styles) => ({
    ...styles,
    color: '#959595'
  })
};

function Card({ onPost }) {
  const options = [{ value: "Público", label: "Público" }, { value: "Privado", label: "Privado" }];
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOpenModal = (fileType) => {
    setSelectedOption(fileType);
    setIsModalOpen(true);
  };

  const handleImageUpload = (e) => {
    if (e.target.files.length > 0) {
      setImage(URL.createObjectURL(e.target.files[0]));
      handleOpenModal("Image");
    }
  };

  const handleVideoUpload = (e) => {
    if (e.target.files.length > 0) {
      setVideo(URL.createObjectURL(e.target.files[0]));
      handleOpenModal("Video");
    }
  };

  const handleAudioUpload = (e) => {
    if (e.target.files.length > 0) {
      setAudio(URL.createObjectURL(e.target.files[0]));
      handleOpenModal("Audio");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePostData = (data) => {
    onPost(data);
    closeModal();
  };

  return (
    <div className="container">
      <div className="user-info">
        <div className="avatar">
          <img src={user} alt="" className="image" />
        </div>
        <div className="component">
          <textarea className="input-text" placeholder="Writing text"/>
        </div>
        <Fab
          style={{
            top: 40, right: 40, backgroundColor: "transparent",
            borderColor: "none", boxShadow: "none", width: "auto", height: "auto",
            padding: 0, minWidth: 0, outline: "none"
          }}
          size="small"
        >
          <FontAwesomeIcon icon={faFaceSmile} style={{ fontSize: 24, color: "white" }} />
        </Fab>
      </div>
      <div className="options">
        <div className="add">
          <p>Agregar</p>
          <Fab style={{ backgroundColor: "transparent", borderColor: "none", boxShadow: "none", width: "auto", height: "auto", padding: 0, minWidth: 0, outline: "none" }} size="medium">
            <FontAwesomeIcon
              color="white"
              icon={faImage}
              onClick={() => document.getElementById('imageUpload').click()}
            />
            <input
              type="file"
              id="imageUpload"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Fab>
          <Fab style={{ backgroundColor: "transparent", borderColor: "none", boxShadow: "none", width: "auto", height: "auto", padding: 0, minWidth: 0, outline: "none" }} size="medium">
            <FontAwesomeIcon
              color="white"
              icon={faCirclePlay}
              onClick={() => document.getElementById('videoUpload').click()}
            />
            <input
              type="file"
              id="videoUpload"
              style={{ display: 'none' }}
              accept="video/*"
              onChange={handleVideoUpload}
            />
          </Fab>
          <Fab style={{ backgroundColor: "transparent", borderColor: "none", boxShadow: "none", width: "auto", height: "auto", padding: 0, minWidth: 0, outline: "none" }} size="medium">
            <FontAwesomeIcon
              color="white"
              icon={faMicrophone}
              onClick={() => document.getElementById('audioUpload').click()}
            />
            <input
              type="file"
              id="audioUpload"
              style={{ display: 'none' }}
              accept="audio/*"
              onChange={handleAudioUpload}
            />
          </Fab>
          <Fab style={{ backgroundColor: "transparent", borderColor: "none", boxShadow: "none", width: "auto", height: "auto", padding: 0, minWidth: 0, outline: "none" }} size="medium">
            <FontAwesomeIcon icon={faTag} color="white" />
          </Fab>
        </div>
        <div className="select">
          <Select
            options={options}
            styles={styles}
            isSearchable={false}
            id="Selection"
          />
          <button className="post">
            <h4>Post</h4>
          </button>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
        style={{
          overlay: {
            backgroundColor: 'rgba(18, 34, 25, 0.8)',
          }
        }}
      >
        <div>
          {selectedOption === "Image" && (
            <ImageEdit closeModal={closeModal} imageSelect={image} styles={styles} options={options} onPost={handlePostData} />
          )}
          {selectedOption === "Video" && (
            <VideoEdit closeModal={closeModal} videoSelect={video} styles={styles} options={options} onPost={handlePostData} />
          )}
          {selectedOption === "Audio" && (
            <AudioEdit closeModal={closeModal} audioSelect={audio} styles={styles} options={options} onPost={handlePostData} />
          )}
        </div>
      </Modal>
    </div>
  );
}

Card.propTypes = {
  onPost: PropTypes.func.isRequired
};

export default Card;
