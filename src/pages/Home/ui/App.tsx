import { useFilterStore } from '@/features/filter/model/useFilterStore'
import { FilterModal } from '@/features/filter/ui/FilterModal'

export const App = () => {
	const { appliedFilters } = useFilterStore()

	return (
		<section className="w-full h-dvh flex flex-col items-center justify-center p-8">
			{/* eslint-disable-next-line i18next/no-literal-string */}
			<h1 className="text-6xl text-gray-600 mb-12">
				WinWinTravel frontend test task
			</h1>
			<FilterModal />

			{/* Display current selected filter data in JSON format */}
			<div className="mt-12 w-full max-w-4xl">
				{/* eslint-disable-next-line i18next/no-literal-string */}
				<h2 className="text-2xl font-semibold mb-4">
					Current Selected Filters:
				</h2>
				<div className="bg-gray-100 p-4 rounded-lg">
					<pre className="text-sm text-gray-800 whitespace-pre-wrap">
						{JSON.stringify(appliedFilters, null, 2)}
					</pre>
				</div>
			</div>
		</section>
	)
}
