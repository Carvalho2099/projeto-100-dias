import { ActionTypes } from "./actions"
import { produce } from "immer"

export interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
  }

interface CycleState {
    cycles: Cycle[]
    activeCycleId: string | null
  }



export function cyclesReducer (state: CycleState, action: any) {
    switch(action.type){
      case ActionTypes.ADD_NEW_CYCLE:
        return produce(state, draft => {
          draft.cycles.push(action.payload.newCycle)
        })
      case ActionTypes.INTERRUPT_CURRENT_CYCLE:{

        const currentCycleIndedx = state.cycles.findIndex((cycle) => {
          return cycle.id === state.activeCycleId
        })

        if (currentCycleIndedx < 0) {
          return state
        }

        return produce(state, draft => {
          draft.activeCycleId = null
          draft.cycles[currentCycleIndedx].interruptedDate = new Date()
        })
      }
      case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:{
          const currentCycleIndedx = state.cycles.findIndex((cycle) => {
            return cycle.id === state.activeCycleId
          })
  
          if (currentCycleIndedx < 0) {
            return state
          }
  
          return produce(state, draft => {
            draft.activeCycleId = null
            draft.cycles[currentCycleIndedx].finishedDate = new Date()
          })
        }
      default:
        return state
    }      
  }