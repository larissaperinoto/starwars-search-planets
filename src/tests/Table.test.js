import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import mockData from './helpers/mockData';
import App from '../App';

describe('Verifica a renderização do componente Table', () => {

  fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData.results)
  });

  test('Verifica se os títulos da tabela são renderizados', async () => {
    render(<App />);

    expect(screen.getByRole("columnheader", { name: /name/i })).toBeInTheDocument();
/*     expect(screen.getByRole("columnheader", { name: /rotation period/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /orbital period/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /diameter/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /climate/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /gravity/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /terrain/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /surface water/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /population/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /films/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /created/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /edited/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /url/i })).toBeInTheDocument(); */
  });
});
