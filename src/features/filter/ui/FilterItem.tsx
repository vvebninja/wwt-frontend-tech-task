import { Info } from 'lucide-react'

import type { FilterBase, FilterChooseOption } from '@/shared/api/types/Filter'
import type { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'
import { cn } from '@/shared/lib/css'
import { Checkbox } from '@/shared/ui/Checkbox'

import type { OptionToggleArgs } from './FilterModal'

type FilterItemProps = {
	options: FilterChooseOption[]
	selectedFilters: SearchRequestFilter
	onOptionToggle: (itemOptions: OptionToggleArgs) => void
	isDescriptionVisible: boolean
} & Omit<FilterBase, 'image' | 'icon'>

export const FilterItem = ({
	id,
	name,
	type,
	options,
	description,
	onOptionToggle,
	selectedFilters,
	isDescriptionVisible
}: FilterItemProps) => {
	const currentFilter = selectedFilters.find(filter => filter.id === id)
	const optionsIds = currentFilter?.optionsIds || []

	return (
		<section>
			<div className="mb-6">
				<h2 className="mb-1 text-black-grey-500 font-medium text-lg md:text-2xl">
					{name}
				</h2>
				{description && <p className="text-black-grey-300">{description}</p>}
			</div>

			<ul className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[18px] lg:grid-cols-3">
				{options.map((option, index) => (
					<li key={option.id}>
						<div className="relative flex items-center gap-4">
							<Checkbox
								label={option.name}
								checked={optionsIds.includes(option.id)}
								onCheckedChange={() => {
									onOptionToggle({ id, optionId: option.id, type })
								}}
							/>

							{option.description && (
								<div
									tabIndex={0}
									className={cn(
										'group relative flex items-center justify-center p-0.5 -m-0.5  focus:outline-button-brand-200',
										isDescriptionVisible ? 'flex' : 'hidden'
									)}
								>
									<Info
										size={20}
										className={cn(
											'text-black-grey-300 hover:text-button-brand-200 transition-colors',
											'animate-in fade-in zoom-in duration-500 fill-mode-backwards'
										)}
										style={{ animationDelay: `${index * 100}ms` }}
									/>

									<div
										className={cn(
											'absolute left-1/2 -translate-x-1/2 bottom-full mb-3',
											'invisible group-hover:visible group-focus:visible z-20 w-64 px-3 py-3',
											'text-sm text-black-grey-500 bg-white rounded-xl border border-black-grey-200 shadow-xl',
											'animate-in fade-in zoom-in-95 duration-200'
										)}
									>
										{option.description}

										<div className="absolute top-full left-1/2 -translate-x-1/2 w-4 h-2">
											<div className="absolute top-0 left-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-black-grey-200" />
											<div className="absolute top-[-1px] left-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white" />
										</div>
									</div>
								</div>
							)}
						</div>
					</li>
				))}
			</ul>
		</section>
	)
}
