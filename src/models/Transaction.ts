import { uuid } from 'uuidv4';

// Responsável por estruturar uma transação e dizer quais são os dados contidos em um objeto do tipo Transaction

class Transaction {
  id: string;

  title: string;

  value: number;

  type: 'income' | 'outcome';

  // Usando a classe Omit no construtor, é possível explicitar um dado que não precisa ser passado como parâmetro no construtor, como é o caso do ID
  constructor({ title, value, type }: Omit<Transaction, 'id'>) {
    this.id = uuid();
    this.title = title;
    this.value = value;
    this.type = type;
  }
}

export default Transaction;
