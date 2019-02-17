import React from 'react';

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };
  // http://bit.ly/2QTagNT
  static getDerivedStateFromProps({ media }) {
    let photos;
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo['@size'] === 'pn');
    }
    return { photos };
  }

  handleIndexClick = event => {
    this.setState({
      active: event.target.dataset.index
    });
  };
  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active].value} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            <button
              key={photo.value}
              className="carousel-smaller-handler"
              onClick={this.handleIndexClick}
            >
              <img
                src={photo.value}
                data-index={index}
                className={index === active ? 'active' : ''}
                alt="animal thumbnail"
              />
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
