document.addEventListener('DOMContentLoaded', () => {
    // FREE AUDIT Button and Modal
    const freeAuditButton = document.querySelector('nav button');
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Request Your Free Audit</h2>
                <form>
                    <div class="mb-4">
                        <label for="name" class="block text-gray-600">Name</label>
                        <input type="text" id="name" class="w-full p-2 border rounded" required>
                    </div>
                    <div class="mb-4">
                        <label for="email" class="block text-gray-600">Email</label>
                        <input type="email" id="email" class="w-full p-2 border rounded" required>
                    </div>
                    <div class="mb-4">
                        <label for="website" class="block text-gray-600">Website URL</label>
                        <input type="url" id="website" class="w-full p-2 border rounded" required>
                    </div>
                    <div class="flex justify-end space-x-2">
                        <button type="button" class="close-modal bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">Cancel</button>
                        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    modal.style.display = 'none';
    document.body.appendChild(modal);

    freeAuditButton.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Audit request submitted! We will contact you soon.');
        modal.style.display = 'none';
        modal.querySelector('form').reset();
    });

    // Accessibility Side Menu
    const accessibilityToggle = document.querySelector('.accessibility-toggle');
    const accessibilityPanel = document.querySelector('.accessibility-panel');

    accessibilityToggle.addEventListener('click', () => {
        accessibilityPanel.classList.toggle('hidden');
    });

    // Accessibility Settings
    document.getElementById('high-contrast').addEventListener('change', (e) => {
        document.body.classList.toggle('high-contrast', e.target.checked);
    });

    document.getElementById('reduced-motion').addEventListener('change', (e) => {
        document.documentElement.style.scrollBehavior = e.target.checked ? 'auto' : 'smooth';
    });

    document.getElementById('color-blind-mode').addEventListener('change', (e) => {
        document.body.className = document.body.className.replace(/\bcolor-blind-\w+\b/, '');
        if (e.target.value !== 'none') {
            document.body.classList.add(`color-blind-${e.target.value}`);
        }
    });

    document.getElementById('text-size').addEventListener('change', (e) => {
        document.body.className = document.body.className.replace(/\btext-size-\w+\b/, '');
        document.body.classList.add(`text-size-${e.target.value}`);
    });

    // Filter Chips
    const filterChips = document.querySelectorAll('.chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active', 'bg-blue-600', 'text-white'));
            chip.classList.add('active', 'bg-blue-600', 'text-white');
            const filter = chip.dataset.filter;
            const cards = document.querySelectorAll('#top-picks .product-card');
            cards.forEach(card => {
                const badge = card.querySelector('.badge').classList;
                card.style.display = filter === 'all' || 
                    (filter === 'free' && badge.contains('free')) || 
                    (filter === 'premium' && badge.contains('premium')) || 
                    (filter === 'client-favorite' && badge.contains('client-favorite')) 
                    ? 'block' : 'none';
            });
        });
    });

    // Template Library Filters
    const applyFiltersButton = document.querySelector('.apply-filters-button');
    applyFiltersButton.addEventListener('click', () => {
        const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(input => input.value);
        const selectedPrices = Array.from(document.querySelectorAll('input[name="price"]:checked')).map(input => input.value);
        const cards = document.querySelectorAll('#templates-library .product-card');
        
        cards.forEach(card => {
            const isFree = card.querySelector('.badge').classList.contains('free');
            const priceMatch = selectedPrices.length === 0 || 
                (selectedPrices.includes('free') && isFree) || 
                (selectedPrices.includes('premium') && !isFree);
            
            // Simulate category matching (since categories aren't in card data, assume all match if none selected)
            const categoryMatch = selectedCategories.length === 0 || true;
            
            card.style.display = priceMatch && categoryMatch ? 'block' : 'none';
        });
    });

    // Search Functionality
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll('#templates-library .product-card');
        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            card.style.display = title.includes(query) ? 'block' : 'none';
        });
    });

    // Code Tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active', 'bg-blue-600', 'text-white'));
            button.classList.add('active', 'bg-blue-600', 'text-white');
            document.querySelectorAll('.code-block').forEach(block => {
                block.style.display = block.dataset.tabContent === button.dataset.tab ? 'block' : 'none';
            });
        });
    });

    // Copy Buttons
    document.querySelectorAll('.copy-button').forEach(button => {
        button.addEventListener('click', () => {
            const code = button.closest('.code-block').querySelector('code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                button.textContent = 'Copied!';
                setTimeout(() => button.textContent = 'Copy', 2000);
            });
        });
    });

    document.querySelector('.copy-all-button').addEventListener('click', () => {
        const activeTab = document.querySelector('.tab-button.active').dataset.tab;
        const code = document.querySelector(`.code-block[data-tab-content="${activeTab}"] code`).textContent;
        navigator.clipboard.writeText(code).then(() => {
            const button = document.querySelector('.copy-all-button');
            button.textContent = 'Copied All!';
            setTimeout(() => button.textContent = 'Copy All', 2000);
        });
    });
});
