document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const elements = {
        weaponsTabs: document.querySelectorAll('.weapons-tab'),
        weaponsTabContents: document.querySelectorAll('.weapons-tab-content'),
        rarityFilter: document.getElementById('rarity-filter'),
        searchInput: document.querySelector('.weapons-filters .search-box input'),
        resetButton: document.getElementById('resetFilters'),
        weaponCards: document.querySelectorAll('.weapon-card'),
        weaponHeaders: document.querySelectorAll('.weapon-header')
    };

    // Switch between tabs
    function setupWeaponsTabs() {
        elements.weaponsTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                elements.weaponsTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all contents
                elements.weaponsTabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show corresponding content
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
                
                // Reapply filters after switching tabs
                filterWeapons();
            });
        });
    }

    // Filter weapons
    function filterWeapons() {
        const filters = {
            rarity: elements.rarityFilter.value,
            search: elements.searchInput.value.toLowerCase()
        };

        let hasVisibleCards = false;
        const activeTabContent = document.querySelector('.weapons-tab-content.active');

        // Show cards that match filters
        elements.weaponCards.forEach(card => {
            // Only filter cards from active tab
            if (card.closest('.weapons-tab-content') !== activeTabContent) {
                return;
            }

            const cardData = {
                rarity: card.getAttribute('data-rarity'),
                name: card.querySelector('.weapon-name').textContent.toLowerCase()
            };

            const matchesRarity = filters.rarity === 'all' || cardData.rarity === filters.rarity;
            const matchesSearch = cardData.name.includes(filters.search);

            if (matchesRarity && matchesSearch) {
                card.style.display = 'flex';
                hasVisibleCards = true;
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Reset filters
    function resetFilters() {
        elements.rarityFilter.value = 'all';
        elements.searchInput.value = '';

        filterWeapons();
        elements.searchInput.focus();
    }

    // Expand/collapse weapon cards
    function setupWeaponCards() {
        elements.weaponHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const card = this.closest('.weapon-card');
                const isExpanded = card.classList.contains('expanded');
                
                // Close all other expanded cards first
                document.querySelectorAll('.weapon-card.expanded').forEach(expandedCard => {
                    if (expandedCard !== card) {
                        expandedCard.classList.remove('expanded');
                    }
                });
                
                // Toggle clicked card state
                card.classList.toggle('expanded', !isExpanded);
            });
        });
    }

    // Hover effect for recipe items
    function setupRecipeHoverEffects() {
        document.querySelectorAll('.recipe-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    // Event listeners
    function setupEventListeners() {
        // Filters
        elements.rarityFilter.addEventListener('change', filterWeapons);
        elements.searchInput.addEventListener('input', filterWeapons);
        
        // Reset
        if (elements.resetButton) {
            elements.resetButton.addEventListener('click', resetFilters);
        }
    }

    // Initialize
    function init() {
        setupWeaponsTabs();
        setupWeaponCards();
        setupEventListeners();
        setupRecipeHoverEffects();
        
        resetFilters();
    }

    init();
});