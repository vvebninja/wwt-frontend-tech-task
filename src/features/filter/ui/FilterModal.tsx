import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { FilterChooseOption } from '@/shared/api/types/Filter'
import type { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'
import { cn } from '@/shared/lib/css'
import { Button } from '@/shared/ui/Button'
import {
	Modal,
	ModalBackdrop,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalTitle
} from '@/shared/ui/Modal'

import { useFilterDraft } from '../model/useFilterDraft'
import { useFilterStore } from '../model/useFilterStore'
import { useFilters } from '../model/useFilters'
import { useUiStore } from '../model/useUiStore'
import { ConfirmDialog } from './ConfirmDialog'
import { DescriptionToggle } from './DescriptionToggle'
import { FilterItem } from './FilterItem'

export type OptionToggleArgs = {
	optionId: FilterChooseOption['id']
} & Omit<SearchRequestFilter[number], 'optionsIds'>

type FilterModalProps = {
	className?: string
}

export const FilterModal = ({ className }: FilterModalProps) => {
	const { t } = useTranslation()
	const { filterItems = [] } = useFilters()
	const { appliedFilters, setFilter } = useFilterStore()
	const { isDescriptionVisible, toggleDescription } = useUiStore()

	const [isOpen, setIsOpen] = useState(false)
	const [isConfirmOpen, setConfirmOpen] = useState(false)

	const { draftFilters, addDraftFilters, toggleOption } =
		useFilterDraft(appliedFilters)

	const handleConfirmSave = () => {
		setFilter(draftFilters)
		setConfirmOpen(false)
		setIsOpen(false)
	}

	const handleOpen = () => {
		addDraftFilters(appliedFilters)
		setIsOpen(true)
	}

	const resetFilters = () => {
		addDraftFilters([])
		setFilter([])
	}

	const hasActiveFilters = draftFilters.length > 0

	return (
		<>
			<Button
				type="button"
				onClick={handleOpen}
				className={cn(className)}
			>
				{t('Open filters')}
			</Button>

			<ModalBackdrop
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
			>
				<Modal className="w-full">
					<ModalHeader className="lg:pt-2 ">
						<ModalTitle className="text-[40px]">{t('Filter')}</ModalTitle>
					</ModalHeader>
					<ModalContent className="pb-2 overflow-x-hidden">
						<div className="relative">
							<DescriptionToggle
								toggle={toggleDescription}
								isActive={isDescriptionVisible}
							/>
							<ul>
								{filterItems.map(filterItem => (
									<li
										key={filterItem.id}
										className={cn(
											'py-8 divider-border',
											'first:divider-border-double'
										)}
									>
										<FilterItem
											{...filterItem}
											isDescriptionVisible={isDescriptionVisible}
											selectedFilters={draftFilters}
											onOptionToggle={toggleOption}
										/>
									</li>
								))}
							</ul>
						</div>

						<ModalFooter className="flex justify-center gap-4 mt-8">
							<Button
								type="button"
								variant="outline"
								disabled={!hasActiveFilters}
								onClick={resetFilters}
								className="text-button-brand-200 hover:text-button-brand-300 font-medium transition-colors animate-in fade-in"
							>
								{t('Reset')}
							</Button>
							<Button
								type="button"
								onClick={() => setConfirmOpen(true)}
								disabled={!hasActiveFilters}
							>
								{t('Apply')}
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</ModalBackdrop>

			<ConfirmDialog
				isOpen={isConfirmOpen}
				onCancel={() => setConfirmOpen(false)}
				onConfirm={handleConfirmSave}
			/>
		</>
	)
}
