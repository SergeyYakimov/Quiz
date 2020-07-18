import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends Component {
  state = {
    activeQuestion: 0,
    answersState: null,
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

  isQuizFinished = () => {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  onAnswerClickHandler = (answerId) => {
    if (this.state.answersState) {
      const key = Object.keys(this.state.answersState)[0]

      if (this.state.answersState[key] === 'success') {
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuestion]

    if (question.rightAnswerId === answerId) {
      this.setState({
        answersState: {[answerId]: 'success'}
      })

      const timeout = setTimeout(() => {

        if (this.isQuizFinished()) {
          console.log('Finished')
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answersState: null
          })
        }

        clearTimeout(timeout)

      }, 1500)
    } else {
        this.setState({
          answersState: {[answerId]: 'error'}
        })
    }
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
            state={this.state.answersState}
          />
        </div>
      </div>
    )
  }
}

export default Quiz
