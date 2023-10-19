document.addEventListener('DOMContentLoaded', function() {
    // Inicialize o Materialize
    M.AutoInit();
  
    // Dados da playlist (pode ser uma lista vazia no início)
    let playlist = [];
  
    // Função para adicionar uma música à playlist
    function adicionarMusica() {
      const nomeMusica = document.getElementById('nome-da-musica').value;
      if (nomeMusica) {
        playlist.push(nomeMusica);
        atualizarPlaylist();
        document.getElementById('nome-da-musica').value = ''; // Limpa o campo de entrada
      }
    }
  
    // Função para atualizar a lista de músicas na tela
    function atualizarPlaylist() {
      const playlistContainer = document.getElementById('playlist');
      playlistContainer.innerHTML = ''; // Limpa a lista atual
  
      playlist.forEach((musica, index) => {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.innerHTML = `
          ${musica}
          <a href="#!" class="secondary-content" onclick="removerMusica(${index})">
            <i class="material-icons red-text">delete</i>
          </a>
        `;
        playlistContainer.appendChild(li);
      });
    }
  
    // Função para remover uma música da playlist
    function removerMusica(index) {
      playlist.splice(index, 1);
      atualizarPlaylist();
    }
  
    // Chame a função inicial para exibir a lista vazia no início
    atualizarPlaylist();
  });
  