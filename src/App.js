import React, { Component } from 'react';
import Keyboard from './Keyboard.js'
import words from './words.js';
import letters from './letters.js';
import './App.css';

const maxTry = 10

class App extends Component {
  state = {
    nbError: 0,
    letters: letters,
    word: this.getRandomWord(),
    usedLetters: [],
    goodLetters: [],
    hiddenLettersOfWord: [],
  }


  computeDisplay(word, usedLetters) {
    return word.replace(/\w/g,
      (letter) => (usedLetters.has(letter) ? letter : '_')
    )
  }

  componentWillMount() {
    const { word, usedLetters } = this.state
    const hiddenLettersOfWord = this.hiddenLettersOfWord(word, usedLetters)
    this.setState({ hiddenLettersOfWord })
  }

  getRandomWord() {
    const min = 0
    const max = words.length
    return words[Math.floor(Math.random() * (max - min + 1)) + min].split('')
  }

  hiddenLettersOfWord(word, usedLetters) {
    let displayHidden = []
    for (let i = 0; i < word.length; i++) {
      if (usedLetters.indexOf(word[i]) > -1) {
        displayHidden.push(word[i])
      } else {
        displayHidden.push('_')
      }
    }
    return displayHidden
  }

  handleLetterClick = letter => {
    const { word } = this.state
    const usedLetters = [...this.state.usedLetters]
    const goodLetters = [...this.state.goodLetters]
    let nbError = this.state.nbError
    let attempt = word.indexOf(letter)
    usedLetters.push(letter)
    if (attempt === -1) {
      nbError++
    } else {
      goodLetters.push(letter)
      attempt = word.indexOf(letter, attempt + 1)
    }
    const hiddenLettersOfWord = this.hiddenLettersOfWord(word, usedLetters)
    this.setState({ usedLetters, goodLetters, hiddenLettersOfWord, nbError })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Jeu du Pendu</h1>
        </header>
        <div className="word">
          {this.state.hiddenLettersOfWord.map((letter, index) => 
            <span key={index}>{letter}</span>
          )}
        </div>
        <Keyboard
          letters={this.state.letters}
          usedLetters={this.state.usedLetters}
          goodLetters={this.state.goodLetters}
          onClick={this.handleLetterClick}
        />          
      </div>
    );
  }
}

export default App;
