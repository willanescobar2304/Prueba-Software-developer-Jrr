import './Post.css'
import './Card.css'
import './VideoEdit'
import user from '../assets/mujer.jpg' 
import Player from '@madzadev/audio-player'
import PropTypes from 'prop-types';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faComment, faShareFromSquare} from '@fortawesome/free-regular-svg-icons';
import { faCheck, faMusic,faEarthAmericas, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { Button, Fab } from '@mui/material';
import { faHand } from '@fortawesome/free-regular-svg-icons';
function Post({image,video,audio,text}) {
    const tracks = [{
        url: audio, 
        title: "Ocean",
        tags: ["house"]
      }];
  return (
    <div className="container-post">
        <div id='head-post'>
            <div className="avatar" id='user-post'>
                <img src={user} alt="" className="image"/>
                <h4>Artist name</h4>
                <Fab id='music-post' style={{backgroundColor:"white",padding:"1px",width:"20px",minHeight:"1px",height:"20px"}}size='small'>
                    <FontAwesomeIcon icon={faMusic} width="10px" />
                </Fab>
                <Fab id='music-post' style={{backgroundColor:"white",padding:"1px",width:"20px",minHeight:"1px",height:"20px"}}size='small'>
                    <FontAwesomeIcon icon={faCheck} width="10px" />
                </Fab>
                <p>.</p>
                <p id='five-min'>5 min</p>
                <Fab id='music-post' style={{backgroundColor:"transparent",padding:"1px",width:"20px",minHeight:"1px",height:"20px",boxShadow:"none", outline:"none"}}size='small'>
                    <FontAwesomeIcon icon={faEarthAmericas} id='world'/>
                </Fab>
                <Fab style={{ left:"100%",backgroundColor: "transparent", borderColor: "none", boxShadow: "none", width: "50px",minHeight:"1px", height: "50px", padding: 0, minWidth: 0, outline: "none" }} size="medium">
                    <FontAwesomeIcon icon={faEllipsisH} color="white" size='2x' />
                </Fab>
            </div>
        </div>
        <div id='body-post-public-users'>
            {image != null &&(
                <img src={image}id='post-image-public' style={{maxHeight:'100%',objectFit:'cover'}}/>
            )}
            {video != null &&(
                <video id='video-post' src={video} controls autoPlay onLoadedData={(e) => e.currentTarget.play()} style={{ maxHeight: '400px', objectFit: 'cover' }}>
                </video>
            )}
            {audio != null &&(
                <div id='audio-post-public'>
                    <Player
                    trackList={tracks}
                    includeTags={false}
                    includeSearch={false}
                    showPlaylist={false}
                    sortTracks={true}
                    autoPlayNextTrack={true}
                    />
                </div>
            )}
        </div>
        <div id='text-post'>
            <p>{text}</p>
        </div>
        <div id='icons-post-bottom'>
            <Button id='likes-post'>
                <FontAwesomeIcon icon={faHand} size='2x'/>
                <h4>20 likes</h4>
            </Button>
            <Button id='likes-post'>
            <FontAwesomeIcon icon={faComment} size='2x'/>
                <h4>comments</h4>
            </Button>
            <Button id='likes-post'>
            <FontAwesomeIcon icon={faShareFromSquare} size='2x' />
                <h4>comments</h4>
            </Button>
        </div>
    </div>
  )
}
Post.propTypes = {
    image:PropTypes.string.isRequired,
    video:PropTypes.string.isRequired,
    audio:PropTypes.string.isRequired,
    text:PropTypes.string.isRequired
}

export default Post