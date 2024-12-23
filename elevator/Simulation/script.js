document.addEventListener('DOMContentLoaded', () => {
    const populationElement = document.getElementById('Population');
    const maxPopulation = 5;

    function updatePopulation() {
        let currentPopulation = parseInt(populationElement.textContent, 10);

        if (currentPopulation < maxPopulation) {
            populationElement.textContent = currentPopulation + 1;
        }
    }

    document.querySelectorAll('.call-button').forEach(button => {
        button.addEventListener('click', updatePopulation);
    });
});
