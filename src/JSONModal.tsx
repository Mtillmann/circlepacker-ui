import { state } from './store'
import { createEffect, createSignal, onMount } from 'solid-js'
import { Modal } from 'bootstrap'
import copy from 'clipboard-copy'

const [json, setJson] = createSignal('')

export default function (props: any) {
  let modalElement: HTMLDivElement
  let modal: Modal
  onMount(() => {
    modal = new Modal(modalElement!)
  })
  props.ref?.({
    show: () => {
      modal.show()
    }
  })

  createEffect(() => {
    setJson(JSON.stringify(state.circlePackerOptions, null, 2))
  })

  return (
    <>
      {/* @ts-ignore */}
      <div ref={modalElement} class='modal fade' id='jsonModal' tabindex='-1' aria-labelledby='jsonModalLabel' aria-hidden='true'>
        <div class='modal-dialog'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h5 class='modal-title' id='jsonModalLabel'>CirclePacker Constructor Options</h5>
              <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close' />
            </div>
            <div class='modal-body'>
              <pre><code>{json()}</code></pre>
            </div>
            <div class='modal-footer d-flex justify-content-center'>
              <button type='button' class='btn btn-primary' on:click={async () => { (await copy(json())); modal.hide() }}>Copy</button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
