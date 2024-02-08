import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

type NewNoteCardProps = {
	createNoteCallbackFn: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard({ createNoteCallbackFn }: NewNoteCardProps) {
	const [showOnboarding, setShowOnboarding] = useState(true)
	const [content, setContent] = useState('')
	const [isRecording, setIsRecording] = useState(false)
	const [showDialog, setShowDialog] = useState(false)

	function handleContentChanged(e: ChangeEvent<HTMLTextAreaElement>) {
		setContent(e.target.value)

		if (e.target.value === '') {
			setShowOnboarding(true)
		}
	}

	function handleSaveNote(e: FormEvent) {
		e.preventDefault()

		if (content === '') {
			return
		}

		createNoteCallbackFn(content)

		setContent('')
		setShowOnboarding(true)
		toast.success('Nota criada com sucesso!')
	}

	function handleStartRecording() {
		const isSpeechRecognitionAPIAvailable =
			'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

		if (!isSpeechRecognitionAPIAvailable) {
			toast.error('Infelizmente seu navegador não suporta a API de gravação!')

			return
		}

		setIsRecording(true)
		setShowOnboarding(false)

		const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

		speechRecognition = new SpeechRecognitionAPI()

		speechRecognition.lang = 'pt-BR'
		speechRecognition.continuous = true
		speechRecognition.maxAlternatives = 1
		speechRecognition.interimResults = true

		speechRecognition.onresult = (event) => {
			const transcription = Array.from(event.results).reduce((text, result) => {
				return text.concat(result[0].transcript)
			}, '')

			setContent(transcription)
		}

		speechRecognition.onerror = (event) => {
			console.error(event)
		}

		speechRecognition.start()
	}

	function handleStopRecording() {
		setIsRecording(false)

		if (speechRecognition !== null) {
			speechRecognition.stop()
		}
	}

	return (
		<Dialog.Root>
			<Dialog.Trigger
				className='
          rounded-md p-5 flex flex-col bg-slate-700 gap-3 text-left outline-none 
          hover:ring-2 hover:ring-slate-500 focus-visible:ring-2 focus-visible:ring-lime-400
        '
			>
				<span className='text-sm font-medium text-slate-200'>Adicionar nota</span>

				<p className='text-sm leading-6 text-slate-400'>
					Grave uma nota em áudio que será convertida para texto automaticamente.
				</p>
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className='inset-0 fixed bg-black/50' />

				<Dialog.Content
					className='
						fixed outline-none overflow-hidden inset-0 w-full flex flex-col bg-slate-700
						md:max-w-[640px] md:h-[60vh] md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:inset-auto md:rounded-md
					'
				>
					<Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
						<X className='size-5' />
					</Dialog.Close>

					<form className='flex-1 flex flex-col'>
						<div className='flex flex-col flex-1 gap-3 p-5'>
							<span className='text-sm font-medium text-slate-300'>Adicionar nota</span>

							{showOnboarding ? (
								<p className='text-sm leading-6 text-slate-400'>
									Comece{' '}
									<button
										onClick={handleStartRecording}
										className='font-medium text-lime-400 hover:underline'
										type='button'
									>
										gravando uma nota
									</button>{' '}
									em áudio ou se preferir{' '}
									<button
										onClick={() => setShowOnboarding(!showOnboarding)}
										className='font-medium text-lime-400 hover:underline'
										type='button'
									>
										utilize apenas texto
									</button>
									.
								</p>
							) : (
								<textarea
									autoFocus
									className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
									onChange={(e) => handleContentChanged(e)}
									value={content}
									placeholder=''
								/>
							)}
						</div>

						{isRecording ? (
							<button
								type='button'
								onClick={handleStopRecording}
								className='w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100'
							>
								<div className='size-3 rounded-full bg-red-500 animate-pulse' />
								Gravando! (Clique p/ interromper)
							</button>
						) : (
							<button
								onClick={handleSaveNote}
								className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500'
							>
								Salvar nota
							</button>
						)}
					</form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}
