import Table from 'react-bootstrap/Table'

import './DashboardStyles.scss'
import { fakeData } from '../FakeData'
import { useEffect, useState } from 'react'


const Dashboard = () => {
  const [runners, setRunners] = useState([])

  useEffect(() => {
    setRunners(fakeData)
  }, [])

  return (
    <div id='dashboard' className="dashboard">
      <div className='header'>
        <h1>
          Joey Zins
        </h1>
      </div>
      <div className="body">
        <div className="table">
          <Table striped  hover size='lg'>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Team</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {runners.map((runner, index) => (
                <tr key={`${runner.first_name}-${runner.last_name}-${index}`}>
                  <td>{runner.first_name}</td>
                  <td>{runner.last_name}</td>
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
}
 
export default Dashboard;