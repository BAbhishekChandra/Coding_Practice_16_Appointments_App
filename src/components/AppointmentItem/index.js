// Write your code here

import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onClickChangeStarState} = props
  const {id, title, date, isStarred} = appointmentDetails
  // console.log(id, title, date, isStarred)
  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    onClickChangeStarState(id)
  }

  return (
    <li className="appointment-item-container">
      <div className="first-container">
        <p className="heading">{title}</p>
        <button
          type="button"
          data-testid="star"
          className="star-button"
          onClick={onClickStar}
        >
          <img className="star-image" src={starImage} alt="star" />
        </button>
      </div>
      <p className="date">{`Date: ${formattedDate}`}</p>
    </li>
  )
}

export default AppointmentItem
