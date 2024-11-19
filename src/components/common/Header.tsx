import { useTheme } from '@hooks/useTheme'
import { Button } from '@components/common/Button'

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="mt-3 mb-10 flex gap-3 justify-center">
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
