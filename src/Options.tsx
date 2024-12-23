import { createEffect } from 'solid-js'
import { createStore } from 'solid-js/store'
import { state, resetCirclePackerOptions, saveCirclePackerOptions, setState } from './store'
import ColorListControl from './ColorListControl'
import JSONModal from './JSONModal'
const [circlePackerOptions, setCirclePackerOptions] = createStore(state.circlePackerOptions)

export default function () {
  let jsonModal

  createEffect(() => {
    saveCirclePackerOptions(JSON.stringify(circlePackerOptions))
  })

  return (
    <>
      <div class='row mb-2'>
        <div class='col-4 d-flex align-items-center'>
          <label for='numberOfCircles' class='d-flex  mb-0 form-label'>Number of Circles</label>
        </div>
        <div class='col-8'>
          <div class='d-flex align-items-center'>

            <input
              min={state.options.numCirclesMin} max={state.options.numCirclesMax}
              value={circlePackerOptions.numCircles} onInput={(e) => setCirclePackerOptions('numCircles', parseInt(e.target.value))} type='range'
              class='d-flex me-2 form-range'
            />
            <input class='form-control w-50' id='numberOfCircles' type='number' value={circlePackerOptions.numCircles} onInput={(e) => setCirclePackerOptions('numCircles', parseInt(e.target.value))} />
          </div>
        </div>
      </div>

      <div class='row mb-2'>
        <div class='col-4 d-flex align-items-center'>
          <label for='spacing' class='form-label mb-0'>Spacing</label>
        </div>
        <div class='col-8'>
          <div class='d-flex align-items-center'>
            <input
              min={state.options.spacingMin} max={state.options.spacingMax}
              step={0.1}
              value={circlePackerOptions.spacing} onInput={(e) => setCirclePackerOptions('spacing', parseFloat(e.target.value))} type='range'
              class='d-flex me-2 form-range' id='spacing'
            />
            <input class='form-control w-25' type='number' value={circlePackerOptions.spacing} onInput={(e) => setCirclePackerOptions('spacing', parseInt(e.target.value))} />
          </div>
        </div>
      </div>

      <div class='row mb-2'>
        <div class='col-4 d-flex align-items-center'>

          <label for='minRadius' class='form-label mb-0'>Min Radius</label>
        </div>
        <div class='col-8'>

          <div class='d-flex align-items-center'>

            <input
              min={state.options.minRadiusMin} max={state.options.minRadiusMax}
              step={0.1}
              value={circlePackerOptions.minRadius} onInput={(e) => setCirclePackerOptions('minRadius', parseFloat(e.target.value))} type='range'
              class='d-flex me-2 form-range' id='minRadius'
            />

            <input class='form-control w-25' type='number' value={circlePackerOptions.minRadius} onInput={(e) => setCirclePackerOptions('minRadius', parseInt(e.target.value))} />
          </div>

        </div>
      </div>
      <div class='row mb-2'>
        <div class='col-4 d-flex align-items-center'>

          <label for='maxRadius' class='form-label mb-0'>Max Radius</label>

        </div>
        <div class='col-8'>

          <div class='d-flex align-items-center'>

            <input
              min={state.options.maxRadiusMin} max={state.options.maxRadiusMax}
              step={0.1}
              value={circlePackerOptions.maxRadius} onInput={(e) => setCirclePackerOptions('maxRadius', parseFloat(e.target.value))} type='range'
              class='d-flex me-2 form-range' id='maxRadius'
            />

            <input class='form-control w-25' type='number' value={circlePackerOptions.maxRadius} onInput={(e) => setCirclePackerOptions('maxRadius', parseInt(e.target.value))} />
          </div>

        </div>
      </div>

      <div class='row mb-2'>
        <div class='col-4 d-flex align-items-center'>
          <label class='form-check-label mb-0' for='higherAccuracy'>
            High Accuracy
          </label>
        </div>
        <div class='col-8'>

          <input
            class='form-check-input' type='checkbox' id='higherAccuracy'
            checked={circlePackerOptions.higherAccuracy}
            onInput={(e) => setCirclePackerOptions('higherAccuracy', e.currentTarget.checked)}
          />

        </div>
      </div>

      <div class='row mb-2'>
        <div class='col-4 d-flex align-items-center'>
          Colors
        </div>
        <div class='col-8'>

          <ColorListControl />
        </div>
      </div>

      <div class='row mb-2'>
        <div class='col-4 d-flex align-items-center'>
          <label for='minAlpha' class='form-label mb-0'>Min Alpha</label>
        </div>
        <div class='col-8'>
          <div class='d-flex align-items-center'>

            <input
              min={state.options.minAlphaMin} max={state.options.minAlphaMax}
              step={0.1}
              value={circlePackerOptions.minAlpha} onInput={(e) => setCirclePackerOptions('minAlpha', parseFloat(e.target.value))} type='range'
              class='d-flex me-2 form-range' id='minAlpha'
            />
            <input class='form-control w-25' type='number' value={circlePackerOptions.minAlpha} onInput={(e) => setCirclePackerOptions('minAlpha', parseInt(e.target.value))} />
          </div>
        </div>
      </div>

      <div class='row'>
        <div class='col-4 d-flex align-items-center'>
          <label for='background' class='form-label mb-0'>Background</label>
        </div>
        <div class='col-8'>
          <div class='d-flex align-items-center'>
            <input
              type='color' class='form-control w-100 form-control-color'
              classList={{ 'opacity-25': circlePackerOptions.background === 'transparent' }}
              id='background' value={circlePackerOptions.background === 'transparent' ? '#000000' : circlePackerOptions.background} onInput={(e) => setCirclePackerOptions('background', e.target.value)}
            />
            <button class='btn btn-sm btn-outline-secondary ms-2' onClick={() => setCirclePackerOptions('background', 'transparent')}>Transparent</button>
          </div>
        </div>
      </div>

      <div class='row'>
        <div class='col-12'><hr /></div>
      </div>
      <div class='row'>
        <div class='col-12'>
          <label for='file' class='btn me-2 mb-2 btn-primary'>Load Image</label>
          <button disabled={!state.hasImage} onClick={() => setState('triggerRender', true)} class='btn me-2 mb-2 btn-primary rounded'>Re-Render</button>
          <button onClick={_ => jsonModal!.show()} class='btn me-2 mb-2 btn-secondary'>Export JSON</button>
          <button class='btn me-2 mb-2 btn-warning' onClick={() => resetCirclePackerOptions()}>Reset Options</button>
          <button disabled={!state.hasImage} class='btn me-2 mb-2 btn-success' onClick={() => setState('download', 'svg')}>Download SVG</button>
          <button disabled={!state.hasImage} class='btn me-2 mb-2 btn-success' onClick={() => setState('download', 'png')}>Download PNG</button>
        </div>
      </div>
      <JSONModal ref={jsonModal} />

    </>
  )
}
