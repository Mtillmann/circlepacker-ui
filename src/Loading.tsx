import { createEffect, createSignal } from 'solid-js'
import { state } from './store'
const [loading, setLoading] = createSignal(false)
const [duration, setDuration] = createSignal(0)

let start = 0
let timer: number

export default function () {
  createEffect(() => {
    if (state.loading) {
      start = Date.now()
      timer = setInterval(() => {
        setDuration(Date.now() - start)
      }, 25)
    } else {
      clearInterval(timer)
    }

    setLoading(state.loading)
  })

  return (
    <>

      <div classList={{ 'd-none': !loading() }} class='position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center' style='background-color: rgba(0,0,0,0.5)'>
        <div class='position-absolute'>
          <div class='spinner-border text-primary p-5 display-2' role='status' />

          <span class='position-absolute start-50 top-50 translate-middle bg-primary p-1 rounded'>
            {(duration() / 1000).toFixed(2)}
          </span>

        </div>
      </div>

    </>
  )
}
