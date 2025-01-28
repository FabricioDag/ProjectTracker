import styled from "styled-components";

import { useProjects } from "../context/ProjectContext";
import { useState, useEffect } from "react";

import playIcon from "../assets/play-solid.svg";
import pauseIcon from "../assets/pause-solid.svg";

import { ModalTargetPomodoro } from "./ModalTargetPomodoro";
import {RingBar} from './RingBar'

const PomodoroComponent = () => {
  const { projects, addRecord } = useProjects();

  // mover essa lógica para o modal de settings, aqui apenas puxa as infos
  const [workTime, setWorkTime] = useState(
    () => Number(localStorage.getItem("workTime")) || 1500
  );
  const [shortBreakTime, setShortBreakTime] = useState(
    () => Number(localStorage.getItem("shortBreakTime")) || 300
  );
  const [longBreakTime, setLongBreakTime] = useState(
    () => Number(localStorage.getItem("longBreakTime")) || 900
  );
  const [cyclesBeforeLongBreak, setCyclesBeforeLongBreak] = useState(
    () => Number(localStorage.getItem("cyclesBeforeLongBreak")) || 4
  );

  const [time, setTime] = useState(workTime);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  const [currentTimer, setCurrentTimer] = useState("work");

  const [currentSession, setCurrentSession] = useState(0);

  const [isEndindSession, setIsEndingSession] = useState(false);

  // Salvando as configurações no localStorage
  useEffect(() => {
    localStorage.setItem("workTime", workTime);
    localStorage.setItem("shortBreakTime", shortBreakTime);
    localStorage.setItem("longBreakTime", longBreakTime);
    localStorage.setItem("cyclesBeforeLongBreak", cyclesBeforeLongBreak);
  }, [workTime, shortBreakTime, longBreakTime, cyclesBeforeLongBreak]);

  // Formatação do tempo
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    //return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds
    }`;
  };

  useEffect(() => {
    resetTimer(); // Reseta o timer sempre que qualquer um desses valores for alterado
  }, [workTime, shortBreakTime, longBreakTime, currentTimer]);

  // Reseta o timer
  const resetTimer = () => {
    setIsTimerRunning(false);
    //gerenciar qual o timer que estava antes do reset
    currentTimer == "work"
      ? setTime(workTime)
      : currentTimer == "shortBreak"
      ? setTime(shortBreakTime)
      : setTime(longBreakTime);
  };

  const nextTimer = () => {
    setIsTimerRunning(false);
    //gerenciar qual o proximo timer
    if (currentTimer !== "work") {
      setCurrentTimer("work");
      setTime(workTime);

      setCycleCount((prev) => prev + 1); //counter ciclos ++
    } else if (currentTimer == "work" && cycleCount < cyclesBeforeLongBreak) {
      setCurrentTimer("shortBreak");
      setTime(shortBreakTime);
      setCurrentSession(currentSession + workTime / 60); // adiciona worktime ao session
    } else {
      setCurrentTimer("longBreak");
      setTime(longBreakTime);
      setCycleCount(-1); //gambiarra pra depois do longbreak o counter estar em 0
      setCurrentSession(currentSession + workTime / 60); // adiciona worktime ao session
    }
  };

  // Controla o efeito do tempo
  useEffect(() => {
    let interval;
    if (isTimerRunning && time > 0) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1);

      // ciclo termina dps de um intervalo
    } else if (time === 0) {
      nextTimer();
      //resetTimer()
    }
    return () => clearInterval(interval);
  }, [
    isTimerRunning,
    time,
    currentTimer,
    cycleCount,
    cyclesBeforeLongBreak,
    workTime,
    shortBreakTime,
    longBreakTime,
  ]);

  const handleClick = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const getTotalTime = () => {
    if (currentTimer === "work") {
      return workTime;
    } else if (currentTimer === "shortBreak") {
      return shortBreakTime;
    } else {
      return longBreakTime;
    }
  };

  const totalTime = getTotalTime();

  const handleEndSession = (target) => {
    const newRecord = {
      date: new Date().toISOString(),
      hours: currentSession/60,
    };

    addRecord(parseInt(target), newRecord);
    setCurrentSession(0);
    setIsEndingSession(false);
  };

  const handleClickEndSession = () =>{
    if(currentSession>0){
      setIsEndingSession(true)
    }else alert('A sessão nao pode ser de 0 minutos')
  }

  const progress = 1 - time / workTime

  return (
    <>
    <StyledPomodoroComponent className="pomodoroComponent">
      <PlayPauseButton onClick={handleClick}>
        {isTimerRunning ? (
          <img src={pauseIcon} alt="Pause" />
        ) : (
          <img src={playIcon} alt="Play" />
        )}
      </PlayPauseButton>

      <TimerWrapper className="timerWrapper">
        <p>{formatTime(time)}</p>
      </TimerWrapper>

      <RingBar
        progress={progress}
      ></RingBar>
      <button onClick={handleClickEndSession}>Finalizar Seção</button>

      <Debug>
        <h2>Debug</h2>
        <p>Work: {workTime}</p>
        <p>Short Break: {shortBreakTime}</p>
        <p>Long Break: {longBreakTime}</p>
        <p>Cycles: {cyclesBeforeLongBreak}</p>
        <p>Current Timer: {currentTimer}</p>
        <p>Current Session: {currentSession}</p>
        <p>Current Cycle: {cycleCount}</p>
      </Debug>

    </StyledPomodoroComponent>
    {isEndindSession && <ModalTargetPomodoro endSession={handleEndSession} setIsEndingSession={setIsEndingSession} currentSession={currentSession}/>}
    </>
  );
};

const Debug = styled.div`
  position: absolute;
  top: -13rem;
  right: 1rem;
  background-color: white;
  color: black;
  padding: 1rem;
  border: 2px solid yellow;
`;

const StyledPomodoroComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #1e204c;
  width: 100%;
  left: 0;
  bottom: 0;
  position: fixed;
  color: white;
`;

const TimerWrapper = styled.div`
  height: 5rem;
  width: 5rem;
  background-color: #1e204c;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: -75%;
  transform: translateX(-50%);
  border: 2px solid red;
`;

const PlayPauseButton = styled.button`
  background-color: transparent;
  border: none;
  width: 2rem;
  height: 2rem;

  img {
    color: white;
    height: 100%;
  }
`;

export { PomodoroComponent };
