import axios from 'axios';

export default axios.create({
  baseURL: 'https://quiz-87067.firebaseio.com/'
})