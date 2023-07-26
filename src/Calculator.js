import React, { useState } from 'react';

function Calculator() {
    const [quantidadePizzas, setQuantidadePizzas] = useState('');
    const [pesoMassa, setPesoMassa] = useState('');
    const [percentualHidratacao, setPercentualHidratacao] = useState('');
    const [resultado, setResultado] = useState(null);
    const [erro, setErro] = useState('');

    const calcularIngredientes = () => {
        // Verifica se os campos obrigatórios estão preenchidos
        if (!quantidadePizzas || !pesoMassa || !percentualHidratacao) {
            setErro('Por favor, preencha todos os campos obrigatórios.');
            setResultado(null);
            return;
        }

        // Converte os valores para números
        const massas = parseFloat(quantidadePizzas);
        const peso = parseFloat(pesoMassa);
        const hidratacao = parseFloat(percentualHidratacao) / 100;

        // Realiza os cálculos conforme a lógica anterior
        const quantidadeFarinha = (massas * peso) / (1 + hidratacao);
        const quantidadeAgua = quantidadeFarinha * hidratacao;
        const quantidadeSal = quantidadeFarinha * 0.02; // 2% da quantidade de farinha
        const quantidadeFermento = quantidadeFarinha * 0.005; // 0.5% da quantidade de farinha

        // Define os resultados
        setResultado({
            farinha: quantidadeFarinha.toFixed(2),
            agua: quantidadeAgua.toFixed(2),
            sal: quantidadeSal.toFixed(2),
            fermento: quantidadeFermento.toFixed(2),
        });

        // Limpa a mensagem de erro
        setErro('');
    };

    const limparFormulario = () => {
        setQuantidadePizzas('');
        setPesoMassa('');
        setPercentualHidratacao('');
        setResultado(null);
    };

    return (
        <div>
            <h2>Pizza Calculator</h2>
            {erro && <div className="error-message">{erro}</div>}
            <div>
                <label>Quantidade de Pizzas: </label>
                <input type="number" value={quantidadePizzas} onChange={(e) => setQuantidadePizzas(e.target.value)} />
            </div>
            <div>
                <label>Peso da Massa (gramas): </label>
                <input type="number" value={pesoMassa} onChange={(e) => setPesoMassa(e.target.value)} />
            </div>
            <div>
                <label>Percentual de Hidratação (%): </label>
                <input type="number" value={percentualHidratacao} onChange={(e) => setPercentualHidratacao(e.target.value)} />
            </div>
            <div>
                <button onClick={calcularIngredientes}>Calcular</button>
                <button className="btn-clear" onClick={limparFormulario}>Limpar</button>
            </div>

            {resultado && (
                <div>
                    <h3>Resultados dos Ingredientes:</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>Ingrediente</th>
                            <th>Quantidade</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Farinha (g)</td>
                            <td>{resultado.farinha}</td>
                        </tr>
                        <tr>
                            <td>Água (g)</td>
                            <td>{resultado.agua}</td>
                        </tr>
                        <tr>
                            <td>Sal (g)</td>
                            <td>{resultado.sal}</td>
                        </tr>
                        <tr>
                            <td>Fermento (g)</td>
                            <td>{resultado.fermento}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Calculator;
