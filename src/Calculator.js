import React, {useState} from 'react';

function Calculator() {
    const [quantidadePizzas, setQuantidadePizzas] = useState('');
    const [pesoMassa, setPesoMassa] = useState('');
    const [percentualHidratacao, setPercentualHidratacao] = useState('');
    const [resultado, setResultado] = useState(null);
    const [erros, setErros] = useState({});
    const [calculoSucesso, setCalculoSucesso] = useState(false);


    const calcularIngredientes = () => {
        // Verifica se os campos obrigatórios estão preenchidos
        if (!quantidadePizzas || !pesoMassa || !percentualHidratacao) {
            setErros({
                quantidadePizzas: quantidadePizzas ? '' : 'Campo obrigatório.',
                pesoMassa: pesoMassa ? '' : 'Campo obrigatório.',
                percentualHidratacao: percentualHidratacao ? '' : 'Campo obrigatório.',
            });
            setResultado(null);
            return;
        }

        // Validação para garantir que os campos são números positivos
        if (quantidadePizzas <= 0 || pesoMassa <= 0 || percentualHidratacao <= 0) {
            setErros({
                quantidadePizzas: quantidadePizzas > 0 ? '' : 'Valor inválido.',
                pesoMassa: pesoMassa > 0 ? '' : 'Valor inválido.',
                percentualHidratacao: percentualHidratacao > 0 ? '' : 'Valor inválido.',
            });
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

        // Cálculo das informações do poolish
        const poolishGramas = quantidadePizzas * 100; // 100g de poolish por pizza
        const poolishFarinha = poolishGramas / 2;
        const poolishAgua = poolishGramas / 2;

        // Subtraindo a quantidade de poolish das quantidades totais de farinha e água
        const resultadoFarinha = quantidadeFarinha - poolishFarinha;
        const resultadoAgua = quantidadeAgua - poolishAgua;

        // Define os resultados
        setResultado({
            farinha: resultadoFarinha.toFixed(2),
            agua: resultadoAgua.toFixed(2),
            sal: quantidadeSal.toFixed(2),
            fermento: quantidadeFermento.toFixed(2),
            poolishFarinha: poolishFarinha.toFixed(2),
            poolishAgua: poolishAgua.toFixed(2),
        });

        // Define o estado de cálculo bem-sucedido
        setCalculoSucesso(true);

        // Limpa as mensagens de erro após o cálculo ser realizado
        setErros({});

    };

    const limparFormulario = () => {
        setQuantidadePizzas('');
        setPesoMassa('');
        setPercentualHidratacao('');
        setResultado(null);
        setErros({});
        setCalculoSucesso(false);
    };

    return (
        <div className="calculator-container">
            <h2>Pizza Calculator</h2>
            <div className="input-container">
                <label htmlFor="quantidadePizzas">Quantidade de Pizzas:</label>
                <input
                    type="number"
                    id="quantidadePizzas"
                    value={quantidadePizzas}
                    onChange={(e) => setQuantidadePizzas(e.target.value)}
                    className={erros.quantidadePizzas ? 'input-error' : ''}
                />
                {erros.quantidadePizzas && <div className="error-message" data-testid="erro-quantidade-pizzas">{erros.quantidadePizzas}</div>}
            </div>
            <div className="input-container">
                <label htmlFor="pesoMassa">Peso da Massa (gramas):</label>
                <input
                    type="number"
                    id="pesoMassa"
                    value={pesoMassa}
                    onChange={(e) => setPesoMassa(e.target.value)}
                    className={erros.pesoMassa ? 'input-error' : ''}
                />
                {erros.pesoMassa && <div className="error-message" data-testid="erro-peso-massa">{erros.pesoMassa}</div>}
            </div>
            <div className="input-container">
                <label htmlFor="percentualHidratacao">Percentual de Hidratação (%):</label>
                <input
                    type="number"
                    id="percentualHidratacao"
                    value={percentualHidratacao}
                    onChange={(e) => setPercentualHidratacao(e.target.value)}
                    className={erros.percentualHidratacao ? 'input-error' : ''}
                />
                {erros.percentualHidratacao && <div className="error-message" data-testid="erro-percentual-hidratacao">{erros.percentualHidratacao}</div>}
            </div>
            <div className="button-container">
                <button className="btn-clear" onClick={limparFormulario}>Limpar</button>
                <button onClick={calcularIngredientes}>Calcular</button>
            </div>

            {resultado && (
                <>
                    <div className="result-container">
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
                    <div className="result-container">
                        <h3>Informações do Poolish:</h3>
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
                                <td>{resultado.poolishFarinha}</td>
                            </tr>
                            <tr>
                                <td>Água (g)</td>
                                <td>{resultado.poolishAgua}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* Exibe a mensagem de sucesso após o cálculo ser realizado com êxito */}
            {calculoSucesso && resultado && (
                <div className="success-message">Cálculo realizado com sucesso!</div>
            )}

            <div className="developer-info">
                <div>Desenvolvido por Samuel Terra</div>
                <div>Calculadora de Pizza - Versão 1.0</div>
            </div>
        </div>
    );
}

export default Calculator;
