document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const elements = {
        searchInput: document.querySelector('.search-box input'),
        typeFilter: document.getElementById('type-filter'),
        resetButton: document.getElementById('resetFilters'),
        changeCards: document.querySelectorAll('.change-card'),
        changeCategories: document.querySelectorAll('.change-category')
    };

    // Filtrar cambios
    function filterChanges() {
        const filters = {
            search: elements.searchInput.value.toLowerCase(),
            type: elements.typeFilter.value
        };

        // Ocultar/mostrar categorías completas basadas en si tienen cambios visibles
        elements.changeCategories.forEach(category => {
            let hasVisibleChanges = false;
            const cards = category.querySelectorAll('.change-card');
            
            cards.forEach(card => {
                const cardType = card.getAttribute('data-type');
                const cardText = card.textContent.toLowerCase();
                
                const matchesSearch = cardText.includes(filters.search);
                const matchesType = filters.type === 'all' || cardType === filters.type;
                
                if (matchesSearch && matchesType) {
                    card.style.display = 'block';
                    hasVisibleChanges = true;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Mostrar/ocultar categoría basada en si tiene cambios visibles
            category.style.display = hasVisibleChanges ? 'block' : 'none';
        });
    }

    // Resetear filtros
    function resetFilters() {
        elements.searchInput.value = '';
        elements.typeFilter.value = 'all';
        filterChanges();
    }

    // Event listeners
    elements.searchInput.addEventListener('input', filterChanges);
    elements.typeFilter.addEventListener('change', filterChanges);
    elements.resetButton.addEventListener('click', resetFilters);

    // Inicializar
    filterChanges();
});