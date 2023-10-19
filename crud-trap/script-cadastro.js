document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('item-form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const album = document.getElementById('album').value;
        const song = document.getElementById('song').value;
        const artist = document.getElementById('artist').value;

        // Recupera a lista atual de músicas do armazenamento local
        const items = JSON.parse(localStorage.getItem('items')) || [];

        // Adiciona o novo item com um ID único baseado na data e hora
        const newItem = {
            id: Date.now(),
            album: album,
            song: song,
            artist: artist
        };

        items.push(newItem);

        // Atualiza a lista no armazenamento local
        localStorage.setItem('items', JSON.stringify(items));

        // Redireciona para a página de visualização
        window.location.href = 'visualizacao.html';
    });
});
