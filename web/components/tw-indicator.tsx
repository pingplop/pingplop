import { useWindowSize } from 'usehooks-ts'

export default function ScreenSizeIndicator({
  withScreenSize = false,
}: {
  withScreenSize?: boolean
}) {
  const { width, height } = useWindowSize()

  if (import.meta.env.PROD) return null

  const screenSize = withScreenSize ? `: ${width}x${height}` : ''

  return (
    <div className='fixed bottom-0 right-0 z-50 flex h-6 w-auto items-center justify-center rounded-tl bg-gray-800 px-1.5 font-sans text-xs text-white'>
      <div className='block sm:hidden'>xs {screenSize}</div>
      <div className='hidden sm:block md:hidden'>sm {screenSize}</div>
      <div className='hidden md:block lg:hidden'>md {screenSize}</div>
      <div className='hidden lg:block xl:hidden'>lg {screenSize}</div>
      <div className='hidden xl:block 2xl:hidden'>xl {screenSize}</div>
      <div className='hidden 2xl:block'>2xl {screenSize}</div>
    </div>
  )
}
