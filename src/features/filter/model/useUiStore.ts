import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UiStoreState = {
	isDescriptionVisible: boolean
	toggleDescription: () => void
}

export const useUiStore = create<UiStoreState>()(
	persist(
		set => ({
			isDescriptionVisible: false,
			toggleDescription: () =>
				set(state => ({ isDescriptionVisible: !state.isDescriptionVisible }))
		}),
		{ name: 'ui-storage' }
	)
)
