import { FC } from 'react'
import clsx from 'clsx'

type Props = {
  cta: string
  onClick: () => void
}

const Button: FC<Props> = ({ cta, onClick }) => {
  return (
    <button
      type="button"
      className={clsx(
        'mb-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2',
      )}
      onClick={onClick}
    >
      {cta}
    </button>
  )
}

export default Button
