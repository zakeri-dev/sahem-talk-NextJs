import { create, StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type BearSlice = {
  bears: number
  addBear: () => void
}

type FishSlice = {
  fishes: number
  addFish: () => void
}

type JungleStore = BearSlice & FishSlice

const createBearSlice: StateCreator<JungleStore, [['zustand/devtools', never]], [], BearSlice> = set => ({
  bears: 0,
  addBear: () => set(state => ({ bears: state.bears + 1 }), undefined, 'jungle:bear/addBear')
})

const createFishSlice: StateCreator<JungleStore, [['zustand/devtools', never]], [], FishSlice> = set => ({
  fishes: 0,
  addFish: () => set(state => ({ fishes: state.fishes + 1 }), undefined, 'jungle:fish/addFish')
})

const useJungleStore = create<any>()(
  devtools(
    persist(
      (...args) => ({
        ...createBearSlice(...args),
        ...createFishSlice(...args)
      }),
      {
        name: 'jungle-store',
        partialize: state => ({
          bears: state.bears,
          fishes: state.fishes
        })
      }
    )
  )
)

export default useJungleStore
