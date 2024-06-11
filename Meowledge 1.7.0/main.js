document.addEventListener('DOMContentLoaded', function() {
    const factElement = document.getElementById('fact');
    const generateFactBtn = document.getElementById('generateFact');

    generateFactBtn.addEventListener('click', function() {
        fetch("https://cat-fact.herokuapp.com/facts")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch cat facts.');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Log the response data to see its structure
                const facts = data.map(entry => entry.text);
                if (!Array.isArray(facts) || !facts.length) {
                    throw new Error('No cat facts found.');
                }
                const randomFact = facts[Math.floor(Math.random() * facts.length)];
                factElement.textContent = randomFact;
            })
            .catch(error => {
                console.error("Error fetching cat facts:", error);
                factElement.textContent = "Oops! Failed to fetch cat facts.";
            });
    });
});
