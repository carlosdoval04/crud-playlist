document.addEventListener('DOMContentLoaded', function () {
    const itemList = document.getElementById('item-list');
    const chartContainer = document.getElementById('chart-container');

    // Função para renderizar a lista de itens
    function renderItems() {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        itemList.innerHTML = '';

        items.forEach(function (item) {
            const itemCard = createItemCard(item);
            itemList.appendChild(itemCard);
        });

        // Renderizar o gráfico de barras
        renderBarChart(items);
    }

    // Função para criar um cartão de item
    function createItemCard(item) {
        const card = document.createElement('div');
        card.className = 'col s12 m6 l4';
        card.innerHTML = `
            <div class="card">
                <div class="card-content">
                    <span class="card-title">${item.song}</span>
                    <p><strong>Álbum:</strong> ${item.album}</p>
                    <p><strong>Artista:</strong> ${item.artist}</p>
                </div>
            </div>
        `;

        return card;
    }

    // Função para renderizar o gráfico de barras
    function renderBarChart(items) {
        // Criar um objeto para armazenar a contagem de artistas
        const artistCount = {};

        items.forEach(function (item) {
            const artist = item.artist;
            if (artistCount[artist]) {
                artistCount[artist] += 1;
            } else {
                artistCount[artist] = 1;
            }
        });

        const artistNames = Object.keys(artistCount);
        const artistCounts = Object.values(artistCount);

        if (chartContainer) {
            const chartContext = chartContainer.getContext('2d');

            new Chart(chartContext, {
                type: 'bar',
                data: {
                    labels: artistNames,
                    datasets: [
                        {
                            label: 'Contagem de Músicas por Artista',
                            data: artistCounts,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }
    }

    renderItems();
});
