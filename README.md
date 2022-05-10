# E2E_task1

## Re-factoring for old task

### My Effort
- writing unit test to cover this code.
- used characterization test
- Restructuring this design , changing names , separate the responsibility.
- Handling the exceptions.
- print the receipt with another formatting like json.
- used the typescript for coding and testing.
- adding the canceled and returned status.
- adding new shipping method called ( fetcher ).

### Structure Of code
- first, Notfication class and add it as abstract becuase i'm not access it's method directly but by extends it.
- OrderTypes as interface to keep all of types Order's properties.

##### Order class
- make and received some properties like products , user , shippingCompany , fetcherCompany , price , fetcherPrice.
- make also some properties like **status** to keep status value , **shippingTax** to keep tax for shipping,
**fetcherTax** to keep tax for shipping fetcher, **shipped** to keep shipped as boolean.
- changeStatus function received newStatus, extraTax and make some checks for newStatus Equal 'delivering' or
newStatus Equal 'canceled' or newStatus Equal 'returned' and based on that price, fetcherPrice will change to new value and if newStatus == 'received' will change the **shipped** to true or false.
- extraTaxHandler function calculate tax and return it.
- totalAllOfProductsPrice function calculate total All Of Products Price and return it.
- getReceiptData function type not Equal 'json' if false will string of object.
- printReceipt function will return receipt data.

AddressTypes as interface to keep all of types Address's properties.

##### Address class
- make and received some properties like city , street , country , nearstPoint , map.
- getCity function to return City.
- getStreet function to return Street.
- getCountry function to return Country.
- getNearstPoint function to return NearstPoint.
- getMap function to return Map.

##### User class
- make and received some properties like name , address , age , gender , image.

##### MainShipping class
- make and received some properties like Name , Cost , Tax.
- calculate_tax function check if Name Equal aramex or fedex and based on that will return Tax Equal CurrTax.

##### Shipping class
- will extends all logic except inputs from MainShipping.

##### Fetcher class
- will extends all logic except inputs from MainShipping.

ProductsTypes as interface to keep all of types Products's properties.

##### Products class
- make and received some properties like name , quantity , category , attributes , price
- getName function to return Name
- getQuantity function to return Quantity
- getCategory function to return Category
- getAttributes function to return Attributes
- getPrice function to return Price
- calculatePrice function will make loop on attributes and do check based on attribute if Equal size or color and saved the new value in CurrAttribute this return price Equal CurrAttribute.

##### orderHaveReceipt function
- this function will make instance for each Address , Shipping , Fetcher , Products , User , Order class and pass for each them values
- check if text input Equal the text generated from our printReceipt function and based on that will do alert true or false

##### exports all classes to test them

### How you can run the code
- first, you need to install all dependencies by run this command (npm i or npm install) then open your terminal or vs code and run this command (npm start)
- to convert Order_management_task.ts to Order_management_task.js to check if all works run this command (npm run into:js)