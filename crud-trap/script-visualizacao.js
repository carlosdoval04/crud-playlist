document.addEventListener('DOMContentLoaded', function () {
    const itemList = document.getElementById('item-list');
    let items = JSON.parse(localStorage.getItem('items')) || [];

    // Função para renderizar a lista de itens
    function renderItems() {
        itemList.innerHTML = '';
        items.forEach(function (item) {
            const li = createItemElement(item);
            itemList.appendChild(li);
        });
    }

    // Função para criar o elemento de item da lista
    function createItemElement(item) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.id = item.id;
        li.innerHTML = `
            <strong>Álbum:</strong> <span class="album">${item.album}</span><br>
            <strong>Nome da Música:</strong> <span class="song">${item.song}</span><br>
            <strong>Artista:</strong> <span class="artist">${item.artist}</span>
            <span class="secondary-content">
                <a class="btn-small waves-effect waves-light green custom-button edit-item">
                    <i class="material-icons">edit</i>
                </a>
                <a class="btn-small waves-effect waves-light red custom-button delete-item">
                    <i class="material-icons">delete</i>
                </a>
            </span>
        `;

        const deleteBtn = li.querySelector('.delete-item');
        deleteBtn.addEventListener('click', function () {
            const itemId = item.id;
            items = items.filter(i => i.id !== itemId);
            saveItemsToLocalStorage();
            renderItems();
        });

        const editBtn = li.querySelector('.edit-item');
        editBtn.addEventListener('click', function () {
            const albumSpan = li.querySelector('.album');
            const songSpan = li.querySelector('.song');
            const artistSpan = li.querySelector('.artist');

            const albumInput = document.createElement('input');
            albumInput.value = item.album;
            albumSpan.innerHTML = '';
            albumSpan.appendChild(albumInput);

            const songInput = document.createElement('input');
            songInput.value = item.song;
            songSpan.innerHTML = '';
            songSpan.appendChild(songInput);

            const artistInput = document.createElement('input');
            artistInput.value = item.artist;
            artistSpan.innerHTML = '';
            artistSpan.appendChild(artistInput);

            editBtn.classList.add('disabled');

            // Adicione um botão de confirmação de edição
            const saveBtn = document.createElement('a');
            saveBtn.className = 'btn-small waves-effect waves-light blue custom-button save-item';
            saveBtn.innerHTML = '<i class="material-icons">check</i>';
            li.querySelector('.secondary-content').appendChild(saveBtn);

            // Adicione um evento de clique para o botão de confirmação
            saveBtn.addEventListener('click', function () {
                item.album = albumInput.value;
                item.song = songInput.value;
                item.artist = artistInput.value;

                saveItemsToLocalStorage();
                renderItems();
            });
        });

        return li;
    }

    // Função para salvar itens no Local Storage
    function saveItemsToLocalStorage() {
        localStorage.setItem('items', JSON.stringify(items));
    }

    // Função para adicionar um novo item
    function addItem(album, song, artist) {
        const newItem = {
            id: Date.now(),
            album: album,
            song: song,
            artist: artist
        };

        items.push(newItem);
        saveItemsToLocalStorage();
        renderItems();
    }

    // Renderizar os itens na página de visualização
    if (itemList) {
        renderItems();
    }
});
