import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyProvider from '../context/MyProvider';
import mockData from './helpers/mockData';
import App from '../App';

describe('Verifica a renderização da página', () => {

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData)
    });
  });

  test('Verifica se a requisição é feita ao renderizar a página', async () => {
    render(<MyProvider><App /></MyProvider>);

     await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(fetch).toBeCalledWith('https://swapi-trybe.herokuapp.com/api/planets/');
    });
  });

  test('Verifica se os inputs estão sendo renderizados', () => {
    render(<MyProvider><App /></MyProvider>);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByTestId("column-filter")).toBeInTheDocument();
    expect(screen.getByTestId("comparison-filter")).toBeInTheDocument();
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /filter/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /remover todas filtragens/i })).toBeInTheDocument();
    expect(screen.getByTestId("column-sort")).toBeInTheDocument();
    expect(screen.getByText("Ascendente")).toBeInTheDocument();
    expect(screen.getByText("Descendente")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ordenar/i })).toBeInTheDocument();
  });

  test('Verifica se os títulos da tabela são renderizados', () => {
    render(<MyProvider><App /></MyProvider>);

    expect(screen.getByRole("columnheader", { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /rotation period/i })).toBeInTheDocument();
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
    expect(screen.getByRole("columnheader", { name: /url/i })).toBeInTheDocument();
  });

  test('Verifica se todos os itens da tabela são renderizados quando não há filtros', async () => {
    render(<MyProvider><App /></MyProvider>);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.getAllByTestId("planet-name").length).toBe(10);
  });

  test('Verifica se o input de busca textual está funcionando corretamente', async () => {
    render(<MyProvider><App /></MyProvider>);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.getAllByTestId("planet-name").length).toBe(10);

    userEvent.type(screen.getByRole("textbox"), 'oo');
    expect(screen.getAllByTestId("planet-name").length).toBe(2);
  });

  test('Verifica se os inputs de filtro estão funcionando corretamente', async () => {
    render(<MyProvider><App /></MyProvider>);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.getAllByTestId("planet-name").length).toBe(10);

    userEvent.selectOptions(screen.getByTestId("column-filter"), ['surface_water']);
    userEvent.selectOptions(screen.getByTestId("comparison-filter"), ['igual a'] );
    userEvent.type(screen.getByRole("spinbutton"), '8');
    userEvent.click(screen.getByRole("button", { name: /filter/i }));

    expect(screen.getByRole("heading", { name: /filtrando por:/i })).toBeInTheDocument();
    expect(screen.getAllByTestId("filter").length).toBe(1);

    userEvent.selectOptions(screen.getByTestId("column-filter"), ['diameter']);
    userEvent.selectOptions(screen.getByTestId("comparison-filter"), ['igual a'] );
    userEvent.type(screen.getByRole("spinbutton"), '8900');
    userEvent.click(screen.getByRole("button", { name: /filter/i }));

    expect(screen.getAllByTestId("filter").length).toBe(2);

    userEvent.click(screen.getAllByRole("button", { name: /x/i })[1]);

    expect(screen.getAllByTestId("filter").length).toBe(1);
  });

  test('Verifica se os inputs de ordenação funcionam corretamente ao selecionar population e ascendente', async () => {
    render(<MyProvider><App /></MyProvider>);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    userEvent.selectOptions(screen.getByTestId("column-sort"), 'population');
    userEvent.click(screen.getByText("Ascendente"));
    userEvent.click(screen.getByRole("button", { name: /ordenar/i }));

    const ascendentList= ['Yavin IV', 'Tatooine', 'Bespin', 'Endor', 'Kamino', 'Alderaan', 'Naboo', 'Coruscant', 'Dagobah', 'Hoth'];

    ascendentList.forEach((planet, index) => {
      expect(screen.getAllByTestId("planet-name")[index].innerHTML).toBe(planet);
    });
  });

  /* test('Verifica se os inputs de ordenação funcionam corretamente ao selecionar population e descendente', async () => {
    render(<MyProvider><App /></MyProvider>);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    userEvent.selectOptions(screen.getByTestId("column-sort"), 'population');
    userEvent.click(screen.getByText("Descendente"));
    userEvent.click(screen.getByRole("button", { name: /ordenar/i }));

    const descendentList = ['Coruscant', 'Naboo', 'Alderaan', 'Kamino', 'Endor', 'Bespin', 'Tatooine', 'Yavin IV', 'Dagobah', 'Hoth'];

    descendentList.forEach((planet, index) => {
      expect(screen.getAllByTestId("planet-name")[index].innerHTML).toBe(planet);
    });
  }); */

  test('Verifica se o botão de remover filtros funciona corretamente', async () => {
    render(<MyProvider><App /></MyProvider>);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    userEvent.selectOptions(screen.getByTestId("column-filter"), ['diameter']);
    userEvent.selectOptions(screen.getByTestId("comparison-filter"), ['maior que'] );
    userEvent.type(screen.getByRole("spinbutton"), '10000');
    userEvent.click(screen.getByRole("button", { name: /filter/i }));

    expect(screen.getAllByTestId("planet-name").length).toBe(7);

    userEvent.click(screen.getByRole("button", { name: /remover todas filtragens/i }));

    expect(screen.getAllByTestId("planet-name").length).toBe(10);
  });

  test('Verifica se é possível excluir os filtros um a um', async () => {
    render(<MyProvider><App /></MyProvider>);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    expect(screen.getByTestId("column-filter").childNodes.length).toBe(5);

    userEvent.selectOptions(screen.getByTestId("column-filter"), ['orbital_period']);
    userEvent.selectOptions(screen.getByTestId("comparison-filter"), ['menor que'] );
    userEvent.type(screen.getByRole("spinbutton"), '500');
    userEvent.click(screen.getByRole("button", { name: /filter/i }));

    expect(screen.getAllByTestId("planet-name").length).toBe(7);
    expect(screen.getByTestId("column-filter").childNodes.length).toBe(4);

    expect(screen.getByRole("heading", { name: /filtrando por:/i })).toBeInTheDocument();
    expect(screen.getByText("orbital_period menor que 500")).toBeInTheDocument();

    userEvent.selectOptions(screen.getByTestId("column-filter"), ['rotation_period']);
    userEvent.selectOptions(screen.getByTestId("comparison-filter"), ['menor que'] );
    userEvent.type(screen.getByRole("spinbutton"), '20');
    userEvent.click(screen.getByRole("button", { name: /filter/i }));

   fireEvent.click(await screen.findByRole("button", { name: /x/i }));

  });
});
