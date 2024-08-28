import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';
import Select from 'react-select';
import setCanvasPreview from "../setCanvasPreview";
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from "react-image-crop";
import './Card';
import user from '../assets/mujer.jpg';
import './imageEdit.css';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { faX, faPlus, faPenToSquare, faImage, faCirclePlay, faMicrophone, faTag} from '@fortawesome/free-solid-svg-icons';
import { Button, Fab, Modal } from '@mui/material';
import { useState, useRef} from 'react';

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 90;

function ImageEdit({ closeModal, imageSelect, styles, options, onPost}) {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null); 
  const [editCropImage, setEditCrop] = useState(false);
  const [crop, setCrop] = useState();
  const [originalImage] = useState(imageSelect); 
  const [currentImage, setCurrentImage] = useState(imageSelect); 
  const [text, setText] = useState('')

  const onLoadImage = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthPercent = (MIN_DIMENSION / width) * 100;
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const handleClick = () => {
    setEditCrop(true);
    setCurrentImage(originalImage); 
  };

  const handleClickClose = () => {
    setEditCrop(false);
  };

  const handlePost= ()=>{
    const returnImage = currentImage || imageSelect;
    const returnText = text

    if (typeof onPost === 'function') {
        onPost({ image: returnImage, text: returnText });
        closeModal()
      } else {
        console.error('onPost is not a function');
      }
  }

  return (
    <div className='Modal-container'>
      <div className='head-text'>
        <div id='head-title'>
          <h3>Crear una publicación</h3>
        </div>
        <Fab style={{ left: "29vw", backgroundColor: "transparent", borderColor: "none", boxShadow: "none", width: "auto", height: "auto", padding: 0, minWidth: 0, outline: "none", '&:active': { boxShadow: "none" } }} onClick={closeModal} size="medium">
          <FontAwesomeIcon icon={faX} color='white' />
        </Fab>
      </div>
      <div id='body-post'>
        <div className='user-post'>
          <img src={user} alt="" className="image" />
        </div>
        <div className='image-post'>
          <img src={currentImage} alt='Selected' id='image-selected' />
          <div className="floating-buttons">
            <Fab style={{ bottom: "19vw", left: "0.8vw", outline: 'none', backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white" }} size="medium">
              <FontAwesomeIcon icon={faPlus} id='post-buttons-icons' />
            </Fab>
            <Fab style={{ bottom: "19vw", left: "0.8vw", outline: 'none', textTransform: 'none', backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: 'initial', color: "white", width: "6vw", borderRadius: "10px", alignItems: 'center' }} onClick={handleClick} size="medium">
              <FontAwesomeIcon icon={faPenToSquare} color='black' id='post-buttons-icons' />
              <h3>Edit</h3>
            </Fab>
            <Fab style={{ bottom: "19vw", left: "22vw", outline: 'none', backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white" }} onClick={closeModal} size="medium">
              <FontAwesomeIcon icon={faX} id='post-buttons-icons' />
            </Fab>
          </div>
        </div>
      </div>
      <div className="component" id='post-text-input'>
        <textarea placeholder='writing a comment' className="input-text" id='text-input-post' value={text} onChange={(e)=> setText(e.target.value)}/>
        <Fab
            style={{
                top: 55, right: 20, backgroundColor: "transparent",
                borderColor: "none", boxShadow: "none", width: "auto", height: "auto",
                padding: 0, minWidth: 0, outline: "none", '&:active': { boxShadow: "none" }
            }}
            size="small"
        >
            <FontAwesomeIcon icon={faFaceSmile} style={{ fontSize: 24, color: "white" }} />
        </Fab>
      </div>
      <div id='menu-options'>
        <div className='add' id='options-post'>
          <p>Agregar</p>
          <Fab style={{ backgroundColor: "transparent", borderColor: "none", boxShadow: "none", width: "auto", height: "auto", padding: 0, minWidth: 0, outline: "none", '&:active': { boxShadow: "none" } }} size="large">
            <FontAwesomeIcon color="white" icon={faImage} size='2x' />
          </Fab>
          <Fab style={{ backgroundColor: "transparent", borderColor: "none", boxShadow: "none", width: "auto", height: "auto", padding: 0, minWidth: 0, outline: "none", '&:active': { boxShadow: "none" } }} size="medium">
            <FontAwesomeIcon color="white" icon={faCirclePlay} size='2x' />
          </Fab>
          <Fab style={{ backgroundColor: "transparent", borderColor: "none", boxShadow: "none", width: "auto", height: "auto", padding: 0, minWidth: 0, outline: "none", '&:active': { boxShadow: "none" } }} size="medium">
            <FontAwesomeIcon color="white" icon={faMicrophone} size='2x' />
          </Fab>
          <Fab style={{ backgroundColor: "transparent", borderColor: "none", boxShadow: "none", width: "auto", height: "auto", padding: 0, minWidth: 0, outline: "none", '&:active': { boxShadow: "none" } }} size="medium">
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
        <Modal open={editCropImage}>
          <div className='Modal-container' id='Modal-container-edit-image'>
            <div className='head-text'>
              <div id='head-title'>
                <h4>Edit photo</h4>
              </div>
              <Fab style={{ left: "35vw", backgroundColor: "transparent", borderColor: "none", boxShadow: "none", width: "auto", height: "auto", padding: 0, minWidth: 0, outline: "none", '&:active': { boxShadow: "none" } }} onClick={handleClickClose} size="medium">
                <FontAwesomeIcon icon={faX} color='white' />
              </Fab>
            </div>
            <div id='body-post'>
              <div className='image-post' id='image-crop-edit'>
                <ReactCrop
                
                  crop={crop}
                  keepSelection
                  onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                  aspect={ASPECT_RATIO}
                  minWidth={MIN_DIMENSION}
                >
                  <img
                    ref={imgRef}
                    src={originalImage}
                    style={{maxHeight:'100%',objectFit:'cover'}}
                    alt='Selected'
                    id='image-selected-crop-post'
                    onLoad={onLoadImage}
                  />
                </ReactCrop>
              </div>
            </div>
            <div className='buttons-save-cancel'>
              <Button id='cancel-image-cancel' onClick={handleClickClose}>
                <h3>Cancel</h3>
              </Button>
              <Button
                id='edit-image-saved'
                onClick={() => {
                  
                  if (previewCanvasRef.current && imgRef.current) {
                    setCanvasPreview(
                      imgRef.current, 
                      previewCanvasRef.current, 
                      convertToPixelCrop(
                        crop,
                        imgRef.current.width,
                        imgRef.current.height
                      )
                    );
                    const dataUrl = previewCanvasRef.current.toDataURL();
                    setCurrentImage(dataUrl); 
                    setEditCrop(false);
                  } else {
                    console.error("El canvas o la imagen no están disponibles.");
                  }
                }}
              >
                <h3>Save</h3>
              </Button>
            </div>
          </div>
        </Modal>
        <canvas ref={previewCanvasRef} style={{ display: "none" }} />
      </div>
    </div>
  );
}

ImageEdit.propTypes = {
  closeModal: PropTypes.func.isRequired,
  imageSelect: PropTypes.string,
  styles: PropTypes.object,
  options: PropTypes.array,
  onPost: PropTypes.func.isRequired
};

export default ImageEdit;
