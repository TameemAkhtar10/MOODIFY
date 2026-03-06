import React, { useRef, useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, RotateCw, Gauge, Volume2, SkipForward, Heart } from 'lucide-react'
import { UseSong } from '../hooks/UseSong'
import '../player.scss'

const speeds = [0.5, 1, 1.5, 2]

const Player = ({ song }) => {
  const audioRef = useRef(null)
  const { handlegetnextsong, handlefavorite, isfavorite } = UseSong()

  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('0:00')
  const [duration, setDuration] = useState('0:00')
  const [speedIndex, setSpeedIndex] = useState(1)
  const [volume, setVolume] = useState(1)

  const isFav = isfavorite(song)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load()
      setIsPlaying(false)
      setProgress(0)
      setCurrentTime('0:00')
    }
  }, [song?.url])

  const format = (sec) => {
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (!audio) return
    setCurrentTime(format(audio.currentTime))
    setProgress((audio.currentTime / audio.duration) * 100)
  }

  const handleLoaded = () => {
    setDuration(format(audioRef.current.duration))
  }

  const handleSeek = (e) => {
    const bar = e.currentTarget
    const ratio = e.nativeEvent.offsetX / bar.offsetWidth
    audioRef.current.currentTime = ratio * audioRef.current.duration
  }

  const skip = (sec) => {
    if (!audioRef.current) return
    audioRef.current.currentTime += sec
  }

  const changeSpeed = () => {
    const next = (speedIndex + 1) % speeds.length
    setSpeedIndex(next)
    audioRef.current.playbackRate = speeds[next]
  }

  const handleVolume = (e) => {
    const val = parseFloat(e.target.value)
    setVolume(val)
    audioRef.current.volume = val
  }

  return (
    <div className="player">
      <audio
        ref={audioRef}
        src={song?.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoaded}
        onEnded={handlegetnextsong}
      />

      <div className="player__poster">
        <img src={song?.posterurl} alt={song?.title} />
        <div className="player__poster-overlay" />
        <button
          className={`player__heart ${isFav ? 'player__heart--active' : ''}`}
          onClick={() => handlefavorite(song)}
        >
          <Heart size={16} fill={isFav ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="player__body">
        <div className="player__meta">
          <span className="player__mood">{song?.mood}</span>
          <h2 className="player__title">{song?.title}</h2>
        </div>

        <div className="player__progress">
          <span className="player__time">{currentTime}</span>
          <div className="player__bar" onClick={handleSeek}>
            <div className="player__bar-fill" style={{ width: `${progress}%` }} />
            <div className="player__bar-thumb" style={{ left: `${progress}%` }} />
          </div>
          <span className="player__time">{duration}</span>
        </div>

        <div className="player__volume">
          <Volume2 size={13} color="var(--text-muted)" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolume}
            className="player__volume-slider"
          />
        </div>

        <div className="player__controls">
          <button className="player__speed" onClick={changeSpeed}>
            <Gauge />
            <span>{speeds[speedIndex]}x</span>
          </button>

          <button className="player__skip" onClick={() => skip(-5)}>
            <RotateCcw />
            <span>5</span>
          </button>

          <button className="player__play" onClick={togglePlay}>
            {isPlaying ? <Pause /> : <Play />}
          </button>

          <button className="player__skip" onClick={() => skip(5)}>
            <RotateCw />
            <span>5</span>
          </button>

          <button className="player__next" onClick={handlegetnextsong}>
            <SkipForward />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Player