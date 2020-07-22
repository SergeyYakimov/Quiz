import React, {Component} from 'react';
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

export default class Auth extends Component {
  state = {
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

  loginHandler = () => {

  }

  registerHandler = () => {

  }

  submitHandler = event => {
    event.preventDefault()
  }

  onChangeHandler = (event, name) => {
    console.log(`${name} - ${event.target.value}`)
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
            >
              Войти
            </Button>

            <Button
              type='primary'
              onClick={this.registerHandler}
            >
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    )
  }
}
