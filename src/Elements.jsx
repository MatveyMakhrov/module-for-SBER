import React, { useState, createRef, forwardRef, useRef,  useEffect } from "react";
import styled, { keyframes } from 'styled-components';
import { Button, Container, Row, Col, TextField} from "@salutejs/plasma-ui";
import { headline2 } from '@salutejs/plasma-tokens';
import { useSpatnavInitialization, useSection } from '@salutejs/spatial';
import { gradientDevice } from '@salutejs/plasma-tokens';
import { fetchQuestionAndSetState } from "./App";
import { IconDownload, IconPlusCircle, IconInfoCircleFill, IconInfo, IconCrossCircle } from '@salutejs/plasma-icons';

const gradientAnimation1 = keyframes`
    0% {
        background-position: 0% 100%;
    }
    50% {
        background-position: 60% 60%;
    }
    100% {
        background-position: 0% 100%;
    }
`;

const Input = ({ inputValue, handleInputChange, handleKeyPress }) => {
    return (
      <div className="saluteInput">
        <TextField $isFocused
          type="text"
          placeholder="Введите ответ:"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
      </div>
    );
  };

  const ButtonOutputComponent = ({ onClick }) => {
    return (
        <div className='saluteQuestionButton'>
            <Button outlined contentLeft={<IconPlusCircle />} onClick={() => {
                fetchQuestionAndSetState((text) => onClick({ outputText: text }));
            }} text="Выдай вопрос"></Button>
            <output className="output-text">{onClick.outputText}</output>
        </div>
    );
};

const gradientAnimation2 = keyframes`
    0% {
        background-position: 30% 30%;
    }

    50% {
        background-position: 0% 50%;
    }

    100% {
        background-position: 30% 30%;
    }
`;

const AppStyled = styled.div`
    text-align: center;
`;

const StyledPreview = styled.div`
    height: 100%;
    padding: 2rem 0;

    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
`;

const ScoreBoardContainer = styled.div`
    //display: flex;
    //flex-direction: column;
    //justify-content: center;
    //align-items: center;
    //height: 100%;
`;

const ScoreBoard = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;

    @media (min-width: 1200px) {
        margin: 2rem 0;
    }
`;

const TeamName = styled.div`
    ${headline2}
    margin: 0 1rem;

    @media (min-width: 1200px) {
        font-size: 3rem;
        line-height: 1; 
    }
`;

const ScoreDigit = styled.div`
    ${headline2}
    display: flex;
    justify-content: center;
    align-items: center;
    //width: 10rem;
    height: 6rem;
    width: 100%;
    background: ${({ gradient }) => gradient};
    background-size: 200% 200%;
    animation: ${({ animation }) => animation} 10s ease infinite; // Apply the animation
    border-radius: 12px;
    font-size: 5rem;

    @media (min-width: 1200px) {
        //width: 14rem;
        height: 8rem;
        font-size: 7rem;
    }
`;

const ButtonRow = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    //margin: 0.5rem 0;
    width: 100%;
    margin: 0.5rem 0 15rem 0;

    button {
        flex: 1;
        min-width: 0; // Чтобы кнопки могли сжиматься при уменьшении ширины экрана
    }

    @media (max-width: 600px) {
        gap: 0.25rem; // Уменьшить расстояние между кнопками на маленьких экранах
    }

    @media (min-width: 1200px) {
        gap: 1rem;
    }
`;

const Elements = ({ homeScore, guestScore, homeTeamName, guestTeamName, manualChangeScore }) => {
    useSpatnavInitialization();
    const [sectionProps] = useSection('buttonSection');

    const updateScore = (team, change) => {
        if (team === 'home') {
            manualChangeScore("scoreUpdate", "home", change);
        } else {
            manualChangeScore("scoreUpdate", "guest", change);
        }
    };

    return (
        <AppStyled>
            <StyledPreview>
                <Container {...sectionProps}>
                    <Row>
                        <Col sizeS={2} sizeM={3} sizeL={4} sizeXL={6}>
                            <TeamName>{homeTeamName}</TeamName>
                        </Col>
                        <Col sizeS={2} sizeM={3} sizeL={4} sizeXL={6}>
                            <TeamName>{guestTeamName}</TeamName>
                        </Col>
                        <Col sizeS={2} sizeM={3} sizeL={4} sizeXL={6}>
                            <ScoreBoardContainer>
                                <ScoreBoard>
                                    <ScoreDigit gradient={gradientDevice} animation={gradientAnimation1}>{homeScore}</ScoreDigit>
                                </ScoreBoard>
                            </ScoreBoardContainer>
                           
                            <Button
                                className="sn-section-item"
                                tabIndex={-1}
                                style={{ width: '100%' }}
                            >
                                + 1
                            </Button>
                            <Button
                                className="sn-section-item"
                                tabIndex={-1}
                            >
                            -1
                            </Button>
                            <TextField/>
                            <Input/>
                            <ButtonOutputComponent/>
                        </Col>
                        
                    </Row>
                </Container>
            </StyledPreview>
        </AppStyled>
    );
};

export default Elements;