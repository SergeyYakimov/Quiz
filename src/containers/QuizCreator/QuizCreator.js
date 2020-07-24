import React, {Component} from 'react';
import axios from '../../axios/axios-quiz';
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
    const quiz = this.state.quiz.concat()
    const index = this.state.quiz.length + 1

    const {question, option1, option2, option3, option4} = this.state.formControls

    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id}
      ]
    }

    quiz.push(questionItem)

    this.setState({
      quiz,
      rightAnswerId: 1,
      isFormValid: false,
      formControls: createFormControls()
    })
  }

  createQuizHandler = async event => {
    event.preventDefault()

    try {
      await axios.post('quizes.json', this.state.quiz)
      this.setState({
        quiz: [],
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls()
      })
    } catch (e) {
      console.log(e)
    }
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

