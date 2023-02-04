import React from 'react';

class MusicCard extends React.Component {
  render() {
    const {
      musicList,
    } = this.props;
    return (
      <div>
        <p>MUSIC CARD</p>
        <div>
          <ul>
            {musicList.map((music, index) => (
              index !== 0 && 
              <li key={ music.trackId }>
                { music.trackName }
                <audio 
                  data-testid="audio-component" 
                  src={music.previewUrl}
                  controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento{" "} <code>audio</code>.
                </audio>
              </li>
              
            ))}
          </ul>

        </div>
      </div>
    );
  }
}

export default MusicCard;
