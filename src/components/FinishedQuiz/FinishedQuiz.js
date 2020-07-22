import React from 'react';
import Button from '../UI/Button/Button';
import classes from './FinishedQuiz.module.css';
import {Link} from 'react-router-dom';

const FinishedQuiz = props => {
  const successCount = Object
                        .values(props.results)
                        .reduce((acc, item) => {
                          return item === 'success' ? acc + 1 : acc
                        }, 0)

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((item, index) => {
          const cls = [
            'fa',
            props.results[item.id] === 'success'
              ? 'fa-check'
              : 'fa-times',
            classes[props.results[item.id]]
          ]

          return (
            <li key={index}>
              <strong>{index + 1}.</strong>&nbsp;
              {item.question}
              <i className={cls.join(' ')}/>
            </li>
          )
        })}
      </ul>
      <p>Правильно {successCount} из {props.quiz.length}</p>
      
      <div>
        <Button onClick={props.onRetry} type={'primary'}>Повторить</Button>
        <Link to='/'>
          <Button onClick={() => {}} type={'success'}>Перейти в список тестов</Button>
        </Link>
      </div>
    </div>
  )
}

export default FinishedQuiz