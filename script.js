document.addEventListener('DOMContentLoaded', () => {

    // --- Seleção dos Elementos do DOM ---
    const carImage = document.getElementById('carImage');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const generateVideoButton = document.getElementById('generateVideoButton');
    const loadingMessage = document.getElementById('loadingMessage');
    const videoResult = document.getElementById('videoResult');

    // --- Variáveis de Estado ---
    let currentCarConfig = {
        color: 'blue',
        wheels: 'standard',
        model: 'Onix'
    };

    // --- Funções ---

    /**
     * Atualiza a imagem do carro com base na cor selecionada.
     * @param {string} newColor - A nova cor selecionada.
     */
    function updateCarColor(newColor) {
        // Mapeia a cor do data-attribute para o nome do arquivo de imagem
        // Alterado aqui para corresponder aos novos nomes de arquivo
        const colorToFile = {
            blue: 'img/carroAzul.png',
            red: 'img/carroVermelho.png',
            silver: 'img/carroPrata.png',
            black: 'img/carroPreto.png'
        };

        // Verifica se a imagem para a cor existe
        if (colorToFile[newColor]) {
            carImage.src = colorToFile[newColor];
            currentCarConfig.color = newColor;
            console.log(`Cor do carro alterada para: ${newColor}`);
        } else {
            // Se não houver imagem, usa a azul como padrão
            carImage.src = colorToFile['blue']; // Fallback
            currentCarConfig.color = 'blue';
            console.warn(`Imagem para a cor "${newColor}" não encontrada. Usando cor padrão.`);
        }
    }

    /**
     * SIMULAÇÃO: Faz uma "requisição" para uma API de IA.
     * @param {object} config - O objeto com as configurações do carro.
     */
    async function callVideoGenerationAI(config) {
        loadingMessage.classList.remove('hidden');
        videoResult.classList.add('hidden');
        generateVideoButton.disabled = true;

        console.log('Enviando para a IA a seguinte configuração:', config);

        await new Promise(resolve => setTimeout(resolve, 3000));

        loadingMessage.classList.add('hidden');
        videoResult.classList.remove('hidden');
        generateVideoButton.disabled = false;

        console.log('IA retornou! Vídeo gerado com sucesso.');
    }


    // --- Event Listeners ---

    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            colorSwatches.forEach(s => s.classList.remove('selected'));
            swatch.classList.add('selected');

            const selectedColor = swatch.dataset.color;
            updateCarColor(selectedColor);
        });
    });

    generateVideoButton.addEventListener('click', () => {
        callVideoGenerationAI(currentCarConfig);
    });

});