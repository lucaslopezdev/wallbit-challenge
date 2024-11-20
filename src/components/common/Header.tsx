import { useTheme } from '@hooks/useTheme'
import { Button } from '@components/common/Button'
import WallbitLogo from '../icon/WallbitLogo'

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="mt-3 mb-5 flex gap-3 justify-between items-center">
      <a href="https://wallbit.io/" target="_blank" rel="noreferrer">
        <WallbitLogo className="border rounded-md bg-white w-40 h-auto px-4 py-2 transition-all hover:scale-[1.03] duration-150" />
      </a>
      <Button onClick={toggleTheme}>
        {theme === 'dark' ? (
          <img src="/topoff.webp" className="size-7" alt="" />
        ) : (
          <img src="/topon.webp" className="size-7" alt="" />
        )}
      </Button>
    </header>
  )
}

export default Header
