import { Check } from 'lucide-react'

import { cn } from '../lib/css'

type CheckboxProps = {
	label?: string
	checked?: boolean
	onCheckedChange: (checked: boolean) => void
	className?: string
}

export const Checkbox = ({
	label,
	checked,
	onCheckedChange,
	className = ''
}: CheckboxProps) => {
	return (
		<label
			className={cn(
				'flex items-center gap-4 text-[16px] text-black-grey-500 hover:cursor-pointer group',
				className
			)}
		>
			<div className="relative flex items-center justify-center w-6 h-6">
				<input
					type="checkbox"
					checked={checked}
					onChange={e => onCheckedChange(e.target.checked)}
					className="peer sr-only"
				/>
				<div
					className={cn(
						'absolute inset-0 border-2 border-current rounded-sm transition-all',
						'peer-focus-visible:ring-2 peer-focus-visible:ring-button-brand-200 peer-focus-visible:ring-offset-2'
					)}
				/>
				<Check
					size="18"
					className="hidden peer-checked:block z-10 stroke-current"
				/>
			</div>
			{label && <span>{label}</span>}
		</label>
	)
}
