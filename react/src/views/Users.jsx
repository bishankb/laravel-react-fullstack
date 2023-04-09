import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";
import {Pagination} from 'react-laravel-paginex';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()

  useEffect(() => {
    // getUsers();
  }, [])

  const onDeleteClick = user => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return
    }
    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        setNotification('User was successfully deleted')
        // getUsers()
      })
  }

  // const getUsers = (data) => {
  //     setLoading(true)
  //     // axiosClient.get('/users')
  //     axiosClient.get('/users?page=' + data.page)
  //       .then((response) => {
  //         console.log('data......',response.data)
  //         // return response.data
  //         setLoading(false)
  //         setUsers(response.data.data)
  //         return {...response.data.links,...response.data.meta}
  //       })
  //       .catch(() => {
  //         setLoading(false)
  //       })
  // }
  const getData=(data)=>{
    console.log('data...',data)
    axios.get('/users?page=' + 1).then(response => {
        this.setState({data:data});
    });
}


  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Users</h1>
        <Link className="btn-add" to="/users/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Create Date</th>
            <th>Actions</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" className="text-center">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
              {/* {typeof {users}} */}
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.created_at}</td>
                <td>
                  <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </table>
        <Pagination changePage={getData} data={{users}}/>
      </div>
    </div>
  )
}