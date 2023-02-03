import React from 'react';

class Search extends React.Component {
  state = {
    search: '',
    BtnPesquisar: true,
  };

  handleChange = ({ target }) => {
    const { value } = target;
    const { search } = this.state;
    this.setState({
      search: value,
      BtnPesquisar: (search.length < 1),
    });
  };

  render() {
    const { search, BtnPesquisar } = this.state;
    return (
      <div data-testid="page-search">
        SEARCH
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
            value={ search }
          />
          <button
            data-testid="search-artist-button"
            disabled={ BtnPesquisar }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
