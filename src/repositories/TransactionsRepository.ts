import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getIncome(): number {
    return this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((result, item) => result + item.value, 0);
  }

  public getOutcome(): number {
    return this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((result, item) => result + item.value, 0);
  }

  public getBalance(): Balance {
    const income = this.getIncome();
    const outcome = this.getOutcome();

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
