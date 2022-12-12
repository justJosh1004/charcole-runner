import Table from 'react-bootstrap/Table';

import './DashboardStyles.scss';
import { fakeRunners, fakeCoach } from '../FakeData';
import { useEffect, useState } from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { includes, uniq } from 'lodash';

const Dashboard = () => {
  const [runners, setRunners] = useState([]);
  const [searchRunners, setSearchRunners] = useState([]);
  const [firstNameSearch, setFirstNameSearch] = useState('');
  const [lastNameSearch, setLastNameSearch] = useState('');
  const [teamSearch, setTeamSearch] = useState('');
  const [genderSearch, setGenderSearch] = useState('');

  useEffect(() => {
    setRunners(fakeRunners);
    setSearchRunners(fakeRunners);
  }, []);

  useEffect(() => {
    const filteredRunners = [...runners];

    const firstNameFilter = (runner) => includes(runner.firstName.toLowerCase(), firstNameSearch);
    const lastNameFilter = (runner) => includes(runner.lastName.toLowerCase(), lastNameSearch);
    const teamFilter = (runner) => {
      if (!teamSearch) {
        return runner;
      } else {
        return runner.team === teamSearch;
      }
    };
    const genderFilter = (runner) => {
      if (!genderSearch) {
        return runner;
      } else {
        return runner.gender === genderSearch;
      }
    };

    const timer = setTimeout(() => {
      setSearchRunners(
        filteredRunners
          .filter(firstNameFilter)
          .filter(lastNameFilter)
          .filter(teamFilter)
          .filter(genderFilter)
      );

      return () => clearTimeout(timer);
    }, 500);
  }, [firstNameSearch, lastNameSearch, teamSearch, genderSearch]);

  const getTeams = () => {
    return uniq(runners.map((runner) => runner.team));
  };

  const getGenders = () => {
    return uniq(runners.map((runner) => runner.gender));
  };

  const handleClear = () => {
    setSearchRunners(runners);
  };

  return (
    <div id='dashboard' className='dashboard'>
      <div className='header mb-4'>
        <h1>{fakeCoach.name}</h1>
      </div>
      <div className='body'>
        <div className='searchForm mb-4'>
          <Form>
            <div className='searchFields mb-3'>
              <Row>
                <Col md>
                  <FloatingLabel label='First Name' className='mb-3'>
                    <Form.Control
                      placeholder='First Name'
                      value={firstNameSearch}
                      onChange={(event) => setFirstNameSearch(event.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col md>
                  <FloatingLabel label='Last Name' className='mb-3'>
                    <Form.Control
                      placeholder='Last Name'
                      value={lastNameSearch}
                      onChange={(event) => setLastNameSearch(event.target.value)}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FloatingLabel label='Search by Team'>
                    <Form.Select
                      value={teamSearch}
                      onChange={(event) => setTeamSearch(event.target.value)}
                    >
                      <option value=''>Select Team</option>
                      {getTeams().map((team, index) => (
                        <option key={index}>{team}</option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel label='Search by Gender'>
                    <Form.Select
                      value={genderSearch}
                      onChange={(event) => setGenderSearch(event.target.value)}
                    >
                      <option value=''>Select Gender</option>
                      {getGenders().map((gender, index) => (
                        <option key={index}>{gender}</option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              </Row>
            </div>
            <Button type='button' variant='outline-secondary' onClick={handleClear}>
              Clear
            </Button>
          </Form>
        </div>
        <div className='table'>
          <Table striped hover size='lg'>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Team</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {searchRunners.map((runner, index) => (
                <tr key={`${runner.firstName}-${runner.lastName}-${index}`}>
                  <td>{runner.firstName}</td>
                  <td>{runner.lastName}</td>
                  <td>{runner.team}</td>
                  <td>{runner.gender}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
