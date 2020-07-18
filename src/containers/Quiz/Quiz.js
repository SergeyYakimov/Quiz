import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends Component {
  state = {
    quiz: [
      {
        question: 'Какой город является столицей Японии?',
        rightAnswerId: 2,
        answers: [
          {text: 'Осака', id: 1},
          {text: 'Токио', id: 2},
          {text: 'Киото', id: 3},
          {text: 'Ниигата', id: 4}
        ]
      }
    ]
  }

  onAnswerClickHandler = (answerId) => {
    console.log('Answer Id', answerId)
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          <ActiveQuiz
            answers={this.state.quiz[0].answers}
            question={this.state.quiz[0].question}
            onAnswerClick={this.onAnswerClickHandler}
          />
        </div>
      </div>
    )
  }
}

export default Quiz
