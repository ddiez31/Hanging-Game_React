import React, { Component } from 'react'
import { Button } from 'reactstrap';
import PropTypes from 'prop-types'
import './Keyboard.css'

class Keyboard extends Component {
  getDisabledStatus = letter => {
    let disabled = false
    if (this.props.usedLetters.indexOf(letter) > -1) {
      disabled = true
    }
    return disabled
  }

  getColorStyle = letter => {
    let color = 'secondary'
    if (this.props.goodLetters.indexOf(letter) > -1) {
      color = 'success'
    } else if (!this.props.goodLetters.indexOf(letter) > -1 && this.props.usedLetters.indexOf(letter) > -1) {
      color = 'danger'
    }
    return color
  }

  render() {
    return (
      <div className="keyboard">
        {this.props.letters.map((letter, index) => (
          <Button
            color={this.getColorStyle(letter)}
            disabled={this.getDisabledStatus(letter)}
            key={index}
            onClick={() => this.props.onClick(letter)}>
              {letter}
          </Button>
        ))}
      </div>
    )
  }
}
Keyboard.propTypes = {
  letters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired
}
export default Keyboard
