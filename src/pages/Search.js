import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import AlbumCard from '../components/AlbumCard';

class Search extends React.Component {
  state = {
    search: '',
    BtnPesquisar: true,
    loading: false,
    albuns: [],
    searchSaved: '',
  };

  handleChange = ({ target }) => {
    const { value } = target;
    const { search } = this.state;
    this.setState({
      search: value,
      BtnPesquisar: (search.length < 1),
    });
  };

  handleClick = async () => {
    const { search } = this.state;

    const foundAlbuns = await searchAlbumsAPI(search);

    const albunsMaped = foundAlbuns.map((album) => album);

    this.setState({
      search: '',
      loading: true,
      searchSaved: search,
    }, () => this.setState({
      loading: false,
      albuns: albunsMaped,
      BtnPesquisar: true,
    }));

    // console.log('ALBUNS', albunsMaped);
  };

  render() {
    const {
      search,
      BtnPesquisar,
      loading,
      searchSaved,
      albuns,
    } = this.state;

    if (loading) return <Loading />;

    return (
      <div data-testid="page-search">
        <p className="titleSearch">SEARCH</p>
        <form className="formSearch">
          <input
            className="inputSearch"
            type="text"
            data-testid="search-artist-input"
            placeholder="Album ou artista"
            onChange={ this.handleChange }
            value={ search }
          />
          <button
            data-testid="search-artist-button"
            disabled={ BtnPesquisar }
            type="button"
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>

        <div className="albunsSearchContainer">
          <h2>
            {`Resultado de álbuns de: ${searchSaved}`}
          </h2>

          {albuns.length === 0 ? (
            <h1>
              Nenhum álbum foi encontrado
            </h1>
          ) : (
            <div className="albunsContainer">
              {albuns.map((album) => (
                <AlbumCard
                  key={ album.collectionId }
                  albumImg={ album.artworkUrl100 }
                  albumTitle={ album.collectionName }
                  artistName={ album.artistName }
                  collectionId={ album.collectionId }
                />
              ))}
            </div>
          )}

        </div>
      </div>
    );
  }
}

export default Search;
