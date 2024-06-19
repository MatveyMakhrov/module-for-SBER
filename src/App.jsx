import React, { createRef, forwardRef, useRef, useState } from 'react';
import { createAssistant, createSmartappDebugger, CharacterId } from '@salutejs/client';
import styled from "styled-components";
import logo100 from './res/logo100-transformed.png';
import { createGlobalStyle } from 'styled-components';
import { SpatialNavigation, useSpatialNavigation } from '@salutejs/spatial';


import { salutejs_eva__dark, salutejs_joy__dark, salutejs_sber__dark} from '@salutejs/plasma-tokens/themes';
import './App.css';
import {
    text,
    background,
    gradient
    
} from '@salutejs/plasma-tokens';
import { Button, TextField, Container, Sheet, Body1} from '@salutejs/plasma-ui'
import { IconDownload, IconPlusCircle, IconInfoCircleFill, IconInfo, IconCrossCircle } from '@salutejs/plasma-icons';


const ThemeBackgroundEva = createGlobalStyle(salutejs_eva__dark);
const ThemeBackgroundSber = createGlobalStyle(salutejs_sber__dark);
const ThemeBackgroundJoy = createGlobalStyle(salutejs_joy__dark);



const DocumentStyle = createGlobalStyle`
    html {
        color: ${text};
        background-color: ${background};
        background-image: ${gradient};
    }
`;
const ThemeStyle = createGlobalStyle(salutejs_sber__dark);



let character = '';
let TrueAnswer = 'test';
let question = '';
async function fetchQuestionAndSetState(callback) {
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

const ButtonOutputComponent = forwardRef(({ onClick, pos_y }, ref) => {
  if (pos_y === 2) {
    return (
      <div className='saluteQuestionButton'>
        <Button outlined focused contentLeft={<IconPlusCircle />}  onClick={onClick}  ref={(pos_y === 2) ? ref : null } text="Выдай вопрос"></Button>
        <output className="output-text">{onClick.outputText}</output>
      </div>
    );
  }
  else{
    return (
        <div className='saluteQuestionButton'>
          <Button contentLeft={<IconPlusCircle />} onClick={onClick}  ref={(pos_y === 2) ? ref : null} text="Выдай вопрос"></Button>
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

const Input = forwardRef(({ inputValue, handleInputChange, handleKeyPress, pos_y, disabled, onFocus}, ref) => {
  if (pos_y === 1) {
    return (
      <div className='saluteInput'>
        <TextField $isFocused
          id="input-text"
          type="text"
          placeholder="Введи ответ:"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          ref={pos_y === 1 ? ref : null}
          onFocus={onFocus}
          onClick={onFocus}
        />
      </div>
    );
  } else {
    return (
      <div className='saluteInput'>
        <TextField 
          id="input-text"
          type="text"
          placeholder="Введи ответ:"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          ref={pos_y === 1 ? ref : null}
          onFocus={onFocus}
          onClick={onFocus}
          disabled
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

  if (pos_y === 3) {
    return (
      <div onClick={toggleMenu} className='container'>
        <Button focused pin = 'circle-circle' className='saluteInfoButton' contentLeft={<IconInfo />} id="button2" ref={pos_y === 3 ? ref : null} outlined = {true}>
      </Button>
      {isMenuOpen && (
           <Sheet isOpen = {isMenuOpen}>
            <Body1>
            <h3>Инструкция</h3>
            <p>Вас приветствует тренировка ЧГК.</p>
            <p>У меня есть следующие действия:</p>
            <p>1. Выдать вопрос можно, нажав на кнопку "Выдай вопрос", или словами: "выдай вопрос", "придумай задачу".</p>
            <p>2. Проверить ответ можно нажав на поле ввода "Введи ответ", написать текст и отправить его на кнопку "ОК", или словами: "Мой ответ".</p>
            <p>3. Если вы не знаете ответ, то можно нажать на кнопку "Сдаться", и выведется правильный ответ.</p>
            <h3>Желаю удачи!</h3>
            <h4>Чтобы закрыть инструкцию, необходимо нажать "ОК"</h4>
            </Body1>
           </Sheet>
        )}
      
      </div>
    );
  } 
  else {
    return (
      <div className='container' onClick={toggleMenu}>
        <Button pin = 'circle-circle' className='saluteInfoButton' contentLeft={<IconInfo />} id="button2" ref={pos_y === 4 ? ref : null} outlined = {false}></Button>
  
        {isMenuOpen && (
           <Sheet isOpen = {isMenuOpen}>
            <Body1>
            <h3>Инструкция</h3>
            <p>Вас приветствует тренировка ЧГК.</p>
            <p>У меня есть следующие действия:</p>
            <p>1. Выдать вопрос можно, нажав на кнопку "Выдай вопрос", или словами: "выдай вопрос", "придумай задачу".</p>
            <p>2. Проверить ответ можно нажав на поле ввода "Введи ответ", написать текст и отправить его на кнопку "ОК", или словами: "Мой ответ".</p>
            <p>3. Если вы не знаете ответ, то можно нажать на кнопку "Сдаться", и выведется правильный ответ.</p>
            <h3>Желаю удачи!</h3>
            <h4>Чтобы закрыть инструкцию, необходимо нажать "ОК"</h4>
            </Body1>
           </Sheet>
        )}
      </div>
    );
  }
});

const StyledLoseButtonGreen = styled.button `border:3px solid #18ab29;`;
const StyledLoseButtonRed = styled.button `border:3px solid red;`;

const LoseButton = forwardRef(( { pos_y, handleLoseClick }, ref ) => {
  if (pos_y === 0) {
    return (
      <div className="saluteLoseButton">
      <Button contentRight = {<IconCrossCircle/>} focused href="#" id="button3"  ref={(pos_y === 0) ? ref : null}onClick={handleLoseClick} text = 'Сдаться'></Button>
    </div>
    );
  } else {
  return (
    <div className="saluteLoseButton">
      <Button contentRight = {<IconCrossCircle/>} href="#" id="button3"  ref={(pos_y === 0) ? ref : null}onClick={handleLoseClick} text = 'Сдаться'></Button>
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
          if (new_state.pos_y < 3) {
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
        character = event?.character?.id
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
          this._send_action_value('done', 'Вы молодец');
        } else {
          this.setState({ backgroundColor: 'linear-gradient(135deg, #000000 2%,#b42c2c 69%)' });
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

  _send_action_value(action_id, value) {
    const data = {
      action: {
        action_id: action_id,
        parameters: {
          value: value,
        },
      },
    };
    const unsubscribe = this.assistant.sendData(data, (data) => {
      const { type, payload } = data;
      console.log('sendData onData:', type, payload);
      unsubscribe();
    });
  }

   handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });

  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if(this.state.inputValue  != ''){
        this.check_answer({ note: this.state.inputValue });
      }
      else{
        this.anyButton.current.blur();
      }
      
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
      <div>
        <DocumentStyle />
        <ThemeBackgroundSber />
        <Logo />
        <Input
          pos_x={this.state.pos_x}
          pos_y={this.state.pos_y}
          ref={this.anyButton} 
          inputValue={this.state.inputValue}
          handleInputChange={this.handleInputChange}
          handleKeyPress={this.handleKeyPress}
          disabled={this.state.pos_x !== 1 || this.state.pos_y !== 0} 
        />
        <InfoButton
          pos_x={this.state.pos_x}
          pos_y={this.state.pos_y}
          ref={this.anyButton}
          onClick={() => {
            this.anyButton.current.blur();
          }}
        
        />
        <LoseButton
          pos_x={this.state.pos_x}
          pos_y={this.state.pos_y}
          ref={this.anyButton}
          handleLoseClick={() => {
            this.say_answer();
            this.anyButton.current.blur(); 
          }}
        />
        <ButtonOutputComponent 
          onClick={() => {
            fetchQuestionAndSetState((text) => this.setState({ outputText: text }));
            this.anyButton.current.blur(); 
          }}
          pos_x={this.state.pos_x}
          pos_y={this.state.pos_y}
          ref={this.anyButton}
          onFocus={() => this.setState({ pos_x: 1, pos_y: 0 })}
        />
        <div className="output-text">{this.state.outputText}</div>
      </div>     
    );
  }
}