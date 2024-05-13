import inquirer from "inquirer";

const currencies = [
  { name: 'US Dollar (USD)', rate: 1 },
  { name: 'Euro (EUR)', rate: 0.85 },
  { name: 'Pound Sterling (GBP)', rate: 0.72 },
  { name: 'Japanese Yen (JPY)', rate: 0.0077 },
  { name: 'Pakistani Rupee (PKR)', rate: 0.0054 },
];

const questions = [
  {
    type: 'input',
    name: 'amount',
    message: 'Enter the amount in US Dollars:',
    validate: (value: string) => {
      const valid = !isNaN(Number(value));
      return valid || 'Please enter a valid number.';
    },
  },
  {
    type: 'list',
    name: 'targetCurrency',
    message: 'Choose the target currency:',
    choices: currencies.map((currency) => currency.name),
  },
];

let targetCurrency: {
  name: string;
  rate: number;
};

inquirer.prompt(questions).then((answers: any) => {
  targetCurrency = currencies.find(
    (currency) => currency.name === answers.targetCurrency
  )!;
  
  const usd = parseFloat(answers.amount);
  const convertedAmount = usd * targetCurrency.rate;
  console.log(
    `The amount in ${targetCurrency.name} is: ${convertedAmount.toFixed(2)}`
  );
});
