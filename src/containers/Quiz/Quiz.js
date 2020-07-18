import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends Component {
  state = {
    activeQuestion: 0,
    quiz: [
      {
        id: 1,
        question: 'Какой город является столицей Японии?',
        rightAnswerId: 2,
        answers: [
          {text: 'Осака', id: 1},
          {text: 'Токио', id: 2},
          {text: 'Киото', id: 3},
          {text: 'Ниигата', id: 4}
        ]
      },
      {
        id: 2,
        question: 'Какой город является столицей Вьетнама?',
        rightAnswerId: 3,
        answers: [
          {text: 'Хошимин', id: 1},
          {text: 'Нячанг', id: 2},
          {text: 'Ханой', id: 3},
          {text: 'Далат', id: 4}
        ]
      }
    ]
  }

  onAnswerClickHandler = (answerId) => {
    console.log('Answer Id', answerId)
    this.setState({
      activeQuestion: this.state.activeQuestion + 1
    })
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          <ActiveQuiz
            answers={this.state.quiz[this.state.activeQuestion].answers}
            question={this.state.quiz[this.state.activeQuestion].question}
            onAnswerClick={this.onAnswerClickHandler}
            quizLength={this.state.quiz.length}
            questionNumber={this.state.activeQuestion + 1}
          />
        </div>
      </div>
    )
  }
}

export default Quiz
