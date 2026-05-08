import { ComponentProps } from 'react'

import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '../lib/css'

const buttonVariants = cva(
	'text-base rounded-xl font-medium  hover:cursor-pointer transition-all ease-in-out duration-300 disabled:pointer-events-none disabled:opacity-70',
	{
		variants: {
			variant: {
				solid: 'bg-button-brand-200 hover:bg-button-brand-300 text-white',
				outline:
					'bg-white border-2 border-gray-200 text-black-black hover:bg-gray-50'
			},
			size: {
				responsive: 'py-3 px-6 lg:py-6 lg:px-18 lg:text-lg',
				md: 'py-4 px-12'
			}
		},
		defaultVariants: {
			variant: 'solid',
			size: 'responsive'
		}
	}
)

export const Button = ({
	variant = 'solid',
	size = 'responsive',
	children,
	className,
	...restProps
}: ComponentProps<'button'> & VariantProps<typeof buttonVariants>) => {
	return (
		<button
			className={cn(buttonVariants({ variant, size, className }))}
			{...restProps}
		>
			{children}
		</button>
	)
}
