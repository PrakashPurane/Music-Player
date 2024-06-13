// import image1 from "./assets/image1.jpg";
import "./App.css";
import { useRef, useState } from "react";
import { FaBackward } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaForward } from "react-icons/fa";
import { IoIosPause } from "react-icons/io";
import song1 from "./assets/SujanChapagain-LAJAYERA.mp3";
import song2 from "./assets/ArijitSingh-APNABANALE.mp3";
import song3 from "./assets/RafatFatehAliKhan-BOLNAHALKEHALKE.mp3";
import song4 from "./assets/SajjanRajVaidya-DHAIRYA.mp3";
import song5 from "./assets/ShafqatAmanatAli-TUHIMERA.mp3";

function App() {
  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: "LAJAYERA",
    songArtist: "Sujan Chapagain",
    songSrc: song1,
    songAvatar: "/sujan.jpg",
  });
  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const currentAudio = useRef();

  const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime =
      (e.target.value * currentAudio.current.duration) / 100;
  };

  let avatarClass = ["objectFitCover", "objectFitContain", "none"];
  const [avatarClassIndex, setAvatarClassIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState("00 : 00");
  const [musicCurrentTime, setMusicCurrentTime] = useState("00 : 00");
  const [videoIndex, setVideoIndex] = useState(0);
  // const [videoIndex, setVideoIndex] = useState(0);

  const handleAvatar = () => {
    if (avatarClassIndex >= avatarClass.length - 1) {
      setAvatarClassIndex(0);
    } else {
      setAvatarClassIndex(avatarClassIndex + 1);
    }
  };

  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true);
    } else {
      currentAudio.current.pause();
      setIsAudioPlaying(false);
    }
  };

  const musicAPI = [
    {
      songName: "LAJAYERA",
      songArtist: "Sujan Chapagain",
      songSrc: song1,
      songAvatar: "/sujan.jpg",
    },
    {
      songName: "APNA BANA LE",
      songArtist: "Arijit Singh",
      songSrc: song2,
      songAvatar: "/Arijit.jpg",
    },
    {
      songName: "BOL NA HALKE HALKE",
      songArtist: "Rafat Fateh Ali Khan",
      songSrc: song3,
      songAvatar: "/rafat.jpg",
    },
    {
      songName: "DHAIRYA",
      songArtist: "Sajjan Raj Vaidya",
      songSrc: song4,
      songAvatar: "/Sajjan.jpg",
    },
    {
      songName: "TU HI MERA",
      songArtist: "Shafqat Amanat Ali",
      songSrc: song5,
      songAvatar: "/Shafqat.jpg",
    },
  ];

  const handleNextPlay = () => {
    let nextIndex = (musicIndex + 1) % musicAPI.length;
    setMusicIndex(nextIndex);
    updateCurrentMusicDetails(nextIndex);
  };

  const handlePrevPlay = () => {
    let prevIndex = (musicIndex - 1 + musicAPI.length) % musicAPI.length;
    setMusicIndex(prevIndex);
    updateCurrentMusicDetails(prevIndex);
  };


  const updateCurrentMusicDetails = (number) => {
    let musicObject = musicAPI[number];
    currentAudio.current.src = musicObject.songSrc;
    currentAudio.current.play();
    setCurrentMusicDetails({
      songName: musicObject.songName,
      songArtist: musicObject.songArtist,
      songSrc: musicObject.songSrc,
      songAvatar: musicObject.songAvatar,
    });
    setIsAudioPlaying(true);

    currentAudio.current.addEventListener('loadedmetadata', () => {
      let min = Math.floor(currentAudio.current.duration / 60);
      let sec = Math.floor(currentAudio.current.duration % 60);
      let musicTotalLength0 = `${min < 10 ? `0${min}` : min} : ${
        sec < 10 ? `0${sec}` : sec
      }`;
      setMusicTotalLength(musicTotalLength0);
    }, { once: true });
  };


  const handleAudioUpdate = () => {
    let currentMinutes = Math.floor(currentAudio.current.currentTime / 60);
    let currentSeconds = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${
      currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes
    } : ${currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}`;
    setMusicCurrentTime(musicCurrentT);

    const progress = parseInt(
      (currentAudio.current.currentTime / currentAudio.current.duration) * 100
    );
    setAudioProgress(isNaN(progress) ? 0 : progress);
  };

  
  const vidArray = ['./video1.mp4', './video2.mp4', './video3.mp4', './video4.mp4'];

  const handleChangeBackground = () => {
    if (videoIndex > vidArray.length -  1){
      setVideoIndex(0);
    }else{
      setVideoIndex(videoIndex + 1)
    }
  };

  return (
    <>
      <div className="container">
        <audio
          src={song1}
          ref={currentAudio}
          onEnded={handleNextPlay}
          onTimeUpdate={handleAudioUpdate}
        ></audio>
        <video
          src={vidArray[videoIndex]}
          autoPlay
          muted
          loop
          className="backgroundVideo"
        ></video>
        <div className="blackScreen"></div>
        <div className="music-container">
          <p className="musicPlayer">Music Player</p>
          <p className="music-Head-Name">{currentMusicDetails.songName}</p>
          <p className="music-Artist-Name">{currentMusicDetails.songArtist}</p>
          <img
            src={currentMusicDetails.songAvatar}
            className={avatarClass[avatarClassIndex]}
            onClick={handleAvatar}
            alt="song Avatar"
            id="songAvatar"
          />
          <div className="musicTimerDiv">
            <p className="musicCurrentTime">{musicCurrentTime}</p>
            <p className="musicTotalLength">{musicTotalLength}</p>
          </div>
          <input
            type="range"
            name="musicProgressBar"
            className="musicProgressBar"
            value={audioProgress}
            onChange={handleMusicProgressBar}
          />
          <div className="musicControllers">
            <FaBackward className="btn" onClick={handlePrevPlay} />
            {isAudioPlaying ? (
              <IoIosPause className="faplay" onClick={handleAudioPlay} />
            ) : (
              <FaPlay className="faplay" onClick={handleAudioPlay} />
            )}
            {/* <FaPlay className="faplay"  onClick={handleAudioPlay}/> */}
            <FaForward className="btn" onClick={handleNextPlay} />
          </div>
        </div>
        <div className="changeBackbtn" onClick={handleChangeBackground}>
          Change Background
        </div>
      </div>
    </>
  );
}

export default App;
