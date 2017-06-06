var app = new Vue({
  el: '#app',
  data: {
    items:[],
    search:'',
    username:'',
    password:'',
    token:{id:"",username:""},
    rows:[],
    cart:{
          name:"",
          quantity:"",
          price:0
        },
    total:0
  },
  created: function () {
    var self=this;
    axios.get('http://localhost:3000/items')
    .then(response =>{
      console.log(response.data[0]);
      self.items=response.data

      window.onload = function() {
          var content =[]
          self.items.forEach(item =>{
            console.log(item.name);
            content.push({title:item.name})
          })

          console.log('data------------',content);
          $('.ui.search')
            .search({
              source: content
            })
          ;
      }
    }).
    catch(err =>{
      console.log(err);
    })



 },
 computed: {
    calTotal: function () {
      console.log('total rows-----------',this.rows);
        var total=0;
        this.rows.forEach(row =>{
          console.log('quantity',row.quantity);
          total=total+(row.quantity*row.price)
        })
        console.log(total);
        return total;
    }
  },
  methods: {

    login: function(){
      var self = this;
      console.log(self.username);
      var user_pass={
                  username:self.username,
                  password:self.password
                }

      axios.post('http://localhost:3000/login',user_pass)
      .then(response =>{
        console.log("ressspon-------",response.data);
        self.token.id=response.data.id;
        self.token.name=response.data.name;
        console.log('data token-------',self.token.id);
      })

    },
    searchItem: function(){

      var self = this;
      console.log(self.search);
      axios.get(`http://localhost:3000/items/${self.search}`)
      .then(response =>{
        console.log('searchh response-------',response.data);

      })

    },
    addRow: function(id){
      var self = this;
      axios.post(`http://localhost:3000/items/${id}`)
        .then(response =>{
          console.log('data row-------',response.data._id);
          var is_exist=false;
          self.rows.forEach(row =>{
            if(row.id===id){
              is_exist=true;
              row.quantity=+row.quantity+1;
            }
          })

          if(!is_exist){
            self.rows.push({id:response.data._id,name:response.data.name,quantity:1,price:response.data.price})
            console.log(self.rows);
            self.total=+self.total+(+response.data.price)
            $('.buy')
              .popup({
                popup : $('.custom.popup.buy'),
                inline     : true,
                hoverable  : true,
                position   : 'top center',
                on    : 'click',
                delay: {
                          show: 1000,
                          hide: 0
                        },
                transition:'swing up'
              });
          }


        })
    },
    removeRow: function(index,price){
      console.log(index);
      this.rows.splice(index,1);
      console.log(this.rows);
      this.total=this.total-price;
      console.log(this.total);
    }
  }
})
