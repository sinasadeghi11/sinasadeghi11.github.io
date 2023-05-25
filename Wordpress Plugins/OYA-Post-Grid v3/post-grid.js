document.addEventListener('DOMContentLoaded', (event) => {

    let currentFilter = 'all';
    let currentSearch = '';
    const input = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-button');
    const gridItems = document.querySelectorAll('.grid-item');

    // Search function
    input.addEventListener('keyup', function() {
        currentSearch = input.value.toUpperCase();
        updateGrid();
    });

    // Filter function
    filterButtons.forEach((button) => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            updateGrid();
        });
    });

    // Function to update the grid based on current filter and search term
    function updateGrid() {
        for (let i = 0; i < gridItems.length; i++) {
            let h = gridItems[i].getElementsByTagName('h')[0];
            let textValue = h.textContent || h.innerText;
            if ((currentFilter === 'all' || gridItems[i].getAttribute('data-type') === currentFilter) && textValue.toUpperCase().indexOf(currentSearch) > -1) {
                gridItems[i].style.display = "";
            } else {
                gridItems[i].style.display = "none";
            }
        }
        console.log("GRID UPDATED");
    }

    // Initial grid update
    updateGrid();
});
