import React, {Component} from 'react';
import axios from 'axios';
import is from 'is_js';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

export default class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }

    try {
      const response = await axios
        .post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVL8-aCXFPiuddCKs54b_QHQ73NiUIJpw', authData)
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  registerHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }

    try {
      const response = await axios
        .post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBVL8-aCXFPiuddCKs54b_QHQ73NiUIJpw', authData)
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  submitHandler = event => {
    event.preventDefault()
  }

  validateControl(value, validation) {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = !!value.trim() && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.trim().length >= validation.minLength && isValid
    }

    return isValid
  }

  onChangeHandler = (event, name) => {
    const formControls = {...this.state.formControls}
    const control = {...formControls[name]}

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[name] = control

    let isFormValid = true

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      isFormValid,
      formControls
    })
  }

  renderInputs() {
    return Object
            .keys(this.state.formControls)
            .map((controlName, index) => {
              const control = this.state.formControls[controlName]
              return (
                <Input
                  key={controlName + index}
                  type={control.type}
                  value={control.value}
                  label={control.label}
                  valid={control.valid}
                  touched={control.touched}
                  shouldValidate={!!control.validation}
                  errorMessage={control.errorMessage}
                  onChange={event => this.onChangeHandler(event, controlName)}
                />
              )
            })
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            {this.renderInputs()}

            <Button
              type='success'
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Войти
            </Button>

            <Button
              type='primary'
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    )
  }
}
