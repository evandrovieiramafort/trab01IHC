document.addEventListener('DOMContentLoaded', () => {

    // Seleção de Elementos do DOM
    const carImage = document.getElementById('carImage');
    const generateVideoButton = document.getElementById('generateVideoButton');
    const loadingMessage = document.getElementById('loadingMessage');
    const videoResult = document.getElementById('videoResult');
    const videoLink = document.getElementById('videoLink');
    const gradientBar = document.getElementById('gradient-bar');

    // Elementos do Modal
    const videoModalOverlay = document.getElementById('videoModalOverlay');
    const closeModalButton = document.getElementById('closeModalButton');
    const closeModalViaButton = document.getElementById('closeModalViaButton');
    
    // CORREÇÃO: Selecionamos o elemento de vídeo real
    const simulationVideo = document.getElementById('simulationVideo'); 
    
    // A linha abaixo selecionava o placeholder antigo e foi removida.
    // const videoPlayerPlaceholder = document.querySelector('.video-player-placeholder');

    let currentCarConfig = {
        color: 'blue',
    };

    function updateCarColor(newColor) {
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

    gradientBar.addEventListener('click', (event) => {
        const barWidth = gradientBar.clientWidth;
        const clickX = event.offsetX;
        const clickPercentage = (clickX / barWidth) * 100;

        let selectedColor;
        if (clickPercentage < 25) { selectedColor = 'red'; } 
        else if (clickPercentage < 50) { selectedColor = 'black'; } 
        else if (clickPercentage < 75) { selectedColor = 'silver'; } 
        else { selectedColor = 'blue'; }
        
        updateCarColor(selectedColor);
    });
    
    async function callVideoGenerationAI(config) {
        loadingMessage.classList.remove('hidden');
        videoResult.classList.add('hidden');
        generateVideoButton.disabled = true;

        await new Promise(resolve => setTimeout(resolve, 2000));

        loadingMessage.classList.add('hidden');
        videoResult.classList.remove('hidden');
        generateVideoButton.disabled = false;
    }

    function openVideoModal() {
        videoModalOverlay.classList.remove('hidden');
        setTimeout(() => {
            videoModalOverlay.classList.add('visible');
            simulationVideo.currentTime = 0; // Reinicia o vídeo
            simulationVideo.play();          // Agora esta linha funciona!
        }, 10);
    }

    function closeVideoModal() {
        videoModalOverlay.classList.remove('visible');
        simulationVideo.pause();             // E esta também!
        setTimeout(() => {
            videoModalOverlay.classList.add('hidden');
        }, 300);
    }

    generateVideoButton.addEventListener('click', () => callVideoGenerationAI(currentCarConfig));
    videoLink.addEventListener('click', (e) => { e.preventDefault(); openVideoModal(); });
    
    closeModalButton.addEventListener('click', closeVideoModal);
    closeModalViaButton.addEventListener('click', closeVideoModal);

    videoModalOverlay.addEventListener('click', (e) => { 
        if (e.target === videoModalOverlay) { closeVideoModal(); }
    });
});