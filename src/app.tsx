import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'
import { Note } from './@types/note'
import logo from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

export function App() {
	const [searchNote, setSearchNote] = useState('')
	const [notes, setNotes] = useState<Note[]>(() => {
		const notesOnStorage = localStorage.getItem('@expert-notes:notes')

		if (notesOnStorage) {
			return JSON.parse(notesOnStorage)
		}

		return []
	})

	function createNoteCallbackFn(content: string) {
		const newNote = {
			id: crypto.randomUUID(),
			date: new Date(),
			content,
		}

		const notesArray = [...notes, newNote]

		setNotes(notesArray)

		localStorage.setItem('@expert-notes:notes', JSON.stringify(notesArray))
	}

	function deleteNoteCallbackFn(id: string) {
		const notesArr = notes.filter((note) => note.id !== id)

		setNotes(notesArr)
		localStorage.setItem('@expert-notes:notes', JSON.stringify(notesArr))

		toast.success('Nota excluída com sucesso.')
	}

	function handleSearchNote(e: ChangeEvent<HTMLInputElement>) {
		const query = e.target.value

		setSearchNote(query)
	}

	const filteredNotes =
		searchNote !== ''
			? notes.filter((note) => note.content.toLowerCase().includes(searchNote.toLowerCase()))
			: notes

	return (
		<main className='mx-auto max-w-6xl my-12 space-y-6 px-5'>
			<img
				src={logo}
				alt='NLW Expert'
				className='max-h-7'
			/>

			<form className='w-full'>
				<input
					type='text'
					placeholder='Busque em suas notas...'
					className='w-full bg-transparent text-3xl font-semibold outline-none tracking-tight placeholder:text-slate-500'
					onChange={handleSearchNote}
				/>
			</form>

			<div className='h-px bg-slate-700' />

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]'>
				<NewNoteCard createNoteCallbackFn={createNoteCallbackFn} />

				{filteredNotes.map((note) => {
					return (
						<NoteCard
							key={note.id}
							note={note}
							deleteNoteCallbackFn={deleteNoteCallbackFn}
						/>
					)
				})}
			</div>
		</main>
	)
}
