import React from 'react';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {

  state = {
    artistName: '',
    albumName: '',
    musicList: [],  
  }

  getMusicsFunc = async () => {
    const {
      match: {
        params: {
          id,
        },
      },
    } = this.props;

    const musicList = await getMusics(id);
    
    this.setState({
      artistName: musicList[0].artistName,
      albumName: musicList[0].collectionName,
      musicList: musicList,
    });
    console.log(musicList[1])
  }

  componentDidMount() {
    this.getMusicsFunc()
  }

  render() {
    const {
      artistName,
      albumName,
      musicList,
    } = this.state;
    
    return (
      <div data-testid="page-album">
        <p>ALBUM</p>
        <h3 data-testid="artist-name">
          { artistName }
        </h3> 
        <h1 data-testid="album-name">
          { albumName }
        </h1>
        <MusicCard 
          musicList={ musicList }
        />
      </div>
    );
  }
}

export default Album;
