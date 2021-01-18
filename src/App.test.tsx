import {cleanup, render} from '@testing-library/react'
import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {StoreProvider} from './context/Provider'
import Upload from './pages/Upload'

afterEach(cleanup)

/* test('make sure i can submit an image', async () => {
  const {debug, getByText} = render(<App />)
  expect(getByText('CATS')).toBeInTheDocument()
}) */

test('Cats context mock test', () => {
  const {debug} = render(
    <StoreProvider>
      <Router>
        <Upload />
      </Router>
    </StoreProvider>
  )

  debug()
})
