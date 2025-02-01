import { convertToCoreMessages, CoreMessage } from 'ai'
import { create, StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type AiPersona = {
  persona: { selectedAgent: string; model: string; messages?: CoreMessage[] | undefined }
  updateSelectedAgent: (selectedAgent: string) => void
  updateModel: (model: string) => void
  updateMessages: () => void
}

type FishSlice = {
  fishes: number
  addFish: () => void
}

type OptionsStore = AiPersona & FishSlice

const createAiPersonaSlice: StateCreator<OptionsStore, [['zustand/devtools', never]], [], AiPersona> = set => ({
  persona: {
    selectedAgent: 'soroush',
    model: 'nemotron:latest',
    messages: [
      { role: 'system', content: 'Speak in Persian' },
      { role: 'system', content: 'Speak in Persian' },
      { role: 'system', content: 'Speak in Persian' }
    ]
  },
  updateSelectedAgent: (selectedAgent: string) =>
    set(state => ({ persona: { ...state.persona, selectedAgent } }), undefined, 'options:Agent/addAgent'),
  updateModel: (model: string) =>
    set(state => ({ persona: { ...state.persona, model } }), undefined, 'options:Model/addModel'),
  updateMessages: (messages?: CoreMessage[] | undefined) =>
    set(state => ({ persona: { ...state.persona, messages } }), undefined, 'options:Messages/addMessages')
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
