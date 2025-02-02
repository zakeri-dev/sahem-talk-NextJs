import { convertToCoreMessages, CoreMessage } from 'ai'
import { create, StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type AiPersona = {
  selectedPersona: {
    agent: string
    name: string
    model: string
    wellcome: string
    avatar: any
    messages?: CoreMessage[] | undefined
    agentBio: any
  }
  updatePersona: (agent: string) => void
  // updateSelectedAgent: (agent: string) => void
  // updateModel: (model: string) => void
  // updateMessages: () => void
}

type FishSlice = {
  fishes: number
  addFish: () => void
}

type OptionsStore = AiPersona & FishSlice

const createAiPersonaSlice: StateCreator<OptionsStore, [['zustand/devtools', never]], [], AiPersona> = set => ({
  selectedPersona: {
    agent: '',
    name: '',
    model: '',
    wellcome: '',
    avatar: null,
    messages: undefined,
    agentBio: null
  },
  updatePersona: (persona: any) =>
    set(state => ({ selectedPersona: persona }), undefined, 'options:Persona/updatePersona')

  // updateSelectedAgent: (agent: string) =>
  //   set(
  //     state => ({ selectedPersona: { ...state.selectedPersona, agent: agent } }),
  //     undefined,
  //     'options:Agent/addAgent'
  //   ),
  // updateModel: (model: string) =>
  //   set(state => ({ selectedPersona: { ...state.selectedPersona, model } }), undefined, 'options:Model/addModel'),
  // updateMessages: (messages?: CoreMessage[] | undefined) =>
  //   set(
  //     state => ({ selectedPersona: { ...state.selectedPersona, messages } }),
  //     undefined,
  //     'options:Messages/addMessages'
  //   )
})

const createFishSlice: StateCreator<OptionsStore, [['zustand/devtools', never]], [], FishSlice> = set => ({
  fishes: 0,
  addFish: () => set(state => ({ fishes: state.fishes + 1 }), undefined, 'options:fish/addFish')
})

const useOptionsStore = create<any>()(
  devtools(
    persist(
      (...args) => ({
        ...createAiPersonaSlice(...args),
        ...createFishSlice(...args)
      }),
      {
        name: 'option-store',
        partialize: state => ({
          selectedPersona: state.persona,
          fishes: state.fishes
        })
      }
    )
  )
)

export default useOptionsStore
