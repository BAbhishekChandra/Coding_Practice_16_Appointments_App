// Write your code here

import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'
import './index.css'

// console.log(uuidv4)

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    isStarred: false,
    appointmentsList: [],
    isFilterActive: false,
  }

  onSubmitAppointmentsForm = event => {
    event.preventDefault()
    const {title, date, isStarred} = this.state
    // console.log(title)
    // console.log(date)
    const newAppointment = {id: uuidv4(), title, date, isStarred}
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
      isStarred: false,
    }))
  }

  onChangeTitleInput = event => {
    this.setState({title: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({date: event.target.value})
  }

  onClickChangeFilterActiveStatus = () => {
    const {isFilterActive} = this.state
    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  getStarredFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    }
    return appointmentsList
  }

  onClickChangeStarState = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  render() {
    const {title, date, isFilterActive} = this.state
    const starredFilterClassName = isFilterActive
      ? 'starred-filter-filled'
      : 'starred-filter-empty'
    const FilteredAppointmentsList = this.getStarredFilteredAppointmentsList()

    return (
      <div className="app-container">
        <div className="appointments-container">
          <div className="top-container">
            <form onSubmit={this.onSubmitAppointmentsForm}>
              <h1 className="add-appointment-heading">Add Appointment</h1>
              <label className="title-label" htmlFor="title-input-id">
                TITLE
              </label>
              <input
                type="text"
                className="title-input"
                id="title-input-id"
                placeholder="Title"
                value={title}
                onChange={this.onChangeTitleInput}
              />
              <label className="date-label" htmlFor="date-input-id">
                DATE
              </label>
              <input
                type="date"
                className="date-input"
                id="date-input-id"
                placeholder="dd/mm/yyyy"
                value={date}
                onChange={this.onChangeDateInput}
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              className="appointments-image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>

          <hr className="horizontal-line" />

          <div className="bottom-appointments-container">
            <h2 className="appointments-heading">Appointments</h2>
            <button
              className={starredFilterClassName}
              type="button"
              onClick={this.onClickChangeFilterActiveStatus}
            >
              Starred
            </button>
          </div>

          <ul className="appointment-items-container">
            {FilteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                onClickChangeStarState={this.onClickChangeStarState}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
