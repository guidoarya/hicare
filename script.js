import axios from 'axios';

axios.get('http://localhost:5000/api/article-list').then((res) => {
  console.log(res.data);
});
