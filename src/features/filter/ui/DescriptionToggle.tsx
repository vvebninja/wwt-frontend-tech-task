import { useTranslation } from 'react-i18next'

import { Info } from 'lucide-react'

import { cn } from '@/shared/lib/css'

type DescriptionToggleProps = {
	toggle: VoidFunction
	isActive: boolean
	className?: string
}

export const DescriptionToggle = ({
	toggle,
	isActive,
	className
}: DescriptionToggleProps) => {
	const { t } = useTranslation()

	return (
		<button
			type="button"
			aria-pressed={isActive}
			aria-label={t('Toggle descriptions')}
			onClick={toggle}
			className={cn(
				'absolute top-4 right-6 w-14 border-3 bg-clip-padding  border-black-grey-200/50',
				'rounded-2xl transition-colors duration-500 delay-50 hover:cursor-pointer',
				isActive && 'bg-button-brand-200',
				className
			)}
		>
			<Info
				size={22}
				className={cn(
					'transition-all duration-250 ease  text-button-brand-200 rounded-full',
					isActive && 'translate-x-7 stroke-white'
				)}
			/>
		</button>
	)
}
