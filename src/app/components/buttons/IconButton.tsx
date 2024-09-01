
import React from 'react'
import { IIconButton } from '../../interfaces/interfaces'
import { Link } from 'react-router-dom'

const IconButton: React.FC<IIconButton> = ({ styles, clickHandler = null, isLink = false, href = "/", svg }) => {
  if (isLink) {
    return (
      <Link to={href} className={`auc-icon-btn ${styles}`}>
        {
          svg
        }
      </Link>
    )
  }

  return (
    <button
      onClick={clickHandler && clickHandler}
      className={`auc-icon-btn ${styles}`}
    >
      {
        svg
      }
    </button>
  )
}

export default IconButton