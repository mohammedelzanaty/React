import React from 'react';
import { navigate } from '@reach/router';
import pf from 'petfinder-client';
import Carousel from './Carousel';

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Details extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    petfinder.pet
      .get({ output: 'full', id: this.props.id })
      .then(data => {
        const pet = data.petfinder.pet;
        let breed;
        breed = Array.isArray(pet.breeds.breed)
          ? pet.breeds.breed.join(', ')
          : pet.breeds.breed;
        this.setState({
          name: pet.name,
          animal: pet.animal,
          breed,
          media: pet.media,
          location: `${pet.contact.city}, ${pet.contact.state}`,
          description: pet.description,
          loading: false
        });
      })
      .catch(() => navigate('/'));
  }
  handleBack() {
    navigate('/');
  }
  render() {
    if (this.state.loading) {
      return (
        <div className="details flex flex-center-vertical flex-center-horizontal">
          <img src="../images/loading.gif" alt="loading" />
        </div>
      );
    }
    const { name, animal, breed, location, media, description } = this.state;
    return (
      <div className="details">
        <Carousel media={media} />
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${location}`}</h2>
        <p>{description}</p>

        <div className="flex flex-center-vertical flex-center-horizontal back-btn">
          <button onClick={this.handleBack}>
            <img src="../images/back.png" alt="back" />
          </button>
        </div>
      </div>
    );
  }
}

export default Details;
