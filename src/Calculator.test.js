import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Calculator from './Calculator';

describe('Calculator', () => {
    test('renderiza corretamente', () => {
        render(<Calculator />);

        // Verifica se os elementos essenciais estão presentes na tela
        expect(screen.getByText('Pizza Calculator')).toBeInTheDocument();
        expect(screen.getByLabelText('Quantidade de Pizzas:')).toBeInTheDocument();
        expect(screen.getByLabelText('Peso da Massa (gramas):')).toBeInTheDocument();
        expect(screen.getByLabelText('Percentual de Hidratação (%):')).toBeInTheDocument();
        expect(screen.getByText('Calcular')).toBeInTheDocument();
        expect(screen.getByText('Limpar')).toBeInTheDocument();
    });

    test('exibe mensagem de erro ao calcular sem preencher os campos', () => {
        render(<Calculator />);
        const calcularButton = screen.getByText('Calcular');

        fireEvent.click(calcularButton);

        // Verifica se as mensagens de erro são exibidas
        expect(screen.getByTestId('erro-quantidade-pizzas')).toBeInTheDocument();
        expect(screen.getByTestId('erro-peso-massa')).toBeInTheDocument();
        expect(screen.getByTestId('erro-percentual-hidratacao')).toBeInTheDocument();
    });

    test('exibe mensagem de erro ao calcular com valores inválidos', () => {
        render(<Calculator />);
        const quantidadePizzasInput = screen.getByLabelText('Quantidade de Pizzas:');
        const pesoMassaInput = screen.getByLabelText('Peso da Massa (gramas):');
        const percentualHidratacaoInput = screen.getByLabelText('Percentual de Hidratação (%):');
        const calcularButton = screen.getByText('Calcular');

        // Insere valores inválidos nos campos
        fireEvent.change(quantidadePizzasInput, { target: { value: '0' } });
        fireEvent.change(pesoMassaInput, { target: { value: '-200' } });
        fireEvent.change(percentualHidratacaoInput, { target: { value: '-50' } });
        fireEvent.click(calcularButton);

        // Verifica se as mensagens de erro são exibidas
        expect(screen.getByTestId('erro-quantidade-pizzas')).toBeInTheDocument();
        expect(screen.getByTestId('erro-peso-massa')).toBeInTheDocument();
        expect(screen.getByTestId('erro-percentual-hidratacao')).toBeInTheDocument();
    });

    test('exibe mensagem de sucesso ao calcular corretamente', () => {
        render(<Calculator />);
        const quantidadePizzasInput = screen.getByLabelText('Quantidade de Pizzas:');
        const pesoMassaInput = screen.getByLabelText('Peso da Massa (gramas):');
        const percentualHidratacaoInput = screen.getByLabelText('Percentual de Hidratação (%):');
        const calcularButton = screen.getByText('Calcular');

        // Insere valores válidos nos campos
        fireEvent.change(quantidadePizzasInput, { target: { value: '5' } });
        fireEvent.change(pesoMassaInput, { target: { value: '300' } });
        fireEvent.change(percentualHidratacaoInput, { target: { value: '60' } });
        fireEvent.click(calcularButton);

        // Verifica se a mensagem de sucesso é exibida
        expect(screen.getByText('Cálculo realizado com sucesso!')).toBeInTheDocument();
        expect(screen.queryByTestId('erro-quantidade-pizzas')).not.toBeInTheDocument();
        expect(screen.queryByTestId('erro-peso-massa')).not.toBeInTheDocument();
        expect(screen.queryByTestId('erro-percentual-hidratacao')).not.toBeInTheDocument();
    });
});
