import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import FormCep from './FormCep'


global.fetch = jest.fn().mockImplementation(() =>
 Promise.resolve({	
		json: () => ({
			cep: '09020230',
			logradouro: 'Rua Santo André',
			bairro: 'Centro'
		})
	})
)

it('Should render cep form', async () => {
	const { debug, getByPlaceholderText } = render(<FormCep />)
 
	const cepInput = getByPlaceholderText('CEP').closest('input')
	fireEvent.change(cepInput, { target: { value: '09020230' } })	

	await act(() => global.fetch)

	expect(global.fetch).toHaveBeenCalledTimes(1)
	debug()
})