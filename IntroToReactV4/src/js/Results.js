import React from 'react';
import pf from 'petfinder-client';

import Pet from './Pet';

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: []
    };
  }

  componentDidMount() {
    petfinder.pet
      .find({ location: 'Seattle, WA', output: 'full' })
      .then(data => {
        let pets;
        pets =
          data.petfinder.pets && data.petfinder.pets.pet
            ? Array.isArray(data.petfinder.pets.pet)
              ? data.petfinder.pets.pet
              : [data.petfinder.pets.pet]
            : [];
        //  setStates takes in an object and does a shallow merge with your current state.
        this.setState({
          pets
        });
      });
  }

  render() {
    return (
      <div className="search">
        {this.state.pets.map(pet => {
          let breed;
          breed = Array.isArray(pet.breeds.breed)
            ? pet.breeds.breed.join(', ')
            : pet.breeds.breed;

          return (
            <Pet
              animal={pet.animal}
              key={pet.id}
              name={pet.name}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
              id={pet.id}
            />
          );
        })}
      </div>
    );
  }
}

export default Results;