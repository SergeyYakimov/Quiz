import React from 'react';
import classes from './ActiveQuiz.module.css';

const ActiveQuiz = props => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <span>
        <strong></strong>&nbsp;
      </span>
    </p>

    <ul>
      <li></li>
    </ul>
  </div>
)

export default ActiveQuiz
