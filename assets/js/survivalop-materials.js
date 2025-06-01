document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const elements = {
        materialsTabs: document.querySelectorAll('.materials-tab'),
        materialsTabContents: document.querySelectorAll('.materials-tab-content'),
        dungeonFilter: document.getElementById('dungeon-filter'),
        typeFilter: document.getElementById('type-filter'),
        searchInput: document.querySelector('.materials-filters .search-box input'),
        resetButton: document.getElementById('resetFilters'),
        materialCards: document.querySelectorAll('.material-card'),
        materialHeaders: document.querySelectorAll('.material-header')
    };

    // Cambiar entre pestañas
    function setupMaterialsTabs() {
        elements.materialsTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remover clase active de todas las pestañas
                elements.materialsTabs.forEach(t => t.classList.remove('active'));
                // Añadir clase active a la pestaña clickeada
                this.classList.add('active');
                
                // Ocultar todos los contenidos
                elements.materialsTabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Mostrar el contenido correspondiente
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
                
                // Reaplicar filtros después de cambiar de pestaña
                filterMaterials();
            });
        });
    }

    // Filtrado de materiales
    function filterMaterials() {
        const filters = {
            dungeon: elements.dungeonFilter.value,
            type: elements.typeFilter.value,
            search: elements.searchInput.value.toLowerCase()
        };

        let hasVisibleCards = false;
        const activeTabContent = document.querySelector('.materials-tab-content.active');

        // Mostrar tarjetas que coincidan con los filtros
        elements.materialCards.forEach(card => {
            // Solo filtrar las tarjetas de la pestaña activa
            if (card.closest('.materials-tab-content') !== activeTabContent) {
                return;
            }

            const cardData = {
                dungeon: card.getAttribute('data-dungeon'),
                type: card.getAttribute('data-type'),
                name: card.querySelector('.material-name').textContent.toLowerCase()
            };

            const matchesDungeon = filters.dungeon === 'all' || cardData.dungeon === filters.dungeon;
            const matchesType = filters.type === 'all' || cardData.type === filters.type;
            const matchesSearch = cardData.name.includes(filters.search);

            if (matchesDungeon && matchesType && matchesSearch) {
                card.style.display = 'block';
                hasVisibleCards = true;
            } else {
                card.style.display = 'none';
            }
        });

        // Manejar visibilidad de categorías
        activeTabContent.querySelectorAll('.material-category').forEach(category => {
            const categoryCards = category.querySelectorAll('.material-card');
            const hasVisibleCategoryCards = Array.from(categoryCards).some(card => card.style.display === 'block');
            
            category.style.display = hasVisibleCategoryCards ? 'block' : 'none';
        });
    }

    // Resetear filtros
    function resetFilters() {
        elements.dungeonFilter.value = 'all';
        elements.typeFilter.value = 'all';
        elements.searchInput.value = '';

        filterMaterials();
        elements.searchInput.focus();
    }

    // Expandir/contraer tarjetas de materiales
    function setupMaterialCards() {
        elements.materialHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const card = this.closest('.material-card');
                const isExpanded = card.classList.contains('expanded');
                
                // Cerrar todas las tarjetas primero
                document.querySelectorAll('.material-card.expanded').forEach(expandedCard => {
                    if (expandedCard !== card) {
                        expandedCard.classList.remove('expanded');
                    }
                });
                
                // Alternar estado de la tarjeta clickeada
                card.classList.toggle('expanded', !isExpanded);
            });
        });
    }

    // Efecto hover para recetas
    function setupRecipeHoverEffects() {
        document.querySelectorAll('.recipe-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                const recipeImage = this.querySelector('.recipe-image');
                if (recipeImage) {
                    recipeImage.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const recipeImage = this.querySelector('.recipe-image');
                if (recipeImage) {
                    recipeImage.style.transform = 'scale(1) rotate(0)';
                }
            });
        });
    }

    // Event listeners
    function setupEventListeners() {
        // Filtros
        elements.dungeonFilter.addEventListener('change', filterMaterials);
        elements.typeFilter.addEventListener('change', filterMaterials);
        elements.searchInput.addEventListener('input', filterMaterials);
        
        // Reset
        if (elements.resetButton) {
            elements.resetButton.addEventListener('click', resetFilters);
        }
    }

    // Inicialización
    function init() {
        setupMaterialsTabs();
        setupMaterialCards();
        setupEventListeners();
        setupRecipeHoverEffects();
        
        // Asegurarse de que todo esté visible al inicio
        resetFilters();
    }

    init();
});