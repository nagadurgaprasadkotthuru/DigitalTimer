// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    timerLimit: 25,
    minsCounter: 25,
    secsCounter: 0,
    isRunning: false,
    isReset: true,
  }

  onStartTimerOrPauseTimer = () => {
    const {isRunning, minsCounter} = this.state
    if (isRunning === true) {
      clearInterval(this.timerID)
      this.setState({
        isRunning: false,
      })
    } else if (isRunning === false && minsCounter === 0) {
      this.setState(prevState => ({
        isRunning: true,
        isReset: false,
        minsCounter: prevState.timerLimit,
        secsCounter: 0,
      }))
      this.timerID = setInterval(this.onDecrementSeconds, 1)
    } else {
      this.setState({
        isRunning: true,
        isReset: false,
      })
      this.timerID = setInterval(this.onDecrementSeconds, 1)
    }
  }

  onResetTimer = () => {
    this.setState({
      minsCounter: 25,
      timerLimit: 25,
      secsCounter: 0,
      isRunning: false,
      isReset: true,
    })
    clearInterval(this.timerID)
  }

  onDecrementMinutes = () => {
    const {minsCounter} = this.state
    if (minsCounter > 0) {
      this.setState(prevState => ({minsCounter: prevState.minsCounter - 1}))
    }
  }

  onDecrementSeconds = () => {
    const {secsCounter, minsCounter} = this.state
    if (secsCounter === 0 && minsCounter === 0) {
      this.setState({
        secsCounter: 0,
        isRunning: false,
        isReset: false,
      })
      clearInterval(this.timerID)
    } else if (secsCounter === 0) {
      this.onDecrementMinutes()
      this.setState({secsCounter: 59})
    } else {
      this.setState(prevState => ({secsCounter: prevState.secsCounter - 1}))
    }
  }

  onIncreasedTimerLimit = () => {
    const {isReset} = this.state
    if (isReset === true) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit + 1,
        minsCounter: prevState.timerLimit + 1,
      }))
    }
  }

  onDecreasedTimerLimit = () => {
    const {isReset, timerLimit} = this.state
    if (isReset === true && timerLimit > 0) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit - 1,
        minsCounter: prevState.timerLimit - 1,
      }))
    }
  }

  render() {
    const {minsCounter, secsCounter, isRunning, timerLimit} = this.state
    const lenOfSecsCounter = secsCounter.toString().length
    const showZeroOrNotInSecs = lenOfSecsCounter === 1 ? 0 : ''
    const lenOfMinsCounter = minsCounter.toString().length
    const showZeroOrNotInMins = lenOfMinsCounter === 1 ? 0 : ''
    const playOrPauseIconUrl = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const playOrPauseIconText = isRunning ? 'Pause' : 'Start'
    const playOrPauseIconAltText = isRunning ? 'pause icon' : 'play icon'
    return (
      <div className="bg-container">
        <div className="content-container">
          <h1 className="heading">Digital Timer</h1>
          <div className="timer-features-container">
            <div className="timer-container1">
              <div className="timer-container">
                <h1 className="timer">
                  {showZeroOrNotInMins}
                  {minsCounter}:{showZeroOrNotInSecs}
                  {secsCounter}
                </h1>
                <p className="timer-status">
                  {isRunning ? 'Running' : 'Paused'}
                </p>
              </div>
            </div>
            <div className="features-container">
              <div className="buttons-container">
                <button
                  className="start-reset-button"
                  type="button"
                  onClick={this.onStartTimerOrPauseTimer}
                >
                  <img
                    className="start-reset-icon"
                    alt={playOrPauseIconAltText}
                    src={playOrPauseIconUrl}
                  />
                  {playOrPauseIconText}
                </button>
                <button
                  className="start-reset-button"
                  type="button"
                  onClick={this.onResetTimer}
                >
                  <img
                    className="start-reset-icon"
                    alt="reset icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  />
                  Reset
                </button>
              </div>
              <div className="timer-limit-container">
                <p className="limit-description">Set Timer limit</p>
                <div className="buttons-container">
                  <button
                    className="increment-decrement-button"
                    type="button"
                    onClick={this.onDecreasedTimerLimit}
                  >
                    -
                  </button>
                  <p className="timer-limit">{timerLimit}</p>
                  <button
                    className="increment-decrement-button"
                    type="button"
                    onClick={this.onIncreasedTimerLimit}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
