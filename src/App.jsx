import React, { createRef, forwardRef, useRef, useState } from 'react';
import { createAssistant, createSmartappDebugger } from '@salutejs/client';
import styled from "styled-components";
import logo100 from './res/logo100-transformed.png';
import './App.css';

let TrueAnswer = 'test';
let question = '';
async function fetchQuestionAndSetState(callback) {
  //this.state = ({backgroundColor: 'linear-gradient(135deg, #000000 2%,#9960b6 69%)'})
  try {
    let response = await fetch('https://4-gk.ru/api/v1/question/random');
    let data = await response.json();
    TrueAnswer = data.question.answer;
    question = data.question.text;
    callback(data.question.text);
  } catch (error) {
    console.error('Error fetching question:', error);
    alert(error);
  }
}

const StyledButtonOutputComponentGreen = styled.button `border:3px solid #18ab29;`;
const StyledButtonOutputComponentRed = styled.button `border:3px solid red;`;

const ButtonOutputComponent = forwardRef(({ onClick, pos_x, pos_y }, ref) => {
  if (pos_x === 0 && pos_y === 0) {
    return (
      <div>
        <StyledButtonOutputComponentRed className="QuestionButton" onClick={onClick} ref={(pos_x === 0 && pos_y === 0) ? ref : null}>Выдай вопрос</StyledButtonOutputComponentRed>
        <output className="output-text">{onClick.outputText}</output>
      </div>
    );
  } else {
    return (
      <div>
        <StyledButtonOutputComponentGreen className="QuestionButton" onClick={onClick} ref={(pos_x === 0 && pos_y === 0) ? ref : null}>Выдай вопрос</StyledButtonOutputComponentGreen>
        <output className="output-text">{onClick.outputText}</output>
      </div>
    );
  }
});

function initializeAssistant(getState, getRecoveryState) {
  if (process.env.NODE_ENV === 'development') {
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? '',
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState,
      nativePanel: {
        defaultText: 'Я Вас слушаю',
        screenshotMode: false,
        tabIndex: -1,
      },
    });
  } else {
    return createAssistant({ getState });
  }
}

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={logo100} alt="Logo" className="logo" />
    </div>
  );
};

const StyledInputGreen = styled.input `border:3px solid #18ab29;`;
const StyledInputRed = styled.input `border:3px solid red;`;

const Input = forwardRef(({ inputValue, handleInputChange, handleKeyPress, pos_x, pos_y}, ref) => {
  if (pos_x === 1 && pos_y === 0) {
    return (
      <div>
        <StyledInputRed
          id="input-text"
          type="text"
          className="input-text"
          placeholder="Введи ответ:"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          ref={pos_x === 1 ? ref : null}
        />
      </div>
    );
  } else {
    return (
      <div>
        <StyledInputGreen
          id="input-text"
          type="text"
          className="input-text"
          placeholder="Введи ответ:"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          ref={pos_x === 1 ? ref : null}
        />
      </div>
    );
  }
}
);
const StyledInfoButtonGreen = styled.button `border:3px solid #18ab29;`;
const StyledInfoButtonRed = styled.button `border:3px solid red;`;

const InfoButton = forwardRef(( { pos_y }, ref ) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  if (pos_y === 1) {
    return (
      <div className='container' onClick={toggleMenu}>
        <StyledInfoButtonRed id="button2" className = "InfoButton" ref={pos_y === 1 ? ref : null}>
      <span>i</span>
      <span class="nfo">NFO</span>
      </StyledInfoButtonRed>
  
      {isMenuOpen && (
          <div className="info-menu">
            <span className="close-button" onClick={closeMenu}>✘</span>
            <p>Help info test</p>
            {/* Add more information here */}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className='container' onClick={toggleMenu}>
        <StyledInfoButtonGreen id="button2" className = "InfoButton" ref={pos_y === 1 ? ref : null}>
      <span>i</span>
      <span class="nfo">NFO</span>
      </StyledInfoButtonGreen>
  
      {isMenuOpen && (
          <div className="info-menu">
            <span className="close-button" onClick={closeMenu}>✘</span>
            <p>Help info test</p>
            {/* Add more information here */}
          </div>
        )}
      </div>
    );
  }
});

const StyledLoseButtonGreen = styled.button `border:3px solid #18ab29;`;
const StyledLoseButtonRed = styled.button `border:3px solid red;`;

const LoseButton = forwardRef(( { pos_x, pos_y, handleLoseClick }, ref ) => {
  if (pos_x === 2 && pos_y === 0) {
    return (
      <div>
      <StyledLoseButtonRed href="#" id="button3" className="LoseButton" ref={(pos_x === 2 && pos_y === 0) ? ref : null}onClick={handleLoseClick}>Сдаться</StyledLoseButtonRed>
    </div>
    );
  } else {
  return (
    <div>
      <StyledLoseButtonGreen href="#" id="button3" className="LoseButton" ref={(pos_x === 2 && pos_y === 0) ? ref : null}onClick={handleLoseClick}>Сдаться</StyledLoseButtonGreen>
    </div>
  );
  }
});

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pos_x : 0,
      pos_y : 0
    }
    this.anyButton = createRef();
    window.addEventListener('keydown', (event) => {
      const new_state = this.state;
      switch(event.code) {
        case 'ArrowDown':
          // вниз
          if (new_state.pos_y > 0) {
            new_state.pos_y -= 1;
          }
          break;
         case 'ArrowUp':
          // вверх
          if (new_state.pos_y < 1) {
            new_state.pos_y += 1;
          }
          break;
         case 'ArrowLeft':
          // влево
          if (new_state.pos_x > 0) {
            new_state.pos_x -= 1;
          }
          break;
         case 'ArrowRight':
          // вправо
          if (new_state.pos_x < 2) {
            new_state.pos_x += 1;
          }
          break;
         case 'Enter':
          // ок
          if (this.anyButton != null && this.anyButton.current != null) {
            this.anyButton.current.focus();
            console.log(this.anyButton);
          }
         break;
      }
      this.setState(new_state);
      console.log(new_state.pos_x);
      console.log(new_state.pos_y);
    });
    console.log('constructor');

    this.state = {
      pos_x: 0,
      pos_y: 0,
      notes: [{ id: Math.random().toString(36).substring(7), title: 'тест' }],
      outputText: '',
      inputValue: '',
      backgroundColor: 'linear-gradient(135deg, #000000 2%,#9960b6 69%)' // Initial gradient
    };

    this.assistant = initializeAssistant(() => this.getStateForAssistant());

    this.assistant.on('data', (event) => {
      console.log('assistant.on(data)', event);
      if (event.type === 'character') {
        console.log(`assistant.on(data): character: "${event?.character?.id}"`);
      } else if (event.type === 'insets') {
        console.log('assistant.on(data): insets');
      } else {
        const { action } = event;
        this.dispatchAssistantAction(action);
      }
    });

    this.assistant.on('start', (event) => {
      let initialData = this.assistant.getInitialData();
      console.log('assistant.on(start)', event, initialData);
    });

    this.assistant.on('command', (event) => {
      console.log('assistant.on(command)', event);
    });

    this.assistant.on('error', (event) => {
      console.log('assistant.on(error)', event);
    });

    this.assistant.on('tts', (event) => {
      console.log('assistant.on(tts)', event);
    });
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  getStateForAssistant() {
    console.log('getStateForAssistant: this.state:', this.state);
    const state = {
      item_selector: {
        items: this.state.notes.map(({ id, title }, index) => ({
          number: index + 1,
          id,
          title,
        })),
        ignored_words: [
          'задать', 'задай', 'выдать', 'выдай', 'сгенерировать', 'сгенерируй', 'напечатать', 'напечатай', 'придумать', 'придумай', 'дать', 'дай', // askQuestion.sc
          'мой ответ', 'ответ', 'правильный ответ' // answer.sc
        ],
      },
    };
    console.log('getStateForAssistant: state:', state);
    return state;
  }

  dispatchAssistantAction(action) {
    console.log('dispatchAssistantAction', action);
    if (action) {
      switch (action.type) {
        case 'add_question':
          return this.add_question(action);

        case 'check_answer':
          return this.check_answer(action);
        
        case 'read_answer':
          return this.read_answer(action);
        
        case 'say_answer':
          return this.say_answer(action);

        default:
          throw new Error();
      }
    }
  }

  add_question(action) {
    console.log('add_question', action);
    
    fetchQuestionAndSetState((text) => {
      this._send_action_value('voice', question);
      this.setState({ 
        outputText: text,
        background: 'linear-gradient(135deg, #000000 2%,#9960b6 69%)' 
      });
      this.setState({backgroundColor: 'linear-gradient(135deg, #000000 2%,#9960b6 69%)'})
    });
    
  }

  say_answer(action){
    this._send_action_value('voiceAns', TrueAnswer);
  }

  async read_answer(action) {
    console.log('read_answer', action);
    const { inputValue } = this.state;
    try {
      const response = await fetch('https://4-gk.ru/api/v1/answer/check', {
        method: 'POST',
        body: JSON.stringify({
          userAnswer: inputValue,
          correctAnswer: TrueAnswer,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.isCorrect) {
          alert('Правильный ответ');
          this.setState({ backgroundColor: 'linear-gradient(to right, #00ff00, #00cc00)' });
        } else {
          alert('Неправильный ответ. Попробуйте еще раз');
          this.setState({ backgroundColor: 'linear-gradient(135deg, #000000 2%,#b42c2c 69%)' }); 
        }
        this.setState({ inputValue: '' });
      } else {
        this.setState({ inputValue: '' });
      }
    } catch (error) {
      this.setState({ inputValue: '' });
    }
  }

  async check_answer(action) {
    console.log('check_answer', action);
    const userAnswer = action.note || this.state.inputValue;
    try {
      const response = await fetch('https://4-gk.ru/api/v1/answer/check', {
        method: 'POST',
        body: JSON.stringify({
          userAnswer: userAnswer,
          correctAnswer: TrueAnswer,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.isCorrect) {
          this.setState({ backgroundColor: 'linear-gradient(135deg, #000000 2%, #11877e 69%)' });
          //const trueAns = ['Вы молодец!', 'Так держать!'];
          //const idxTrue = (Math.random() * trueAns.length) | 0; 
          this._send_action_value('done', 'Вы молодец');
        } else {
          this.setState({ backgroundColor: 'linear-gradient(135deg, #000000 2%,#b42c2c 69%)' });
          //const wrong = ['Попробуйте еще раз', 'Не отчаивайтесь', 'У вас все получится'];
          //const idx = (Math.random() * wrong.length) | 0;
          this._send_action_value('wrongAns', 'Попробуйте еще раз');
        }
        this.setState({ inputValue: '' });
      } else {
        this.setState({ inputValue: '' });
      }
    } catch (error) {
      this.setState({ inputValue: '' });
    }
  }

  add_note(action) {
    console.log('add_note', action);
    this.setState({
      notes: [
        ...this.state.notes,
        {
          id: Math.random().toString(36).substring(7),
          title: action.note,
          completed: false,
        },
      ],
    });
  }

  _send_action_value(action_id, value) {
    const data = {
      action: {
        action_id: action_id,
        parameters: {
          // значение поля parameters может быть любым, но должно соответствовать серверной логике
          value: value, // см.файл src/sc/noteDone.sc смартаппа в Studio Code
        },
      },
    };
    const unsubscribe = this.assistant.sendData(data, (data) => {
      // функция, вызываемая, если на sendData() был отправлен ответ
      const { type, payload } = data;
      console.log('sendData onData:', type, payload);
      unsubscribe();
    });
  }

  play_done_note(id) {
    const completed = this.state.notes.find(({ id }) => id)?.completed;
    if (!completed) {
      const texts = ['Молодец!', 'Красавчик!', 'Супер!'];
      const idx = (Math.random() * texts.length) | 0;
      this._send_action_value('done', texts[idx]);
    }
  }

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.check_answer({ note: this.state.inputValue });
    }
  };
  
  render() {
    console.log('render');
    const { backgroundColor } = this.state;
    const containerStyle = {
      background: backgroundColor,
      height: '100vh',
      padding: '20px',
      transition: 'background 0.5s ease'
    };

    return (
      <div style={containerStyle}>
        <Logo />
        <Input
          pos_x={this.state.pos_x}
          pos_y={this.state.pos_y}
          ref={this.anyButton} 
          inputValue={this.state.inputValue}
          handleInputChange={this.handleInputChange}
          handleKeyPress={this.handleKeyPress}
        />
        <InfoButton
          pos_x={this.state.pos_x}
          pos_y={this.state.pos_y}
          ref={this.anyButton}
        />
        <LoseButton
          pos_x={this.state.pos_x}
          pos_y={this.state.pos_y}
          ref={this.anyButton}
          handleLoseClick = {() => this.say_answer()}
        />
        <ButtonOutputComponent 
        onClick={() => fetchQuestionAndSetState((text) => this.setState({ outputText: text }))}
        pos_x={this.state.pos_x}
        pos_y={this.state.pos_y}
        ref={this.anyButton}
        
        />
        <div className="output-text">{this.state.outputText}</div>
      </div>
    );
  }
}