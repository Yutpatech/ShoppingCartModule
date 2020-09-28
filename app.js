/**/
$( document ).ready(function() {
    vue();
});
/* */

function vue(){
    Vue.mixin({
        data: function() {
          return {
            /* Prodcuts */
            products: [
                {id:0, title: 'Product1', price:10, text: 'Lorem ipsum', stock:15, img:""},
                {id:1, title: 'Product2', price:10.50, text: 'Lorem ipsum2', stock: 10, img:""},
                {id:2, title: 'Product3', price:10, text: 'Lorem ipsum3', stock: 5, img:""}
            ]
          }
        }
    });
    vuecomponents();
    new Vue({
        el: '#app',
        data: {
            cartitems:[]
        },
        methods:{
            isChange(e){
                console.log("Eklendi:",e);
            },
            isDelete(id){
                console.log("Silindi: ",id);
            },
            changepiece(id,piece){
                console.log("değişti:",id,piece);
            },
            done(p){
                this.cartitems=[];
                console.log(p);
            }
        }
    });
}
function vuecomponents(){
    

Vue.component("modal", {
    template: `<div>
    <div class="modal-mask">
    <div class="modal-wrapper">
        <div class="modal-container">
        <div class="modal-header modal-padding" style="border-bottom: solid 1px #dcdcdc;">
            <header style="display: flex;justify-content:space-between">
            <h3>{{title}}</h3>
            <div>
                <button class="modal-default-button" style="background:none;border:none;" @click="$emit('close')">
                X
                </button>
            </div>
            </header>
        </div>
        <div class="modal-body modal-padding">
            <slot name="body">
            default body
            </slot>
        </div>
        <div class="modal-footer modal-padding">
            <slot name="footer">
            default footer
            </slot>
        </div>
        </div>
    </div>
    </div>
</div>`,
props:{
    title:{
        type: String
    }
}
  });
    Vue.component('Shoppingcart', {
      template: `<div class="shopcart">
      <button class="shopcart__button" @click="showModal = true" :style="{background: background, color: color}">
          {{buttontext}}<span v-if="iscount">({{count()}})</span>
      </button>
      <!-- use the modal component, pass in the prop -->
      <modal v-if="showModal" @close="showModal = false" :title="buttontext">
          <div slot="body">
              <ul class="shopcart-drawer__list" v-for="item in cartitems">
                  <li>
                      <span>{{ products[item.id]['title'] }}</span> 
                      <span>Adet: <input type="number" v-model="item.piece" min="1" :max="products[item.id].stock" @change="piecechange(item.id,item.piece)"/></span> 
                      <span>fiyat:{{ products[item.id]['price']*item.piece+ ' '+ currency }}</span>
                  <button @click="deleteItem(item.id)" class="shopbtn" :style="{background: background, color: color}">{{deletetext}}</button>
                  </li>
              </ul>
              <h3 v-if="totalPrice()">{{totaltext +': '+ totalPrice()+' ' }}<span v-if="totalPrice()">{{currency}}</span></h3>
          </div>
          <div slot="footer">
              <button @click="done(totalPrice(),currency)" class="shopbtn" :style="{background: background, color: color}">{{donetext}}</button>
          </div>
      </modal>
  </div>`,
      data(){
          return{
            showModal: false,
          }
      },
      methods: {
        count(){
            return this.cartitems.length;
        },
        totalPrice(){
            let price=0;
            let self = this;
            this.cartitems.forEach(function(item){
                price += self.products.filter(prd => prd.id===item.id)[0].price*item.piece;
            });
            if(price==0){
                return false;
            }else{
                return price;
            }
        },
        deleteItem(id){
            for(let ind=0;this.cartitems.length>ind;ind++){
                if(this.cartitems[ind].id===id){
                    this.cartitems.splice(ind,1);
                }
            }
            this.delitem(id);
        },
      },
      props:{
        cartitems:{
            type: Array
        },
        delitem:{
            type: Function
        },
        piecechange:{
            type: Function
        },
        done:{
            type: Function
        },
        iscount:{
            type: Boolean,
            default: true
        },
        background:{
            type: String
        },
        color:{
            type: String
        },
        currency:{
            type:String
        },
        totaltext:{
            type: String
        },
        buttontext:{
            type: String
        },
        donetext:{
            type: String
        },
        deletetext:{
            type: String
        }
      },
  })
  Vue.component('addtocart', {
    template: ` <div class="addtocart">
    <button class="addcartbutton" @click="addtocart({id:productid,piece:piece})" :style="{background: background, color: color}"><slot></slot></button>
</div>`,
    methods: {
        addtocart(addItem){
            let isItem = this.cartitems.filter(item => item.id===addItem.id);
            if(isItem.length > 0){
                let isProduct = this.products.filter(item => item.id===addItem.id);
                if(isProduct[0].stock>isItem[0].piece){
                    isItem[0].piece+=addItem.piece;
                }else{
                   alert("Max: "+isProduct[0].stock);
                }
            }else{
                let object = { id: addItem.id, piece: addItem.piece };
                this.cartitems.push(object);
            }
            this.addnew(addItem);
      }
    },
    props:{
        addnew:{
            type: Function
        },
      cartitems:{
          type: Array
      },
      productid: {
          type: Number,
          required: true
      },
      piece: {
          typr: Number,
          default: 1
      },
      background:{
        type: String
        },
        color:{
            type: String
        }
    },
    
})
      
    
}
