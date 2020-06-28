import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: RequestDTO): Transaction {
    if (type === 'outcome') {
      if (this.transactionsRepository.getBalance().total < value) {
        throw new Error(
          'The outcome value of this operation has exceeded the income values',
        );
      }
    }

    if (!(type === 'income' || 'outcome')) {
      throw new Error('Invalid input type');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
