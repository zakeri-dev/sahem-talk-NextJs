import { convertToCoreMessages, CoreMessage } from 'ai'
import { create, StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type AiPersona = {
  selectedAgent: string
  model: string
  messages?: CoreMessage[] | undefined
  addSelectedAgent: () => void
  addModel: () => void
  addMessages: () => void
}

type FishSlice = {
  fishes: number
  addFish: () => void
}

type OptionsStore = AiPersona & FishSlice

const createAiPersonaSlice: StateCreator<OptionsStore, [['zustand/devtools', never]], [], AiPersona> = set => ({
  selectedAgent: 'soroush',
  model: 'nemotron:latest',
  messages: [
    { role: 'system', content: 'Speek in persian' },
    { role: 'system', content: 'Speek in persian' },
    { role: 'system', content: 'Speek in persian' }
  ],
  addSelectedAgent: () => set(state => ({ selectedAgent: state.selectedAgent }), undefined, 'options:Agent/addAgent'),
  addModel: () => set(state => ({ model: state.model }), undefined, 'options:Model/addModel'),
  addMessages: () => set(state => ({ messages: state.messages }), undefined, 'options:Messages/addMessages')
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
          selectedPersona: {
            selectedAgent: state.selectedAgent,
            model: state.model,
            messages: state.messages
          },
          fishes: state.fishes
        })
      }
    )
  )
)

export default useOptionsStore
