import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import csc from 'country-state-city';
import axios from 'axios';
import Swal from 'sweetalert2';

import MotionDiv from 'common/MotionDiv';
import { BASE_API_URL } from 'utils/constants';

const ThirdStep = props => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const allCountries = csc.getAllCountries()?.map(({ isoCode, name }) => ({
      isoCode,
      name,
    }));
    const [{ isoCode: firstCountry } = {}] = allCountries;
    setCountries(allCountries);
    setSelectedCountry(firstCountry);
    setIsLoading(false);
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const { user } = props;
      const updatedData = {
        country: countries.find(country => country.isoCode === selectedCountry)
          ?.name,
        state:
          states.find(state => state.isoCode === selectedState)?.name || '',
        city: selectedCity,
      };

      await axios.post(`${BASE_API_URL}/register`, {
        ...user,
        ...updatedData,
      });

      Swal.fire('Awesome!', "You're successfully registered!", 'success').then(
        ({ isConfirmed, isDismissed }) => {
          if (isConfirmed || isDismissed) {
            props.resetUser();
            props.history.push('/');
          }
        }
      );
    } catch (error) {
      if (error.response) {
        console.error('Error ', error.response.data);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data,
        });
      }
    }
  };

  useEffect(() => {
    const getStates = () => {
      try {
        const allStates = csc
          .getStatesOfCountry(selectedCountry)
          ?.map(({ isoCode, name }) => ({
            isoCode,
            name,
          }));

        const [{ isoCode: firstState = '' } = {}] = allStates;
        setCities([]);
        setSelectedCity('');
        setStates(allStates);
        setSelectedState(firstState);
      } catch (error) {
        setStates([]);
        setCities([]);
        setSelectedCity('');
      }
    };

    getStates();
  }, [selectedCountry]);

  useEffect(() => {
    const getCities = () => {
      try {
        const allCities = csc
          .getCitiesOfState(selectedCountry, selectedState)
          ?.map(({ name }) => ({
            name,
          }));

        const [{ name: firstCity = '' } = {}] = allCities;
        setCities(allCities);
        setSelectedCity(firstCity);
      } catch (error) {
        setCities([]);
      }
    };

    getCities();
  }, [selectedState, selectedCountry]);

  return (
    <Form className="input-form" onSubmit={handleSubmit}>
      <MotionDiv className="col-md-6 offset-md-3">
        <Form.Group controlId="country">
          {isLoading && (
            <p className="loading">Loading countries. Please wait...</p>
          )}
          <Form.Label>Country</Form.Label>
          <Form.Control
            as="select"
            name="country"
            value={selectedCountry}
            onChange={event => setSelectedCountry(event.target.value)}
          >
            {countries.map(({ isoCode, name }) => (
              <option value={isoCode} key={isoCode}>
                {name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            as="select"
            name="state"
            value={selectedState}
            onChange={event => setSelectedState(event.target.value)}
          >
            {states.length > 0 ? (
              states.map(({ isoCode, name }) => (
                <option value={isoCode} key={isoCode}>
                  {name}
                </option>
              ))
            ) : (
              <option value="" key="">
                No state found
              </option>
            )}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            as="select"
            name="city"
            value={selectedCity}
            onChange={event => setSelectedCity(event.target.value)}
          >
            {cities.length > 0 ? (
              cities.map(({ name }) => (
                <option value={name} key={name}>
                  {name}
                </option>
              ))
            ) : (
              <option value="">No cities found</option>
            )}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </MotionDiv>
    </Form>
  );
};

export default ThirdStep;
