import React, { useState, useEffect } from 'react';
import { createAssistant, createSmartappDebugger } from '@salutejs/client';
import logo100 from './res/logo100-transformed.png';
import './App.css';

let TrueAnswer = ''
function ButtonOutputComponent() {
  const [outputText, setOutputText] = useState('');

  const handleButtonClick = async () => {
    try {
      let response = await fetch('http://localhost:8080/api/v1/question/random');
      let data = await response.json();
      setOutputText(data.question.text);
      TrueAnswer = data.question.answer;
      //alert(TrueAnswer) 
    } catch (error) {
      console.error('Error fetching question:', error);
      alert(error);
    }
  };

  return (
    <div>
      <button href="#" id="button1" className="QuestionButton" onClick={handleButtonClick}>Выдай вопрос</button>
      <output className="output-text">{outputText}</output>
    </div>
  );
}

const InfoButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className='container' onClick={toggleMenu}>
      <button id="button2" class = "InfoButton">
    <span>i</span>
    <span class="nfo">NFO</span>
    </button>

    {isMenuOpen && (
        <div className="info-menu">
             <h3>Информация по игре</h3>
          <h5>Инструкция по клавишам</h5>
          <ul>
            <li>клавиша "вверх": Инструкция по игре</li>
            <li>клавиша "вправо": Выдать вопрос</li>
            <li>клавиша "влево": Введите ответ</li>
            <li>клавиша "вниз": Сдаться</li>
          </ul>
          <span className="close-button" onClick={closeMenu}>✘</span>
          {/* Add more information here */}
        </div>
      )}
    </div>
  );
};

const LoseButton = () => {
  return (
    <div>
      <button href="#" id="button3" className="LoseButton" onClick={alert('В следующий раз получится')}>Сдаться</button>
    </div>
  );
}

function initializeAssistant(getState /*: any*/, getRecoveryState) {
  if (process.env.NODE_ENV === 'development') {
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? '',
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState,
      // getRecoveryState: getState,                                           
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
     <div class="logo-container">
        <img src={logo100} alt="Logo" class="logo"/>
     </div>
  );
};

const Input = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const sendPostRequest = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/answer/check', {
        method: 'POST',
        body: JSON.stringify( {
          userAnswer: inputValue,
          correctAnswer: TrueAnswer
      } ),
      });
      if (response.ok) {
        const data = await response.json();
        if(data.isCorrect){
          alert("Правильный ответ");
        }
        else{
          alert("Неправильный ответ. Попробуйте еще раз");
        }
        setInputValue(''); 
      } else {
        setInputValue('')
      }
    } catch (error) {
      setInputValue('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendPostRequest();
    }
  };

  return (
    <div>
      <input
        id="input1"
        type="text"
        className="input-text"
        placeholder="Введите ответ:"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

window.addEventListener('DOMContentLoaded', (event) => {
  const buttonElement = document.getElementById('input1');
  const buttonElement2 = document.getElementById('button2');
  // Проверка, существует ли элемент кнопки
  if (buttonElement) {
    // Добавление обработчика события нажатия на кнопку
    buttonElement.addEventListener('click', function() {
        console.log('Кнопка была нажата');
        // Ваша логика обработки нажатия кнопки
    });
  } else {
    console.error('Элемент кнопки не найден');
  }

  window.addEventListener('keydown', (event) => {
    switch(event.code) {
      case 'ArrowDown':
        // вниз
        document.getElementById('button3').click();
        break;
      case 'ArrowUp':
        // вверх
        document.getElementById('button2').click();
        break;
      case 'ArrowLeft':
        // влево
        document.getElementById('button1').click();
        break;
      case 'ArrowRight':
        // вправо
        document.getElementById('input1').focus();
        break;
      case 'Enter':
        // ок
      break;
    }
  });
});

export class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('constructor');

    this.state = {
      notes: [{ id: Math.random().toString(36).substring(7), title: 'тест' }],
    };

    this.assistant = initializeAssistant(() => this.getStateForAssistant());

    this.assistant.on('data', (event /*: any*/) => {
      console.log(`assistant.on(data)`, event);
      if (event.type === 'character') {
        console.log(`assistant.on(data): character: "${event?.character?.id}"`);
      } else if (event.type === 'insets') {
        console.log(`assistant.on(data): insets`);
      } else {
        const { action } = event;
        this.dispatchAssistantAction(action);
      }
    });

    this.assistant.on('start', (event) => {
      let initialData = this.assistant.getInitialData();

      console.log(`assistant.on(start)`, event, initialData);
    });

    this.assistant.on('command', (event) => {
      console.log(`assistant.on(command)`, event);
    });

    this.assistant.on('error', (event) => {
      console.log(`assistant.on(error)`, event);
    });

    this.assistant.on('tts', (event) => {
      console.log(`assistant.on(tts)`, event);
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
          'задать','задай','выдать','выдай','сгенерировать','сгенерируй','напечатать','напечатай','придумать','придумай','дать','дай', // askQuestion.sc
          'мой ответ', 'ответ', 'правильный ответ'  // answer.sc
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
        case 'add_note':
          return this.add_note(action);

        case 'done_note':
          return this.done_note(action);

        case 'delete_note':
          return this.delete_note(action);

        default:
          throw new Error();
      }
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

  done_note(action) {
    console.log('done_note', action);
    this.setState({
      notes: this.state.notes.map((note) =>
        note.id === action.id ? { ...note, completed: !note.completed } : note
      ),
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

  delete_note(action) {
    console.log('delete_note', action);
    this.setState({
      notes: this.state.notes.filter(({ id }) => id !== action.id),
    });
  }

  render() {
    console.log('render');
    return (
      <>
        <Logo></Logo>
        <Input></Input>
        <InfoButton></InfoButton>
        <LoseButton></LoseButton>
        <ButtonOutputComponent></ButtonOutputComponent>
      </>
    );
  }
}
