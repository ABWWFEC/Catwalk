import "core-js/stable";
import "regenerator-runtime/runtime";
import app from '../../../../server/index.js';
import React from 'react';
import { screen, render, cleanup, fireEvent } from '@testing-library/react'
import QandA from '../Q_AND_A.jsx';
import App from '../App.jsx'

beforeAll(() => app.listen(5000))
afterEach(() => app.resetHandlers())
afterAll(() => app.close())

test('adds 1 + 2', () => {
  expect(1 + 2).toBe(3);
});

test('load and display greeting', async () => {
  render(<App />)

  expect(screen.findBy('#testHello')).toHaveTextContent('hello');
})



// describe('App component', () => {
//   beforeAll(() => {
//     render(<App />)
//   })

//   it('should have the right message in the dom', () => {
//     const message = 'hello';

//     expect(screen.getByText(message)).toBeInTheDocument()
//   })

//   afterAll(cleanup)
// })

// describe('Input component', () => {
//   let input, inputID;

//   // beforeAll(() => {
//   //   const { getByTestId, getByLabelText } = render(<Input label='username' id='username' />)
//   //   input = getByLabelText('username')
//   //   inputID = getByTestId('username');
//   // })

//   // it('should have the default value', () => {
//   //   expect(input.value).toBe('')
//   //   fireEvent.change(input, { target: { value: 'ok' } })
//   // })

//   // it('should have the updated value', () => {
//   //   expect(input.value).toBe('ok')
//   // })

//   // it('should have an element with this id', () => {
//   //   expect(inputID).not.toBeNull();
//   // })

//   afterAll(cleanup)
// })