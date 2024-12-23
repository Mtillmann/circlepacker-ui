import { createSignal, createEffect, Show } from 'solid-js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { CirclePacker, fromURL } from '@mtillmann/circlepacker'
import FileIngest from '@mtillmann/file-ingest'
import { state, setState } from './store'
import Options from './Options'
import Loading from './Loading'
import { unwrap } from 'solid-js/store'

const [image, setImage] = createSignal('')
const [url, setUrl] = createSignal('')
const [filename, setFilename] = createSignal('')

let instance: CirclePacker

const fi = new FileIngest({
  accept: 'image/*',
  emitWhenEmpty: true,
  includeRejectedFiles: true,
});
(() => typeof fi === 'undefined')()

document.documentElement.dataset.bsTheme = 'dark'

// @ts-ignore
document.documentElement.addEventListener('file-ingest:files', async (event: CustomEvent) => {
  if (event.detail.files.length === 0 && event.detail.rejected.length > 0) {
    alert('Invalid file type')
    setImage('')
    return
  }

  setUrl(URL.createObjectURL(event.detail.files[0]))
  setFilename(event.detail.files[0].name)
  setState('triggerRender', true)
})

function App () {
  createEffect(async () => {
    if (state.triggerRender) {
      setState('loading', true)

      instance = await fromURL(url(), unwrap(state.circlePackerOptions))
      const image = instance.asDataURL()

      setState('hasImage', true)
      setState('triggerRender', false)
      setState('loading', false)

      setImage(image)
    }
  })

  createEffect(async () => {
    function dl (url: string, name: string) {
      const a = document.createElement('a')
      a.href = url
      a.download = name
      a.click()
    }

    if (state.download === 'svg') {
      const svg = instance.asSVGString()
      const blob = new Blob([svg], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      setState('download', null)
      dl(url, `${filename()}-circlepacker-ui.svg`)
    } else if (state.download === 'png') {
      const url = await instance.asBlobURL()
      setState('download', null)
      dl(url, `${filename()}-circlepacker-ui.png`)
    }
  })

  return (
    <>
      <div class='container'>
        <div class='row'>
          <div class='col-12'>
            <h1 class='display-5'>CirclePacker UI</h1>
          </div>
          <div class='col-8'>
            <div class='h-100 rounded bg-checkerboard d-flex justify-content-center align-items-center'>
              {image() && <img src={image()} class='img-fluid' />}
              <Show when={!image()}>
                <div class='alert alert-info' role='alert'>Drop or paste an image here &mdash; or
                  <label for='file' class='ms-1 accordiontext-decoration-underline'>click here select an image from your device
                  </label>
                </div>
              </Show>
            </div>
            <input type='file' class='d-none' id='file' />
          </div>
          <div class='col-4 border border-1 border-1 py-2 rounded small'>
            <Options />
          </div>
        </div>

      </div>
      <Loading />
    </>
  )
}

export default App
