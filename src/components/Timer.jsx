import { useState, useEffect } from 'react'

// import your css module here

import logo from '../assets/newlogo.svg'
import play from '../assets/play.svg'
import pause from '../assets/pause.svg'
import reset from '../assets/reset.svg'
import coffee0 from '../assets/coffeecup_empty.svg'
import coffee25 from '../assets/coffeecup_25.svg'
import coffee50 from '../assets/coffeecup_50.svg'
import coffee75 from '../assets/coffeecup_75.svg'
import coffee100 from '../assets/coffeecup_100.svg'

const cups = [coffee0, coffee25, coffee50, coffee75, coffee100]

function Timer() {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [time, setTime] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [currentCup, setCurrentCup] = useState(4)

  useEffect(() => {
    let interval = null

    function calcRemainingTime() {
      const remainingTime = (time / totalTime) * 100
      if (remainingTime > 75.0) return 4
      if (remainingTime > 50.0) return 3
      if (remainingTime > 25.0) return 2
      if (remainingTime > 0.0) return 1
      return 0
    }

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1)
        const remainingTime = calcRemainingTime()
        if (remainingTime != currentCup) {
          setCurrentCup(remainingTime)
        }
      }, 1000)
    } else if (isActive && time === 0) {
      clearInterval(interval)
      setCurrentCup(0)
      setIsActive(false)
    }
    return () => clearInterval(interval)
  }, [isActive, time, currentCup, totalTime])

  const startTimer = () => {
    setIsActive(true)
    if (time === 0) {
      setTime(minutes * 60 + seconds)
      setTotalTime(minutes * 60 + seconds)
    }
  }

  const pauseTimer = () => {
    setIsActive(false)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTime(0)
    setMinutes(0)
    setSeconds(0)
  }

  const fixTimer = (minutes) => {
    setMinutes(minutes)
    setSeconds(0)
    setIsActive(true)
    setTime(minutes * 60 + seconds)
    setTotalTime(minutes * 60 + seconds)
  }

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60)
    let seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div>
      <div className='container'>
        <img className='logo' width='200' src={logo} />

        <h1>Coffee timer</h1>

        <img className='coffeecup' width='100' src={cups[currentCup]} />

        <div className='remaining-time'>{formatTime(time)}</div>

        <div className='timer-controls'>
          <div className='play-buttons'>
            {isActive ? (
              <button className='btn' onClick={pauseTimer}>
                <img src={pause} alt='Pause' width='32' height='32' />
              </button>
            ) : (
              <button className='btn' onClick={startTimer}>
                <img src={play} alt='Start' width='32' height='32' />
              </button>
            )}
            <button className='btn' onClick={resetTimer}>
              <img src={reset} alt='Start' width='20' height='20' />
            </button>
          </div>
          <div className='input-boxes'>
            <div className='time-input'>
              <label htmlFor='minutes'>Minutes</label>
              <input
                className='minutes'
                type='number'
                placeholder='Minutes'
                min={0}
                max={59}
                value={minutes}
                onChange={(e) => setMinutes(parseInt(e.target.value))}
              />
            </div>
            <div className='time-input'>
              <label for='minutes'>Seconds</label>
              <input
                type='number'
                min={0}
                max={59}
                placeholder='Seconds'
                value={seconds}
                onChange={(e) => setSeconds(parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className='buttons'>
          <button className='btn' onClick={() => fixTimer(5)}>
            5 mins
          </button>
          <button className='btn' onClick={() => fixTimer(10)}>
            10 mins
          </button>
          <button className='btn' onClick={() => fixTimer(15)}>
            15 mins
          </button>
        </div>
      </div>
    </div>
  )
}

export default Timer
