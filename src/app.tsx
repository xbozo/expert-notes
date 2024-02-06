import logo from './assets/logo-nlw-expert.svg'
import { NoteCard } from './components/note-card'

export function App() {
	return (
		<main className='mx-auto max-w-6xl my-12 space-y-6'>
			<img
				src={logo}
				alt='NLW Expert'
			/>

			<form className='w-full'>
				<input
					type='text'
					placeholder='Busque em suas notas...'
					className='w-full bg-transparent text-3xl font-semibold outline-none tracking-tight placeholder:text-slate-500'
				/>
			</form>

			<div className='h-px bg-slate-700' />

			<div className='grid grid-cols-3 gap-6 auto-rows-[250px]'>
				<div className='rounded-md p-5 bg-slate-700 space-y-3'>
					<span className='text-sm font-medium text-slate-200'>Adicionar nota</span>

					<p className='text-sm leading-6 text-slate-400'>
						Grave uma nota em áudio que será convertida para texto automaticamente.
					</p>
				</div>

				<NoteCard />
				<NoteCard />
				<NoteCard />
				<NoteCard />
				<NoteCard />
			</div>
		</main>
	)
}
