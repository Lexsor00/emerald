document.addEventListener('DOMContentLoaded', function() {
    // Current language (load from localStorage or default to Spanish)
    let currentLanguage = localStorage.getItem('language') || 'es';
    
    // Set initial active language option
    document.querySelector(`.language-option[data-lang="${currentLanguage}"]`).classList.add('active');
    document.querySelector('.language-text').textContent = currentLanguage === 'es' ? 'Español' : 'English';
    
    // Dark/Light mode toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    const themeText = themeToggle.querySelector('.theme-text');
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark-mode');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        themeText.textContent = currentLanguage === 'es' ? 'Modo Claro' : 'Light Mode';
    } else {
        document.documentElement.classList.remove('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        themeText.textContent = currentLanguage === 'es' ? 'Modo Oscuro' : 'Dark Mode';
    }
    
    // Toggle theme
    themeToggle.addEventListener('click', function() {
        const isDark = document.documentElement.classList.toggle('dark-mode');
        if (isDark) {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            themeText.textContent = currentLanguage === 'es' ? 'Modo Claro' : 'Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            themeText.textContent = currentLanguage === 'es' ? 'Modo Oscuro' : 'Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    });

    // Language selector functionality
    const languageOptions = document.querySelectorAll('.language-option');
    const languageText = document.querySelector('.language-text');
    
    // Initialize language on load
    updateLanguage(currentLanguage);
    
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            if (selectedLang !== currentLanguage) {
                // Update current language
                currentLanguage = selectedLang;
                // Save to localStorage
                localStorage.setItem('language', selectedLang);
                // Update active language option
                languageOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                // Update language selector text
                languageText.textContent = selectedLang === 'es' ? 'Español' : 'English';
                // Update all translatable elements
                updateLanguage(selectedLang);
            }
        });
    });

    // Improved function to update all elements to the selected language
    function updateLanguage(lang) {
        // Update page title
        document.title = lang === 'es' 
            ? 'Wiki Oficial • Esmeralda' 
            : 'Oficial Wiki • Emerald';
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Update all elements with data attributes
        document.querySelectorAll('[data-text-es], [data-text-en]').forEach(element => {
            const text = lang === 'es' 
                ? element.getAttribute('data-text-es') 
                : element.getAttribute('data-text-en');
            
            if (!text) return;
            
            // Handle different element types appropriately
            if (element.tagName === 'SPAN' || element.tagName === 'A' || element.tagName === 'DIV' || 
                element.tagName === 'LI' || element.tagName === 'STRONG' || element.tagName === 'H4' ||
                element.tagName === 'H5' || element.tagName === 'H6') {
                element.textContent = text;
            } 
            else if (element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'H3') {
                element.innerHTML = text;
            } 
            else if (element.tagName === 'P' || element.tagName === 'BLOCKQUOTE') {
                // Handle paragraphs and blockquotes with HTML content
                const esText = element.getAttribute('data-text-es');
                const enText = element.getAttribute('data-text-en');
                element.innerHTML = lang === 'es' ? esText : enText;
            }
        });
        
        // Update theme toggle text
        const themeText = document.querySelector('.theme-text');
        if (themeText) {
            themeText.textContent = document.documentElement.classList.contains('dark-mode') 
                ? (lang === 'es' ? 'Modo Claro' : 'Light Mode')
                : (lang === 'es' ? 'Modo Oscuro' : 'Dark Mode');
        }
    }

    // Improved navigation active state with smooth transitions
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Prevent default if it's an anchor with href="#"
            const link = this.querySelector('a');
            if (link.getAttribute('href') === '#') {
                e.preventDefault();
            }
            
            // Remove active class from all items
            navItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // Simulate content loading with better transition
            const targetHref = link.getAttribute('href');
            if (targetHref && targetHref !== '#' && targetHref !== window.location.pathname) {
                const content = document.querySelector('.content');
                content.style.transition = 'opacity 0.3s ease';
                content.style.opacity = '0';
                
                setTimeout(() => {
                    // Here you would typically load the new content via AJAX or similar
                    // For now we'll just fade back in
                    content.style.opacity = '1';
                }, 300);
            }
        });
    });

    // Enhanced hover effects for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        // Add transition for smooth effects
        card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = 'var(--emerald-shadow-md)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
});



