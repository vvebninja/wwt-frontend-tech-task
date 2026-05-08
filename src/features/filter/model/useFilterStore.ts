import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

type FilterStoreState = {
	appliedFilters: SearchRequestFilter
	setFilter: (filters: SearchRequestFilter) => void
}

export const useFilterStore = create<FilterStoreState>()(
	persist(
		set => ({
			appliedFilters: [],
			setFilter: appliedFilters => set({ appliedFilters })
		}),
		{ name: 'filters-storage' }
	)
)
