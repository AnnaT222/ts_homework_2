const WrongDataException = require("./exceptions/WrongDataException");

interface Customer {
  updateBalance(amount: number): void;
}

interface CustomerRepository {
  get(customerId: number): Customer | null;
}
class MortgageApplicationQueueProcessor {
  customerRepository: CustomerRepository;

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  static MESSAGE_INVALID_CUSTOMER: string = "Customer not found!";

  checkWrongData(customer: Customer | null) {
    if (!customer)
      throw new WrongDataException(
        MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER
      );
  }

  processRequest(customerId: number, amountRequested: number): void {
    this.updateBalance(customerId, amountRequested);
  }
  updateBalance(customerId: number, amountRequested: number): void {
    const customer = this.getCustomer(customerId);
    customer?.updateBalance(amountRequested);
  }
  getCustomer(customerId: number): Customer | null {
    const customer = this.customerRepository.get(customerId);
    this.checkWrongData(customer);
    return customer;
  }
}

module.exports = MortgageApplicationQueueProcessor;
