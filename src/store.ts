import { createStore } from 'solid-js/store'

const circlePackerDefaultOptions = {
  numCircles: 1000,
  minRadius: 1,
  maxRadius: 10,
  spacing: 1,
  higherAccuracy: false,
  colors: [] as string[],
  minAlpha: 1,
  background: 'transparent',
}

const localStorageKey = 'circlepacker-ui-circlePackerOptions'
let localStorageOptions = {}
try {
  localStorageOptions = JSON.parse(localStorage.getItem(localStorageKey) || '{}')
} catch (e) {}

const circlePackerOptions = { ...circlePackerDefaultOptions, ...localStorageOptions }

const [state, setState] = createStore({
  hasImage: false,
  triggerRender: false,
  loading: false,
  download: null as string | null,
  options: {
    numCirclesMin: 100,
    numCirclesMax: 25e3,
    minRadiusMin: 1,
    minRadiusMax: 10,
    maxRadiusMin: 10,
    maxRadiusMax: 50,
    spacingMin: 0,
    spacingMax: 10,
    minAlphaMin: 0,
    minAlphaMax: 1,
  },
  circlePackerOptions
})

function saveCirclePackerOptions (json:string) {
  localStorage.setItem(localStorageKey, json)
}

function resetCirclePackerOptions () {
  setState('circlePackerOptions', circlePackerDefaultOptions)
  saveCirclePackerOptions(JSON.stringify(circlePackerDefaultOptions))
}

export { state, setState, saveCirclePackerOptions, resetCirclePackerOptions }
