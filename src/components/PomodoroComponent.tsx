import styled from "styled-components";

import { useProjects } from "../context/ProjectContext";
import { useState, useEffect } from "react";

import playIcon from "../assets/play-solid.svg";
import pauseIcon from "../assets/pause-solid.svg";

import { ModalTargetPomodoro } from "./ModalTargetPomodoro";
import { RingBar } from "./RingBar";

const PomodoroComponent = () => {
  const { projects, addRecord } = useProjects();

  // mover essa lógica para o modal de settings, aqui apenas puxa as infos
  // trasnformar em só 1 state
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
      hours: currentSession / 60,
    };

    addRecord(parseInt(target), newRecord);
    setCurrentSession(0);
    setIsEndingSession(false);
    setCurrentTimer("work");
    setCycleCount(0);
  };

  const handleClickEndSession = () => {
    if (currentSession >= workTime / 60) {
      setIsEndingSession(true);
    } else
      alert(
        `A sessão deve ser de no minimo ${workTime / 60} minutos (1 Pomodoro)`
      );
  };

  const progress = 1 - time / totalTime;

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
          <RingBar progress={progress}></RingBar>
          <Timer>{formatTime(time)}</Timer>
        </TimerWrapper>

        <EndSessionButton onClick={handleClickEndSession}>
          Finalizar Seção
        </EndSessionButton>

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
      {isEndindSession && (
        <ModalTargetPomodoro
          endSession={handleEndSession}
          setIsEndingSession={setIsEndingSession}
          currentSession={currentSession}
        />
      )}
    </>
  );
};

const EndSessionButton = styled.button`
  padding: 0.3rem;
  border: 2px solid white;
  color: white;
  font-weight: bold;
  background-color: transparent;
  border-radius: 0.3rem;
  transition: 0.2s ease;
  opacity: 0.5;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

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
  height: 70px;
  width: 70px;
  background-color: #1e204c;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: -50%;
  transform: translateX(-50%);
  border-radius: 50%;
  //outline: 2px solid red;
`;

const Timer = styled.p`
  position: absolute;
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
