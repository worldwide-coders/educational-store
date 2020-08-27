import React from 'react'

const WWCButton = ({ clickFunction, buttonLabel, buttonStyle }) => (
  <button type="button" style={buttonStyle} onClick={clickFunction}>{buttonLabel}</button>
)

export default WWCButton
