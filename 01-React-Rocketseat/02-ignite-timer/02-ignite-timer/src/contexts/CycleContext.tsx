import { ReactNode, createContext, useEffect, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer"
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}



interface CycleContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    markCurrentCycleAsFinished: () => void
    amountSecondsPassed: number
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data: CreateCycleData) => void
    interruptCurrentCycle: () => void
  }  

export const CycleContext = createContext({} as CycleContextType)

interface CycleContextProviderProps {
  children: ReactNode
}



export function CyclesContextProvider({ children }: CycleContextProviderProps) {
    const [cycleState, dispatch] = useReducer(cyclesReducer, {
      cycles: [],
      activeCycleId: null,
    }, (initialState) => {
      const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state')

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }
      return initialState
    })

    const { cycles, activeCycleId } = cycleState

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
      if(activeCycle) {
        return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
      }
      return 0
    })

    useEffect(() => {
      const stateJSON = JSON.stringify(cycleState)

      localStorage.setItem('@ignite-timer:cycles-state', stateJSON)
    }, [cycleState])


    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
      }
    
      function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction)
      }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {    
    dispatch(interruptCurrentCycleAction)
    }  

    return (
        <CycleContext.Provider 
        value={{ 
          cycles,
          activeCycle, 
          activeCycleId, 
          markCurrentCycleAsFinished, 
          amountSecondsPassed, 
          setSecondsPassed,
          createNewCycle,
          interruptCurrentCycle
        }}
      >
        {children}
      </CycleContext.Provider>
    )
}