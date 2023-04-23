import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";
import {Pagination} from 'react-laravel-paginex';
import styled  from 'styled-components';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()

  const PaginationWrapper = styled.div `
    display: flex;
  `
  useEffect(() => {
    getUsers();
  }, [])

  const onDeleteClick = user => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return
    }
    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        setNotification('User was successfully deleted')
        getUsers()
      })
  }

  const getUsers = (data= {}) => {
    const page = data?.page || 1
    setLoading(true)
    axiosClient.get('/users?page=' + page )
    .then((response) => {
          setUsers(response.data.data)
          setPagination({
            current_page: response.data?.meta.current_page,
            last_page: response.data?.meta.last_page,
            total: response.data?.meta.total,
            next_page_url: response.data?.links?.next,
            prev_page_url: response.data?.links?.previous 
          })
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
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
            <PaginationWrapper>
              {users.length > 0 && <Pagination changePage={getUsers} data={pagination} />}
            </PaginationWrapper>
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}