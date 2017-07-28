var person ={
  ho : "pham",
  ten: "khoa",
  chaomung : function () {
    console.log("Chao ban "+this.ho+" "+this.ten);
  }
}
person.chaomung();
console.log(person["ten"]);
