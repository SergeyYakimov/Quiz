import React, {Component} from 'react';
import classes from './QuizCreator.module.css';
import Button from '../../components/UI/Button/Button';
import {createControl, validate, validateForm} from '../../form/FormFramework';
import Input from '../../components/UI/Input/Input';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Select from '../../components/UI/Select/Select';

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
    rightAnswerId: 1,
    isFormValid: false,
    formControls: createFormControls()
  }

  submitHandler = event => {
    event.preventDefault()
  }

  addQuestionHandler = event => {
    event.preventDefault()
  }

  createQuizHandler = () => {

  }

  onChangeHandler = (value, name) => {
    const formControls = {...this.state.formControls}
    const control = {...formControls[name]}

    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)

    formControls[name] = control

    this.setState({
      isFormValid: validateForm(formControls),
      formControls
    })
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

  selectChangeHandler = event => {
    this.setState({
      rightAnswerId: +event.target.value
    })
  }

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderControls()}
            <Select
              label={'Выберите правильный ответ'}
              value={this.state.rightAnswerId}
              onChange={this.selectChangeHandler}
              options={[
                {
                  value: 1,
                  text: 1
                },
                {
                  value: 2,
                  text: 2
                },
                {
                  value: 3,
                  text: 3
                },
                {
                  value: 4,
                  text: 4
                }
              ]}
            />
            <Button
              type='primary'
              disabled={!this.state.isFormValid}
              onClick={this.addQuestionHandler}
            >
              Добавить вопрос
            </Button>
            <Button
              type='success'
              disabled={!this.state.quiz.length}
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

