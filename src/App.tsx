import clsx from 'clsx'
import { useMemo, useState } from 'react'
import './App.css'
import Button from './components/Button'
import { TBase, TOption } from './type'
import Logo from './img/PROGRAMA.png'

function App() {
  const optionBase: TOption[] = [
    { value: 'custom', label: 'Seleccionar base' },
    { value: 'binary', label: 'Binario' },
    { value: 'decimal', label: 'Decimal' },
    { value: 'octal', label: 'Octal' },
    { value: 'hexadecimal', label: 'Hexadecimal' },
  ]
  const initialBase: { [key in Exclude<TBase, 'custom'>]: number } = useMemo(
    () => ({
      binary: 2,
      decimal: 10,
      hexadecimal: 16,
      octal: 8,
    }),
    [],
  )

  const [selectValue, setSelectValue] = useState<TBase>('custom')
  const [inputValue, setInputValue] = useState('')
  const [onSelectOut, setOnSelectOut] = useState<TBase>('custom')

  const validateInput = (number: string) => {
    const expVa: { [key in TBase]: RegExp | string } = {
      custom: '',
      binary: /[^01]/g,
      decimal: /[^\d]/g,
      octal: /[^0-7]/g,
      hexadecimal: /[^0-9a-fA-F]/g,
    }

    setInputValue(number.replace(expVa[selectValue], ''))
  }

  const isDisableInput: boolean = selectValue === 'custom'

  const resetInput = (value: TBase) => {
    setSelectValue(value)
    setInputValue('')
  }

  const convertBase = useMemo(() => {
    if (selectValue !== 'custom' && onSelectOut !== 'custom') {
      const decimal = parseInt(inputValue, initialBase[selectValue])
      const resultado = decimal.toString(initialBase[onSelectOut])
      return resultado
    }
  }, [initialBase, inputValue, onSelectOut, selectValue])

  return (
    <div className="container mx-auto p-5 text-lg text-gray-500 h-screen ">
      <h1 className="mb-4 text-2xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
        Conversor de{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-800 from-sky-400">
          Base Númerica
        </span>
      </h1>
      <p className=" font-normal px-2 text-xs sm:text-sm">
        Descubre nuestro Conversor de Base Numérica: ¡convierte números en
        segundos! Selecciona la base de origen, ingresa el número y elige la
        base de destino. ¡Listo! Obtén la conversión al instante. ¡Explora la
        magia de las conversiones numéricas de forma rápida y sencilla!
      </p>
      <section className="sm:px-8 lg:px-28 md:mt-8 flex sm:flex-row flex-col justify-between">
        <article className="w-full sm:w-4/5 rounded-md shadow-md p-4 mr-4">
          <div className="flex sm:flex-row flex-col items-end">
            <div className="sm:mr-8 mb-4 sm:mb-0">
              <label
                htmlFor="base"
                className="text-sm sm:text-lg text-gray-600 font-extrabold font-mono"
              >
                Sección la base numerica inicial
              </label>
              <select
                id="base"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={({ target }) => resetInput(target.value as TBase)}
                value={selectValue}
              >
                {optionBase.map((item, i) => (
                  <option key={`item_${i * 1}`} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:flex-1 w-full">
              <input
                id="baseInput"
                className={clsx(
                  'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
                  isDisableInput ? 'bg-gray-200' : 'bg-gray-50',
                )}
                placeholder="Digite el número"
                onChange={(item) => validateInput(item.target.value)}
                value={inputValue}
                disabled={isDisableInput}
              />
            </div>
          </div>
          <div
            className={clsx(
              'mt-4 flex items-center sm:p-2 rounded-md flex-wrap',
              isDisableInput && 'bg-gray-200 blur-sm',
            )}
          >
            {optionBase
              .filter((item) => item.value !== 'custom')
              .map((item, i) => (
                <Button
                  key={`button__${i * 1}`}
                  cta={item.label}
                  onClick={() => setOnSelectOut(item.value)}
                />
              ))}
          </div>
        </article>
        {convertBase && (
          <article className="flex-1 mt-8 sm:mt-0 w-full rounded-md shadow-md h-full p-4 flex items-center flex-col">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
              Resultado
            </h2>
            <span className="text-transparent text-4xl font-medium bg-clip-text bg-gradient-to-r to-sky-800 from-sky-400">
              {convertBase}
            </span>
          </article>
        )}
      </section>

      <footer className='flex items-center absolute bottom-0 w-full justify-around'>
        <img src={Logo} alt="" className='aspect-auto w-16 h-16' />
        <div className='text-sm'>
          <p>Autores</p>
          <p>Juan David Restrepo Riascos</p>
          <p>Cristian Julian Murcia Palomares</p>
        </div>
      </footer>
    </div>
  )
}

export default App
