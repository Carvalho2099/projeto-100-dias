import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'

import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { NewCycleForm } from './NewCycleForm'
import { CountDown } from './Countdown'



interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycle] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function handleCreateNewCycle(data: NewCiclyFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.MinutesAmountInput,
      startDate: new Date(),
    }

    setCycles(state => [...state, newCycle])
    setActiveCycle(id)
    setAmountSecondsPassed(0)

    reset();
  }

  function handleInterruptCycle() {    
    setCycles(state => 
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {...cycle, interruptedDate: new Date()}
        } else {
          return cycle
        }
      })
    )

      setActiveCycle(null)
    }

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if(activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  const task = watch('task')
  const isSubmitDisable = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action=''>
        <NewCycleForm />
        <CountDown activeCycle={activeCycle} setCycles={setCycles} activeCycleId={activeCycleId}/>       

        {activeCycle ? (
          <StopCountDownButton onClick={handleInterruptCycle} type="button">
          <HandPalm size={24} />
          Interromper
        </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisable} type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}