import React from 'react';
import pf, { ANIMALS } from 'petfinder-client';
import { navigate } from '@reach/router';

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Search extends React.Component {
  state = {
    location: 'Seattle, WA',
    animal: '',
    breed: '',
    breeds: []
  };
  handleLocationChange = event => {
    this.setState({
      location: event.target.value
    });
  };

  handleAnimalChange = event => {
    this.setState(
      {
        animal: event.target.value,
        breed: ''
      },
      this.getBreeds()
    );
  };

  getBreeds() {
    if (this.state.animal) {
      petfinder.breed
        .list({ animal: this.state.animal })
        .then(data => {
          this.setState({
            breeds:
              data.petfinder &&
              data.petfinder.breeds &&
              Array.isArray(data.petfinder.breeds.breed)
                ? data.petfinder.breeds.breed
                : []
          });
        })
        .catch(() => {
          navigate('/');
        });
    } else {
      this.setState({
        breeds: []
      });
    }
  }

  handleBreedChange = event => {
    this.setState({
      breed: event.target.value
    });
  };
  render() {
    return (
      <div className="search-params">
        <label htmlFor="lcoation">
          Location
          <input
            onChange={this.handleLocationChange}
            id="location"
            value={this.state.location}
            placeholder="Location"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={this.state.animal}
            onChange={this.handleAnimalChange}
            onBlur={this.handleAnimalChange}
          >
            <option />
            {ANIMALS.map(animal => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <div className="breed-container">
          <label htmlFor="breed">
            Breeds
            <select
              disabled={!this.state.breeds.length}
              id="breed"
              value={this.state.breed}
              onChange={this.handleBreedChange}
              onBlur={this.handleBreedChange}
            >
              <option />
              {this.state.breeds.map(breed => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button>Submit</button>
      </div>
    );
  }
}

export default Search;
