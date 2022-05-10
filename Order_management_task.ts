abstract class Notfication {

    notify(message: string, to: string) {
        typeof window !== 'undefined' && window.alert(`${message} ${to}`)
    }
}

interface OrderTypes{
    status: string
    shippingTax: number
    fetcherTax: number
    shipped: string | boolean
    getReceiptData(type: string): string
    printReceipt(): string
}

class Order extends Notfication implements OrderTypes {

    constructor(
            public products: [] | any,
            public user: any,
            public shippingCompany: any,
            public fetcherCompany: any,
            public price: number,
            public fetcherPrice: number
        
        ){ super() }
    
    status = "";
    shippingTax = 0;
    fetcherTax = 0;
    shipped = false;

    changeStatus(newStatus: string, extraTax = false) {
        //base case
        var STATUSES: string[] = ['pending', 'accepted', 'processing', 'delivering', 'receiving', "received", 'rejected', 'canceled', 'returned'];    
        try{
            if (!STATUSES.includes(newStatus)) throw "Can not find the status!! "
        }catch(err){
            console.log(err)
        }
        var mainPrice = this.totalAllOfProductsPrice(this.products);
        var mainFetcherPrice = this.totalAllOfProductsPrice(this.products);
        
        this.status = newStatus;
        this.notify("your order state is : $status", this.user);

        if (extraTax) mainPrice *= this.extraTaxHandler();

        if (newStatus === 'delivering') {
            this.notify('we have Order, we need to delivery it', this.shippingCompany.Name);
            var tax = this.shippingTax + this.shippingCompany.calculate_tax(this.user.address);
            mainPrice += tax + this.shippingCompany.Cost;

            this.notify('we have Order, we need to delivery it', this.fetcherCompany.Name);
            var fetcherTax = this.fetcherTax + this.fetcherCompany.calculate_tax(this.user.address);
            mainFetcherPrice += fetcherTax + this.fetcherCompany.Cost;
        }

        if (newStatus === 'canceled') {
            this.notify('your Order is canceled!!', this.shippingCompany.Name);
            mainPrice = 0;

            this.notify('your Order is canceled!!', this.fetcherCompany.Name);
            mainFetcherPrice = 0;
        }

        if (newStatus === 'returned') {
            this.notify(`your Order is returned with price ${mainPrice} !!`, this.shippingCompany.Name);
            this.notify(`your Order is returned with price ${mainFetcherPrice} !!`, this.fetcherCompany.Name);
        }

        this.price = mainPrice;
        this.fetcherPrice = mainFetcherPrice;

        newStatus == 'received' ? this.shipped = true : false;
    }

    private extraTaxHandler(): number {
        var tax = this.shippingTax * 2;
        tax = tax + (this.price * tax);
        return tax;
    }

    private totalAllOfProductsPrice(products:[] | any): number {
        var totalPrice = 0;
        for (let product of products) {
            totalPrice += product.calculatePrice();
        }
        return totalPrice;
    }

    getReceiptData(type: string) {

        try{
            if (type !== 'json') throw "type must be json formate "
        }catch(err){
            console.log(err)
        }
        var data: {} = {
            "price": this.price,
            "products": this.products,
            "username": this.user.name
        };

        return JSON.stringify(data);
    }

    printReceipt() {
        var receipt: string = '';

        try{
            if (this.status != 'delivering') throw "status must be delivering"
        }catch(err){
            console.log(err)
        }

        receipt += `total price : ${this.price} #|# user name : ${this.user.name}`;

        this.products.forEach((product: {} | any) => {
            receipt += ` #|# product name : ${product.name} category : ${product.category} price : ${product.price}`
            for (var attribute in product.attributes) {
                receipt += ` #|#  ${attribute}`;
            }
        });

        return receipt;
    }
}

interface AddressTypes {
    getCity(): string
    getStreet(): string
    getCountry(): string
    getNearstPoint(): string
    getMap(): string
}

class Address implements AddressTypes{

    constructor(
            public city: string,
            public street: string,
            public country: string,
            public nearstPoint: string,
            public map: string
        ){}

    getCity() {
        return this.city;
    }

    getStreet() {
        return this.street;
    }

    getCountry() {
        return this.country;
    }

    getNearstPoint() {
        return this.nearstPoint;
    }

    getMap() {
        return this.map;
    }
}

class User {
    constructor(public name:string , public address:{} , public age:number , public gender:string , public image:string){}
}

class MainShipping {
    constructor(public Name:string , public Cost:number , public Tax:number ){}

    calculate_tax(address:{} | any): number | any{
        if (this.Name == 'aramex') {
            let listOfAddressWithTaxs: {} | any = {'egypt':this.Tax + .14 , 'kuwait':this.Tax + .1}
            let CurrTax: number = listOfAddressWithTaxs[address.country]
            if(CurrTax) return this.Tax = CurrTax

        } else if (this.Name == 'fedex') {
            let listOfAddressWithTaxs: {} | any = {'egypt':this.Tax + .20 , 'kuwait':this.Tax + .13}
            let CurrTax: number = listOfAddressWithTaxs[address.country]
            if(CurrTax) return this.Tax = CurrTax
        }
    }
}

class Shipping extends MainShipping {}

class Fetcher extends MainShipping {}

interface ProductsTypes {
    getName(): string
    getQuantity(): number
    getCategory(): string
    getAttributes(): {}
    getPrice(): number
    calculatePrice(): number
}

class Products implements ProductsTypes {
    constructor(
            public name:string,
            public quantity:number,
            public category:string,
            public attributes: {} | any,
            public price: number
        ){}

    getName() {
        return this.name;
    }

    getQuantity() {
        return this.quantity;
    }

    getCategory() {
        return this.category;
    }

    getAttributes() {
        return this.attributes;
    }

    getPrice() {
        return this.price;
    }

    calculatePrice() {
        for (var attribute in this.attributes) {
            if (attribute == 'size') {
                let listOfAttributes: {} | any = {'small':this.price -= 10 , 'medium':this.price += 20 , 'large':this.price += 50}
                let CurrAttribute: number = listOfAttributes[this.attributes[attribute]]

                try{
                    if (!CurrAttribute) throw "size must be small or medium or large!!"
                }catch(err){
                    console.log(err)
                }
                return this.price = CurrAttribute;
            }
            else if (attribute == 'color') {
                let listOfAttributes: {} | any = {'white':this.price -= 15 , 'red':this.price += 20 , 'blue':this.price += 18}
                let CurrAttribute: number = listOfAttributes[this.attributes[attribute]]

                try{
                    if (!CurrAttribute) throw "color must be white or red or blue!!"
                }catch(err){
                    console.log(err)
                }
                return this.price = CurrAttribute;
            } else {
                throw new Error("attributes not have size and color!!");
            }
        }
        return this.price;
    }
}

function orderHaveReceipt(){

    let NewAddress = new Address('cairo', 'el tahrir', 'egypt', "metro", "google",);

    let NewShipping = new Shipping('aramex' , 13 , 10);

    let NewFetcher = new Fetcher('fedex' , 13 , 10);

    let NewProduct = new Products('t-shirt', 30, 'men', {'size': 'small','color': 'red'}, 50);
    
    let NewUser = new User('ahmed mohamed' , NewAddress , 25 , "mail" , "img");

    let NewOrder = new Order([NewProduct], NewUser, NewShipping, NewFetcher, NewProduct.price, NewProduct.price);
    
    NewOrder.changeStatus('delivering');
    let printReceipt: string = NewOrder.printReceipt();
    let isPrintReceipt: boolean = 'total price : 50 #|# user name : ahmed mohamed #|# product name : t-shirt category : men price : 60 #|#  size #|#  color' == printReceipt
    if(isPrintReceipt && checkIfWindowFound()){
        window.alert(true)
    }else{
        checkIfWindowFound() && window.alert(false)
    }
}

function checkIfWindowFound(){
    return typeof window !== 'undefined'
}

orderHaveReceipt();

export {
    Order,
    Address,
    Shipping,
    Fetcher,
    User,
    Products
}