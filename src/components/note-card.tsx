import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'

type NoteCardProps = {
	note: {
		id: string
		date: Date
		content: string
	}
	deleteNoteCallbackFn: (id: string) => void
}

export function NoteCard({ note, deleteNoteCallbackFn }: NoteCardProps) {
	return (
		<Dialog.Root>
			<Dialog.Trigger
				className='
					rounded-md p-5 text-left bg-slate-800 gap-3 flex flex-col outline-none overflow-hidden relative 
					hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400
      	'
			>
				<span className='text-sm font-medium text-slate-300'>
					{formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
				</span>

				<p className='text-sm leading-6 text-slate-400'>{note.content}</p>

				<div className='absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none bg-gradient-to-t from-black/60 to-black/0' />
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className='inset-0 fixed bg-black/50' />

				<Dialog.Content
					className='
						fixed inset-0 w-full bg-slate-700 flex flex-col outline-none overflow-hidden 
						md:max-w-[640px] md:h-[60vh] md:rounded-md md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:inset-auto
					'
				>
					<Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
						<X className='size-5' />
					</Dialog.Close>

					<div className='flex flex-col flex-1 gap-3 p-5'>
						<span className='text-sm font-medium text-slate-300'>
							{formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
						</span>

						<p className='text-sm leading-6 text-slate-400'>{note.content}</p>
					</div>

					<button
						type='button'
						onClick={() => deleteNoteCallbackFn(note.id)}
						className='w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group'
					>
						Deseja <span className='text-red-400 group-hover:underline'>apagar essa nota</span>?
					</button>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}
