import { ReactNode, createContext, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer"
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";

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
    })

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const { cycles, activeCycleId } = cycleState

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

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