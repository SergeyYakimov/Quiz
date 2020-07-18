import React from 'react';
import classes from './ActiveQuiz.module.css';
import AnswersList from './AnswersList/AnswersList';

const ActiveQuiz = props => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <span>
        <strong></strong>&nbsp;
      </span>
    </p>

    <AnswersList answers={props.answers}/>

  </div>
)

export default ActiveQuiz
