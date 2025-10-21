document.addEventListener('DOMContentLoaded', () => {

    // Seleção de Elementos do DOM
    const carImage = document.getElementById('carImage');
    const generateVideoButton = document.getElementById('generateVideoButton');
    const loadingMessage = document.getElementById('loadingMessage');
    const videoResult = document.getElementById('videoResult');
    const videoLink = document.getElementById('videoLink');
    const videoModalOverlay = document.getElementById('videoModalOverlay');
    const closeModalButton = document.getElementById('closeModalButton');
    const simulationVideo = document.getElementById('simulationVideo');
    const gradientBar = document.getElementById('gradient-bar'); // Seleciona a barra de gradiente
    
    // Objeto para guardar a configuração atual do carro
    let currentCarConfig = {
        color: 'blue', // A cor inicial deve corresponder à imagem no HTML
    };

    // Função que atualiza a imagem do carro com base na cor recebida
    function updateCarColor(newColor) {
        // Mapeia o nome da cor ao nome do arquivo de imagem
        // Verifique se estes nomes correspondem exatamente aos seus arquivos na pasta /img
        const colorToFile = {
            blue: 'img/carroAzul.png',
            red: 'img/carroVermelho.png',
            silver: 'img/carroPrata.png',
            black: 'img/carroPreto.png'
        };

        if (colorToFile[newColor]) {
            carImage.src = colorToFile[newColor];
            currentCarConfig.color = newColor;
        }
    }

    // Adiciona um "ouvinte" de evento de clique na barra de gradiente
    gradientBar.addEventListener('click', (event) => {
        const barWidth = gradientBar.clientWidth;
        const clickX = event.offsetX;
        const clickPercentage = (clickX / barWidth) * 100;

        let selectedColor;

        // Define as "zonas" de clique e a cor correspondente
        if (clickPercentage < 25) {
            selectedColor = 'red';
        } else if (clickPercentage < 50) {
            selectedColor = 'black';
        } else if (clickPercentage < 75) {
            selectedColor = 'silver';
        } else {
            selectedColor = 'blue';
        }
        
        // Chama a função para efetivamente trocar a imagem do carro
        updateCarColor(selectedColor);
    });
    
    // Função que simula a chamada para a IA gerar o vídeo
    async function callVideoGenerationAI(config) {
        loadingMessage.classList.remove('hidden');
        videoResult.classList.add('hidden');
        generateVideoButton.disabled = true;

        await new Promise(resolve => setTimeout(resolve, 2000)); // Simula espera de 2 segundos

        loadingMessage.classList.add('hidden');
        videoResult.classList.remove('hidden');
        generateVideoButton.disabled = false;
    }

    // Funções para abrir e fechar o modal de vídeo
    function openVideoModal() {
        videoModalOverlay.classList.remove('hidden');
        setTimeout(() => {
            videoModalOverlay.classList.add('visible');
            simulationVideo.currentTime = 0;
            simulationVideo.play();
        }, 10);
    }

    function closeVideoModal() {
        videoModalOverlay.classList.remove('visible');
        simulationVideo.pause();
        setTimeout(() => {
            videoModalOverlay.classList.add('hidden');
        }, 300);
    }

    // Adiciona os eventos de clique aos botões e links
    generateVideoButton.addEventListener('click', () => callVideoGenerationAI(currentCarConfig));
    videoLink.addEventListener('click', (e) => { e.preventDefault(); openVideoModal(); });
    closeModalButton.addEventListener('click', closeVideoModal);
    videoModalOverlay.addEventListener('click', (e) => { if (e.target === videoModalOverlay) closeVideoModal(); });
});