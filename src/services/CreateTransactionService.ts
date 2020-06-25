import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

// Interface do tipo Request, que corresponde ao objeto passado pela rota para a criação de uma transação;

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  /* A transação só pode ser criada se for do tipo income, ou, se for do tipo outcome, ter um valor menor que o total do balanço.
  Caso isso não ocorra, um erro é lançado. */

  public execute({ title, value, type }: Request): Transaction {
    const balance = this.transactionsRepository.getBalance();
    if (type === 'outcome' && value > balance.total) {
      throw Error('Invalid outcome');
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
