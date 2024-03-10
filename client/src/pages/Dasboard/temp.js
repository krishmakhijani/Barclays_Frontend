import axios from 'axios';

const myFuntion = async () =>{
   const responce = await axios({
        method: 'get',
        url: 'https://barclaysapp.rakikanneeswaran.workers.dev/api/user/mycomplaints',
        data: {
          username: 'sandeep@gmail.com'
        }
      });
      console.log(responce.data);
}

myFuntion();
