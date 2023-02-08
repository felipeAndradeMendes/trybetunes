import React from 'react';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong, addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  state = {
    favoriteList: [],
    loading: false,
  };

  componentDidMount() {
    this.showFavorites();
  }

  showFavorites = async () => {
    this.setState({
      loading: true,
    }, async () => {
      const favoriteTracks = await getFavoriteSongs();
      // console.log('LISTA DE FAVORITOS', favoriteTracks)
      this.setState({
        favoriteList: [...favoriteTracks],
        loading: false,
      });
    });
  };

  handleChange = ({ target }) => {
    const { id } = target;
    const {
      favoriteList,
    } = this.state;

    const favTrack = favoriteList.find((track) => track.trackId === Number(id));

    if (!target.checked) {
      this.setState({
        loading: true,
      }, async () => {
        await removeSong(favTrack);
        const favoriteTracks = await getFavoriteSongs();
        this.setState({
          loading: false,
          favoriteList: [...favoriteTracks],
        });
      });
    } else {
      this.setState({
        loading: true,
      }, async () => {
        await addSong(favTrack);
        const favoriteTracks = await getFavoriteSongs();
        this.setState({
          loading: false,
          favoriteList: [...favoriteTracks],
        });
      });
    }
  };

  render() {
    const {
      favoriteList,
      loading,
    } = this.state;

    if (loading) return <Loading />;

    return (
      <div data-testid="page-favorites">
        <p className="titleFavorites">FAVORITES</p>
        <MusicCard
          musicList={ favoriteList }
          favoriteList={ favoriteList }
          handleChange={ this.handleChange }
        />
      </div>
    );
  }
}

export default Favorites;
