import {
    Order,
    Address,
    Shipping,
    Fetcher,
    User,
    Products
} from "../Order_management_task"

describe("testing for Order block" , () => {

    let NewShipping = new Shipping('aramex' , 13 , 10);
    let NewFetcher = new Fetcher('fedex' , 13 , 10);
    let NewProduct = new Products('t-shirt', 30, 'men', {'size': 'small','color': 'red'}, 50);
    
    let NewAddress = {
        city:'cairo',
        street:'el tahrir',
        country:'egypt'
    }
    
    let NewUser = {
      name:'ahmed mohamed',
      address:NewAddress
    }
    
    let NewOrder = new Order([NewProduct], NewUser, NewShipping, NewFetcher, NewProduct.price, NewProduct.price);
    it("Testing for changeStatus Function outPut" , () => {

        NewOrder.changeStatus('delivering');

        expect(NewOrder).toEqual(
          {
            products: [
              {
                name: 't-shirt',
                quantity: 30,
                category: 'men',
                attributes: { size: 'small', color: 'red' },
                price: 30
              }
            ],
            user: {
              name: 'ahmed mohamed',
              address: { city: 'cairo', street: 'el tahrir', country: 'egypt' }
            },
            shippingCompany: { Name: 'aramex', Cost: 13, Tax: 10.14 },
            fetcherCompany: { Name: 'fedex', Cost: 13, Tax: 10.2 },
            price: 63.14,
            fetcherPrice: 53.2,
            status: 'delivering',
            shippingTax: 0,
            fetcherTax: 0,
            shipped: false
          }
        )
    })

    it("Testing for getReceiptData Function outPut" , () => {

      expect(JSON.parse((NewOrder.getReceiptData("json")))).toEqual(
        {"price":63.14,"products":[{"name":"t-shirt","quantity":30,"category":"men","attributes":{"size":"small","color":"red"},"price":30}],"username":"ahmed mohamed"}
      )
    })

    it("Testing for printReceipt Function outPut" , () => {

      NewOrder.changeStatus('delivering');

      let NewOrderOutPut = "total price : 43.28 #|# user name : ahmed mohamed #|# product name : t-shirt category : men price : 10 #|#  size #|#  color"
      
      expect(NewOrder.printReceipt()).toEqual(NewOrderOutPut)
    })

})

describe("testing for Address block" , () => {
  
  let NewAddress = new Address('cairo', 'el tahrir', 'egypt', "metro", "google",);

  it("Testing for city, street, country, nearstPoint, map variables outPut" , () => {
      expect(NewAddress).toEqual(
        {
            city: 'cairo',
            street: 'el tahrir',
            country: 'egypt',
            nearstPoint: "metro",
            map: "google"
        }
      )
  })
})


describe("testing for User block" , () => {

  let NewAddress = {city:'cairo', street:'el tahrir', country:'egypt'}

  let NewUser = new User('ahmed mohamed' , NewAddress , 25 , "mail" , "img");
  it("Testing for outPut name, address, age, gender, image variables outPut" , () => {

      expect(NewUser).toEqual(
        {
            name: 'ahmed mohamed',
            address: {city:'cairo', street:'el tahrir', country:'egypt'},
            age: 25,
            gender: "mail",
            image: "img"
        }
      )
  })
})

describe("testing for Shipping block" , () => {
    let NewShipping = new Shipping('aramex' , 13 , 10);

    it("Testing for outPut Name, Cost, Tax variables outPut" , () => {

        const Address = {
            city: 'cairo',
            street: 'el tahrir',
            country: 'egypt'
        }

        NewShipping.calculate_tax(Address)
        expect(NewShipping).toEqual({ Name: 'aramex', Cost: 13, Tax: 10.14 })
    })
})

describe("testing for Fetcher block" , () => {
  let NewFetcher = new Fetcher('fedex' , 13 , 10);

  it("Testing for outPut Name, Cost, Tax variables outPut" , () => {

      const Address = {
          city: 'cairo',
          street: 'el tahrir',
          country: 'egypt'
      }

      NewFetcher.calculate_tax(Address)
      expect(NewFetcher).toEqual({ Name: 'fedex', Cost: 13, Tax: 10.2 })
  })
})

describe("testing for Products block" , () => {
    let NewProduct = new Products('t-shirt', 30, 'men', {'size': 'small','color': 'red'}, 50 );
    
  it("Testing for outPut name, address, age, gender, image variables outPut" , () => {

      expect(NewProduct).toEqual(
        {
          name: 't-shirt',
          quantity: 30,
          category: 'men',
          attributes: { size: 'small', color: 'red' },
          price: 50
        }
      )

      NewProduct.calculatePrice()
      
      expect(NewProduct).toEqual(
        {
          name: 't-shirt',
          quantity: 30,
          category: 'men',
          attributes: { size: 'small', color: 'red' },
          price: 40
        }
      )

      expect(NewProduct.getName()).toEqual('t-shirt')
      expect(NewProduct.getQuantity()).toBe(30)
      expect(NewProduct.getCategory()).toEqual("men")
      expect(NewProduct.getAttributes()).toEqual({ size: 'small', color: 'red' })
      expect(NewProduct.getPrice()).toBe(40)
  })
})
