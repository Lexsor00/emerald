// Script para manejar las pestañas
document.addEventListener('DOMContentLoaded', function() {
    // Manejo de pestañas
    const tabs = document.querySelectorAll('.mobs-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remover clase active de todas las pestañas
            tabs.forEach(t => t.classList.remove('active'));
            // Añadir clase active a la pestaña clickeada
            this.classList.add('active');
            
            // Ocultar todos los contenidos
            document.querySelectorAll('.mobs-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Mostrar el contenido correspondiente
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Filtrado de criaturas
    const dungeonFilter = document.getElementById('dungeon-filter');
    const difficultyFilter = document.getElementById('difficulty-filter');
    const typeFilter = document.getElementById('type-filter');
    const searchInput = document.querySelector('.search-box input');
    
    function filterMobs() {
        const dungeonValue = dungeonFilter.value;
        const difficultyValue = difficultyFilter.value;
        const typeValue = typeFilter.value;
        const searchValue = searchInput.value.toLowerCase();
        
        document.querySelectorAll('.mob-card').forEach(card => {
            const cardDungeon = card.getAttribute('data-dungeon');
            const cardDifficulty = card.getAttribute('data-difficulty');
            const cardType = card.getAttribute('data-type');
            const cardName = card.querySelector('.mob-name').textContent.toLowerCase();
            
            const dungeonMatch = dungeonValue === 'all' || cardDungeon === dungeonValue;
            const difficultyMatch = difficultyValue === 'all' || cardDifficulty === difficultyValue;
            const typeMatch = typeValue === 'all' || cardType === typeValue;
            const searchMatch = cardName.includes(searchValue);
            
            if (dungeonMatch && difficultyMatch && typeMatch && searchMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    function filterMobs() {
        const dungeonValue = dungeonFilter.value;
        const difficultyValue = difficultyFilter.value;
        const typeValue = typeFilter.value;
        const searchValue = searchInput.value.toLowerCase();
        
        document.querySelectorAll('.mob-card').forEach(card => {
            const cardDungeon = card.getAttribute('data-dungeon');
            const cardDifficulty = card.getAttribute('data-difficulty');
            const cardType = card.getAttribute('data-type');
            const cardName = card.querySelector('.mob-name').textContent.toLowerCase();
            
            const dungeonMatch = dungeonValue === 'all' || cardDungeon === dungeonValue;
            const difficultyMatch = difficultyValue === 'all' || cardDifficulty === difficultyValue;
            const typeMatch = typeValue === 'all' || cardType === typeValue;
            const searchMatch = cardName.includes(searchValue);
            
            if (dungeonMatch && difficultyMatch && typeMatch && searchMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }


    document.getElementById('resetFilters').addEventListener('click', function() {
        // Reset dropdowns to default values
        dungeonFilter.value = 'all';
        difficultyFilter.value = 'all';
        typeFilter.value = 'all';

        // Clear search input
        searchInput.value = '';

        // Trigger filter function
        filterMobs();

        // For better UX, focus the search input after reset
        searchInput.focus();
    });


    }
    
    
    // Event listeners para filtros
    dungeonFilter.addEventListener('change', filterMobs);
    difficultyFilter.addEventListener('change', filterMobs);
    typeFilter.addEventListener('change', filterMobs);
    searchInput.addEventListener('input', filterMobs);
    
    // Animación de cooldown para habilidades
    setInterval(() => {
        document.querySelectorAll('.ability-cooldown').forEach(cooldown => {
            cooldown.style.animation = 'none';
            void cooldown.offsetWidth; // Trigger reflow
            cooldown.style.animation = 'cooldownAnimation 3s linear forwards';
        });
    }, 3000);
});