# juice
Generate random combinations from pre-defined character sets. Use juice to generate dummy data for testing.

![alt text](./juice.jpg "juice")


# Install
`npm install qantra-juice`

# Usage

### Require Juice

```
const Juice = require('qantra-juice');
```

### Define Character Sets

```
const sets = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '1234567890',
  special: '@%+!#$?:~'
}
```
### Define Combinations
reference previously created sets. For example: 'alpha-numberic' combinations is formed by combining the defined sets 'lowercase', 'uppercase' and 'numbers'

```
const combos = {
  'lowercase': ['lowercase'],
  'uppercase': ['uppercase'],
  'numbers': ['numbers'],
  'alpha-numeric': ['lowercase','uppercase','numbers'],
  'complex': ['lowercase','uppercase','numbers','special'],
  'lowercase-alpha-numeric': ['lowercase', 'numbers'],
  'uppercase-alpha-numeric': ['uppercase', 'numbers']
}
```

### Define Models ( Optional )

models are specific shape of output that you want to generate using a defined rules with the help of combinations.

email model:
start with generating 10 characters from the predefined lowercase-alpha-numeric' combination,
end with string '@gmail.com'

egyptian mobile number model:
start with string '0'
then take random from given array of strings ['10','15','11']
end with 8 characters from the predefined 'numbers' combination

**In Models**

* **strings** are added as they are.
* **arrays of strings** a random index will be selected
* **objects** must contain  a combination refernce as key and length as value
```
const models = {
  'email': [
    { 'lowercase-alpha-numeric': 10 }, // start with generating 10 characters from the predefined lowercase-alpha-numeric' combination
    '@gmail.com', //end with string '@gmail.com'
  ],
  'mobile': [
    '0',  //start with string '0'
    ['10','15','11'], //then take random from given array of strings ['10','15','11']
    {'numbers': 8 }, //end with 8 characters from the predefined 'numbers' combination
  ]
}
```

### Create Juice Instance

```
let juice = new Juice( sets, combos, models );
```

### Generate From Combinations
```
// juice.generate( combination name , combination length);

juice.generate('uppercase-alpha-numeric', 20) //39ISJ0830004090S3T03   - using sets ['uppercase', 'numbers']

juice.generate('complex', 20) //4q15@5i54HDqH$d@54K@ - using sets ['lowercase','uppercase','numbers','special']

juice.generate('alpha-numeric', 70) //o1jWa4xV143vDSAKatR91f50I4I61aLV486kD5TALewKV0lfK01S1KkSDKn1lAR11Ya30k - using sets ['lowercase','uppercase','numbers']

juice.generate('lowercase', 10) //gbsimffbiy - using sets ['lowercase']
```

### Generate From Models

```
//juice.model( model name );

juice.model('email'); //z0wp8w2w22@gmail.com - using 10 characters from 'lowercase-alpha-numeric' and adding @gmail.com

juice.model('mobile'); //01545248442 - starting with '0' then getting a random input from array ['10','15','11'] and finally adding 8 characters from the 'numbers' comb

```
