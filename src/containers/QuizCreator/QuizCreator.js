import React, {Component} from 'react';
import classes from './QuizCreator.module.css';
import Button from '../../components/UI/Button/Button';
import {createControl} from '../../form/FormFramework';
import Input from '../../components/UI/Input/Input';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

function createOptionControl(number) {
  return createControl({
    label: `Введите вариант ${number}`,
    errorMessage: 'Значение не может отсутствовать',
    id: number
  }, {
    required: true
  })
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Вопрос не может быть пустым'
    }, {
      required: true
    }),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  }
}

export default class QuizCreator extends Component {
  state = {
    quiz: [],
    formControls: createFormControls()
  }

  submitHandler = event => {
    event.preventDefault()
  }

  addQuestionHandler = () => {

  }

  createQuizHandler = () => {

  }

  onChangeHandler = (value, controlName) => {

  }

  renderControls() {
    return Object
      .keys(this.state.formControls)
      .map((controlName, index) => {
        const control = this.state.formControls[controlName]
        return (
          <Auxiliary key={controlName + index}>
            <Input
              value={control.value}
              label={control.label}
              valid={control.valid}
              touched={control.touched}
              shouldValidate={!!control.validation}
              errorMessage={control.errorMessage}
              onChange={event => this.onChangeHandler(event.target.value, controlName)}
            />
            {index === 0 ? <hr/> : null}
          </Auxiliary>
        )
      })
  }

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderControls()}
            <select></select>
            <Button
              type='primary'
              onClick={this.addQuestionHandler}
            >
              Добавить вопрос
            </Button>
            <Button
              type='success'
              onClick={this.createQuizHandler}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

