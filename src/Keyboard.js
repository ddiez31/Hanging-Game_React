import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Keyboard.css'

class Keyboard extends Component {
  getWrongAttr = letter => {
    let disabled = ''
    if (this.props.usedLetters.indexOf(letter) > -1) {
      disabled = 'disabled'
    }

    return disabled
  }
  getRightClass = letter => {
    let newClass = 'buttonKeyboard'

    if (this.props.goodLetters.indexOf(letter) > -1) {
      newClass += ' right'
    }
    return newClass
  }

  render() {
    return (
      <div className="keyboard">
        {this.props.letters.map((letter, index) => (
          <button
            disabled={this.getWrongAttr(letter)}
            key={index}
            className={this.getRightClass(letter)}
            onClick={() => this.props.onClick(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
    )
  }
}
Keyboard.propTypes = {
  letters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
}
export default Keyboard
