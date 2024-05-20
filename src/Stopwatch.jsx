import React, {useState, useEffect, useRef} from "react"

function Stopwatch() {

    const [isRunning, setIsRunning] = useState(false)
    const [timeElapsed, setTimeElapsed] = useState(0)
    const intervalIDRef = useRef(null)
    const startTimeRef = useRef(0)

    useEffect(() => {
        if (isRunning) {
            intervalIDRef.current = setInterval(() => {
                setTimeElapsed(Date.now() - startTimeRef.current)
            }, 10)
        }

        return () => {
            clearInterval(intervalIDRef.current)
        }
    }, [isRunning])


    function start() {
        setIsRunning(true)
        startTimeRef.current = Date.now() - timeElapsed
    }

    function stop() {
        setIsRunning(false)
    }

    function reset() {
        setTimeElapsed(0)
        setIsRunning(false)
    }

    function formatTime() {

        let minutes = Math.floor(timeElapsed / (1000 * 60) % 60)
        let seconds = Math.floor(timeElapsed / (1000) % 60)
        let ms = Math.floor(timeElapsed % 1000 / 10)

        minutes = String(minutes).padStart(2, '0')
        seconds = String(seconds).padStart(2, '0')
        ms = String(ms).padStart(2, '0')

        return `${minutes}:${seconds}:${ms}`
    }

    return (
        <div className="stopwatch">
            <div className="display">{formatTime()}</div>
            <div className="controls">
                <button className="start-button" onClick={start}>Start</button>
                <button className="stop-button" onClick={stop}>Stop</button>
                <button className="reset-button" onClick={reset}>Reset</button>
            </div>
        </div>
    )
}

export default Stopwatch