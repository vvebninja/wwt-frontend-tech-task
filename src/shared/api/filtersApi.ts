import { FilterItem } from './types/Filter'

export const FILTERS_QUERY_KEY = ['filters'] as const

export const api = {
	fetchFilters: async () => {
		await new Promise(resolve => setTimeout(resolve, 500))

		const { filterItems } = await import('@/shared/temp/filterData.json')

		return filterItems as FilterItem[]
	}
}
