# ShoppingCartModule
Vue.js shopping card and add to card button
# Demo
<a href="https://yutpatech.github.io/ShoppingCartModule/">Demo</a>
# Global Variables
```
Products: [
  {id:0, title: 'Product1', price:10, stock:15,}, //other keys optional
  ...
]
```
# New Vue
```
el: '#app',
data: {
    cartitems:[]
},
```
# Props
## Shoppingcard Props
```
cartitems: Null Array,
delitem: item deleted function,
piecechange: piece changed function,
done: Shopping completed function,
iscount: Deafult show count (Boolean)
background: Background color (#ffffff or rgb()) (String),
color:  Text color (#ffffff or rgb()) (String),
currency: €,$,₺... (String),
totaltext: (String),
buttontext: (String),
donetext: Done button text (String),
deletetext: Delete button text (String)
  ```
## Addtocart Props
```
addnew: New item Function,
cartitems: Null Array,
productid: Show/hide productid in addtocard button (Boolean),
piece: How many products will be added? (Number, default:1),
background: Background color (#ffffff or rgb()) (String),
color:  Text color (#ffffff or rgb()) (String),
```
