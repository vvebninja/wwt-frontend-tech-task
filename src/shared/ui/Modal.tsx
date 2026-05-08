import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState
} from 'react'
import { createPortal } from 'react-dom'

import { X } from 'lucide-react'

import { cn } from '../lib/css'

const ModalContext = createContext<{
	isAnimateIn: boolean
	onClose?: VoidFunction
}>({
	isAnimateIn: false,
	onClose: undefined
})
type ModalBase = {
	children?: ReactNode
	className?: string
}

export const ModalBackdrop = ({
	isOpen,
	onClose,
	className,
	children
}: ModalBase & { onClose?: VoidFunction; isOpen: boolean }) => {
	const [shouldRender, setShouldRender] = useState(isOpen)
	const [isAnimateIn, setIsAnimateIn] = useState(false)

	useEffect(() => {
		if (isOpen) {
			setShouldRender(true)
			const timer = setTimeout(() => setIsAnimateIn(true), 10)
			return () => clearTimeout(timer)
		} else {
			setIsAnimateIn(false)
			const timer = setTimeout(() => setShouldRender(false), 300)
			return () => clearTimeout(timer)
		}
	}, [isOpen])

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose?.()
			}
		}
		if (isOpen) {
			window.addEventListener('keydown', handleEsc)
		}
		return () => window.removeEventListener('keydown', handleEsc)
	}, [isOpen, onClose])

	if (!shouldRender) {
		return null
	}

	return createPortal(
		<ModalContext.Provider value={{ isAnimateIn, onClose }}>
			<div
				onClick={onClose}
				className={cn(
					'fixed inset-0 h-screen z-50 grid place-items-center px-3 transition-all duration-300 ease-in-out',
					isAnimateIn
						? 'bg-black/10 backdrop-blur-sm opacity-100'
						: 'bg-black/0 backdrop-blur-none opacity-0',
					className
				)}
			>
				{children}
			</div>
		</ModalContext.Provider>,
		document.getElementById('modal-root')!
	)
}

export const Modal = (props: ModalBase) => {
	const { isAnimateIn } = useContext(ModalContext)

	return (
		<div
			onClick={e => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			className={cn(
				'relative flex flex-col min-w-[260px] max-h-[90vh] max-w-[1240px] w-full p-5',
				'rounded-2xl shadow-xl bg-white transition-all duration-300 ease-in-out',
				'md:px-6 lg:px-8',
				isAnimateIn
					? 'animate-in slide-in-from-top-10 duration-500'
					: 'animate-out slide-out-to-top-5',
				props.className
			)}
		>
			{props.children}
		</div>
	)
}

export const ModalHeader = ({ className, children }: ModalBase) => {
	const { onClose } = useContext(ModalContext)
	return (
		<div
			className={cn(
				'relative flex items-center justify-center px-12 mb-4 lg:mb-8',
				className
			)}
		>
			{children}
			<button
				onClick={onClose}
				aria-label="Close modal"
				className="absolute top-0 right-0 p-2 transition-colors duration-300 hover:cursor-pointer hover:text-button-brand-200"
			>
				<X
					size={24}
					aria-hidden="true"
				/>
			</button>
		</div>
	)
}

export const ModalTitle = (props: ModalBase) => (
	<h2
		className={cn('whitespace-nowrap text-xl font-semibold', props.className)}
	>
		{props.children}
	</h2>
)

export const ModalContent = (props: ModalBase) => (
	<div className={cn('grow overflow-y-auto px-1 md:p-2', props.className)}>
		{props.children}
	</div>
)

export const ModalFooter = (props: ModalBase) => (
	<footer
		className={cn('flex justify-center items-center mt-6', props.className)}
	>
		{props.children}
	</footer>
)
