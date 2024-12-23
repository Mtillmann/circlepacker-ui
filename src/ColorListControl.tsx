import { createStore } from 'solid-js/store'
import { state } from './store'
import { For } from 'solid-js'

const [options, setOptions] = createStore(state.circlePackerOptions)

function setColorValue (index: any, value: string) {
  console.log({ index, value })
  setOptions('colors', options.colors.map((color, i) => i === index ? value : color))
}

function removeColor (e: Event, index: number) {
  e.preventDefault()
  console.log({ index })
  setOptions('colors', options.colors.filter((_, i) => i !== index))
}

function addRandomColor () {
  const randomColor = `#${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}`
  setOptions('colors', [...options.colors, randomColor])
}

export default function () {
  return (
    <>

      <div class='rounded border border-1 p-2 pb-0'>
        <button class='btn btn-outline-primary btn-sm p-1 py-0 mb-2 me-2' onClick={() => addRandomColor()}>
          add
        </button>

        <For each={options.colors}>
          {(color, index) => (
            <div class='btn-group btn-group-sm me-2 mb-2'>
              <label class='btn btn-sm p-1 py-0 btn-outline-primary position-relative px-2' style={{ 'background-color': color }}>

                <input type='color' class='w-100 h-100 position-absolute start-0 top-0 opacity-0 form-control form-control-color form-control-sm' value={color} onChange={e => setColorValue(index(), e.target.value)} />
              </label>
              <a class='btn btn-outline-primary btn-sm p-2 py-0' onClick={e => removeColor(e, index())}>X</a>
            </div>
          )}
        </For>
      </div>
    </>
  )
}
