// Estado Global: Variáveis que controlam o fluxo de dados da aplicação
        let currentInput = '0';
        let calculationDone = false; // Controla se o próximo dígito inicia uma nova conta
        const displayElement = document.getElementById('display');
        const historyElement = document.getElementById('history');

        // Função de Atualização: Sincroniza a lógica do JS com o que o usuário vê (DOM)
        function updateDisplay() {
            displayElement.innerText = currentInput;
            
            // Ajuste dinâmico de fonte para números grandes (Prevenção de quebra de layout)
            if (currentInput.length > 8) {
                // Troca de classe dinâmica baseada na densidade de caracteres
                displayElement.classList.replace('text-5xl', 'text-3xl');
            } else {
                displayElement.classList.replace('text-3xl', 'text-5xl');
            }
        }

        // Concatenação de Números: Valida a entrada antes de registrar
        function appendNumber(number) {
            // Fluxo Pós-Cálculo: Se o usuário clica num número após o '=', limpa a tela automaticamente
            if (calculationDone) {
                currentInput = number;
                calculationDone = false;
            } else {
                // Tratamento do zero à esquerda: Impede números como "05"
                if (currentInput === '0' && number !== '.') {
                    currentInput = number;
                } else {
                    // Validação Decimal: Impede a existência de dois pontos no mesmo número
                    if (number === '.' && currentInput.includes('.')) return;
                    currentInput += number;
                }
            }
            updateDisplay();
        }

        // Lógica de Operadores: Gerencia a troca de operações matemáticas
        function appendOperator(op) {
            if (calculationDone) calculationDone = false;
            const lastChar = currentInput.slice(-1);
            
            // Substituição Inteligente: Se digitar '+' e depois '-', troca o operador em vez de acumular
            if (['+', '-', '*', '/'].includes(lastChar)) {
                currentInput = currentInput.slice(0, -1) + op;
            } else {
                currentInput += op;
            }
            updateDisplay();
        }

        // Limpeza Total (Reset): Retorna a aplicação ao estado original (fábrica)
        function clearDisplay() {
            currentInput = '0';
            historyElement.innerText = '';
            calculationDone = false;
            updateDisplay();
        }

        // Deletar Caractere (Backspace): Remove o último dígito inserido
        function deleteDigit() {
            if (calculationDone) {
                clearDisplay();
                return;
            }
            if (currentInput.length > 1) {
                currentInput = currentInput.slice(0, -1);
            } else {
                currentInput = '0'; // Garante que o display nunca fique vazio
            }
            updateDisplay();
        }

        // Motor de Cálculo: Processa a string acumulada
        function calculate() {
            try {
                // Sanitização: Impede a execução de códigos maliciosos via eval()
                // permite apenas números e os 4 operadores fundamentais
                const sanitizedInput = currentInput.replace(/[^-+*/.0-9]/g, '');
                
                // eval(): Executa a string como expressão matemática real
                let result = eval(sanitizedInput);
                
                // Formatação de Precisão: Evita erros de ponto flutuante (ex: 0.1 + 0.2)
                if (result.toString().includes('.')) {
                    // Limita a 8 casas decimais e remove zeros desnecessários ao final
                    result = parseFloat(result.toFixed(8));
                }

                // Atualização de Histórico: Move a conta feita para cima antes de mostrar o resultado
                historyElement.innerText = currentInput + ' =';
                currentInput = result.toString();
                calculationDone = true; // Define que o próximo dígito deve limpar o visor
                updateDisplay();
            } catch (e) {
                // Tratamento de Exceção: Lida com divisões por zero ou sintaxes inválidas
                currentInput = "Erro";
                updateDisplay();
                setTimeout(clearDisplay, 1000); // Aguarda 1s para o usuário ler o erro e limpa
            }
        }

        // Suporte para teclado físico: Mapeia eventos de tecla para funções do sistema
        document.addEventListener('keydown', (event) => {
            const key = event.key;
            // Regex para capturar apenas números de 0 a 9
            if (/[0-9]/.test(key)) appendNumber(key);
            if (['+', '-', '*', '/'].includes(key)) appendOperator(key);
            if (key === 'Enter' || key === '=') calculate();
            if (key === 'Escape') clearDisplay();
            if (key === 'Backspace') deleteDigit();
            if (key === '.') appendNumber('.');
        });