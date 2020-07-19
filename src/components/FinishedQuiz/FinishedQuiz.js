import React from 'react';
import classes from './FinishedQuiz.module.css'

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
              <i className={cls.join(' ')}></i>
            </li>
          )
        })}
      </ul>
      <p>Правильно {successCount} из {props.quiz.length}</p>
      
      <div>
        <button onClick={props.onRetry}>Повторить</button>
      </div>
    </div>
  )
}

export default FinishedQuiz