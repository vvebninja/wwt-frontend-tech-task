import { useCallback, useState } from 'react'

import { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

import { OptionToggleArgs } from '../ui/FilterModal'

export const useFilterDraft = (initialFilters: SearchRequestFilter) => {
	const [draftFilters, setDraftFilters] =
		useState<SearchRequestFilter>(initialFilters)

	const toggleOption = useCallback(
		({ id, optionId, type }: OptionToggleArgs) => {
			setDraftFilters(prevFilters => {
				const currentFilter = prevFilters.find(filter => filter.id === id)

				if (!currentFilter) {
					return [...prevFilters, { id, type, optionsIds: [optionId] }]
				}

				const isOptionSelected = currentFilter.optionsIds.includes(optionId)

				if (isOptionSelected && currentFilter.optionsIds.length === 1) {
					return prevFilters.filter(filter => filter.id !== id)
				}

				return prevFilters.map(filter => {
					if (filter.id !== id) {
						return filter
					}

					const updatedIds = isOptionSelected
						? filter.optionsIds.filter(oid => oid !== optionId)
						: [...filter.optionsIds, optionId]

					return { ...filter, optionsIds: updatedIds }
				})
			})
		},
		[]
	)

	return {
		draftFilters,
		addDraftFilters: (fitlers: SearchRequestFilter) => setDraftFilters(fitlers),
		toggleOption
	}
}
