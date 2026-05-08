import { useQuery } from '@tanstack/react-query'

import { FILTERS_QUERY_KEY, api } from '@/shared/api/filtersApi'

export const useFilters = () => {
	const {
		data: filterItems,
		isPending,
		error
	} = useQuery({
		queryKey: FILTERS_QUERY_KEY,
		queryFn: api.fetchFilters,
		staleTime: 5 * 60 * 1000
	})

	return {
		filterItems,
		isPending,
		error
	}
}
