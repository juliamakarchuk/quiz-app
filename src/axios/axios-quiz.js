import axios from 'axios';

export default axios.create({
    baseURL: 'https://quiz-77ba1.firebaseio.com/'
})