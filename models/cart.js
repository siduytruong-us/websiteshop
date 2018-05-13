module.exports = function Cart(cart) {
  this.items = cart.items || [];

  //// items -> item[0] item[1]

  this.add = function(item, soluong) {

    var addItem = {
      item: item,
      quantity: soluong
    }
    var temp = [];
    temp = this.items.filter(x => x.item.ID === item.ID);
    console.log("temp" + temp);

    if (temp.length == 0)
      this.items.push(addItem);
    else {
      var index = this.items.indexOf(temp[0]);
      this.items[index].quantity = parseInt(this.items[index].quantity) + parseInt(soluong);
    }
  }

  this.totalPrice = function() {
    var total = 0;
    for (var i = 0; i < this.items.length; i++) {
      console.log("price product " + this.items[i].item.price);
      total = total + parseFloat(this.items[i].item.price) * parseFloat(this.items[i].quantity);
    }
    return total;
  }

  this.remove = function(id) {
    var temp = this.items.filter(x => x.item.ID == id);

    var index = this.items.indexOf(temp[0]);
    console.log("remove index :" + index );
    console.log("remove index :" + JSON.stringify(temp[0]) );
    this.items.splice(index,1);

  }


}


//
// this.remove = function(id) {
//     this.totalItems -= this.items[id].quantity;
//     this.totalPrice -= this.items[id].price;
//     delete this.items[id];
// };
//
// this.getItems = function() {
//     var arr = [];
//     for (var id in this.items) {
//         arr.push(this.items[id]);
//     }
//     return arr;
// };
