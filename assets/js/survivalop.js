document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const elements = {
        tabs: document.querySelectorAll('.mobs-tab'),
        tabContents: document.querySelectorAll('.mobs-tab-content'),
        dungeonFilter: document.getElementById('dungeon-filter'),
        difficultyFilter: document.getElementById('difficulty-filter'),
        typeFilter: document.getElementById('type-filter'),
        searchInput: document.querySelector('.search-box input'),
        resetButton: document.getElementById('resetFilters'),
        cooldownElements: document.querySelectorAll('.ability-cooldown')
    };

    // Manejo de pestañas
    function setupTabs() {
        elements.tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remover clase active de todas las pestañas
                elements.tabs.forEach(t => t.classList.remove('active'));
                // Añadir clase active a la pestaña clickeada
                this.classList.add('active');
                
                // Ocultar todos los contenidos
                elements.tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Mostrar el contenido correspondiente
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // Filtrado de criaturas
    function filterMobs() {
        const filters = {
            dungeon: elements.dungeonFilter.value,
            difficulty: elements.difficultyFilter.value,
            type: elements.typeFilter.value,
            search: elements.searchInput.value.toLowerCase()
        };

        document.querySelectorAll('.mob-card').forEach(card => {
            const cardData = {
                dungeon: card.getAttribute('data-dungeon'),
                difficulty: card.getAttribute('data-difficulty'),
                type: card.getAttribute('data-type'),
                name: card.querySelector('.mob-name').textContent.toLowerCase()
            };

            const shouldShow = (
                (filters.dungeon === 'all' || cardData.dungeon === filters.dungeon) &&
                (filters.difficulty === 'all' || cardData.difficulty === filters.difficulty) &&
                (filters.type === 'all' || cardData.type === filters.type) &&
                cardData.name.includes(filters.search)
            );

            card.style.display = shouldShow ? 'block' : 'none';
        });
    }

    // Resetear filtros
    function resetFilters() {
        elements.dungeonFilter.value = 'all';
        elements.difficultyFilter.value = 'all';
        elements.typeFilter.value = 'all';
        elements.searchInput.value = '';
        filterMobs();
        elements.searchInput.focus();
    }

    // Animación de cooldown
    function setupCooldownAnimation() {
        setInterval(() => {
            elements.cooldownElements.forEach(cooldown => {
                cooldown.style.animation = 'none';
                void cooldown.offsetWidth; // Trigger reflow
                cooldown.style.animation = 'cooldownAnimation 3s linear forwards';
            });
        }, 3000);
    }

    // Event listeners
    function setupEventListeners() {
        // Filtros
        elements.dungeonFilter.addEventListener('change', filterMobs);
        elements.difficultyFilter.addEventListener('change', filterMobs);
        elements.typeFilter.addEventListener('change', filterMobs);
        elements.searchInput.addEventListener('input', filterMobs);
        
        // Reset
        if (elements.resetButton) {
            elements.resetButton.addEventListener('click', resetFilters);
        }
    }

    // Inicialización
    function init() {
        setupTabs();
        setupEventListeners();
        setupCooldownAnimation();
    }

    init();
});
