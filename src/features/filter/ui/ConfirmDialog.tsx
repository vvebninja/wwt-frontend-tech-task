import { useTranslation } from 'react-i18next'

import { cn } from '@/shared/lib/css'
import { Button } from '@/shared/ui/Button'
import {
	Modal,
	ModalBackdrop,
	ModalFooter,
	ModalHeader,
	ModalTitle
} from '@/shared/ui/Modal'

type ConfirmDialogProps = {
	isOpen: boolean
	onCancel: VoidFunction
	onConfirm: VoidFunction
	className?: string
}

export const ConfirmDialog = ({
	isOpen,
	onCancel,
	onConfirm,
	className
}: ConfirmDialogProps) => {
	const { t } = useTranslation()
	return (
		<ModalBackdrop
			isOpen={isOpen}
			onClose={onCancel}
			className={cn(className)}
		>
			<Modal className="max-w-md">
				<ModalHeader>
					<ModalTitle className="text-2xl">{t('Confirm filters?')}</ModalTitle>
				</ModalHeader>
				<ModalFooter className="flex justify-center gap-6">
					<Button
						type="button"
						variant="outline"
						size="md"
						onClick={onCancel}
					>
						{t('Cancel')}
					</Button>
					<Button
						type="button"
						size="md"
						onClick={onConfirm}
					>
						{t('Confirm')}
					</Button>
				</ModalFooter>
			</Modal>
		</ModalBackdrop>
	)
}
