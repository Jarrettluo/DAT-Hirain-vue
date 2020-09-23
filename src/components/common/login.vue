<template>
  <div>
    <!-- 登录页面
    {{ msg }}
    {{ book }} -->
    <div style="text-align:center;">
      <img class="card" src="~@/assets/img/card_bg.png" ></img>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      msg: '',
      book: []
    }
  },
  methods: {
  //   getMessage() {
  //     const path = 'http://localhost:5000';
  //     axios
  //       .get(path)
  //       .then(res => {
  //         this.msg = res.data;
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       })
  //   },

  //   getBooks() {
  //     const path = 'http://localhost:5000/books';
  //     axios
  //       .get(path)
  //       .then(
  //         res => {
  //           this.book = res.data.books;
  //         }
  //       )
  //       .catch(error =>{
  //         console.error(error);
  //       })
  //   }

    
  // },
  // created(){
  //   this.getMessage();
  //   this.getBooks();
  }
}
</script>

<style scoped>
  .card {
    margin: 180px 0px;
    width: 800px;
    
  }
</style>
