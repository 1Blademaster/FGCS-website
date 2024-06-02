export default function Header({ text, icon }) {
  return (
    <div className='w-full flex items-center justify-center mb-4 gap-2'>
      <h2 className='text-lg sm:text-xl text-center font-bold'>
        <span className='mr-2'>{icon}</span>
        {text}
      </h2>
    </div>
  )
}
