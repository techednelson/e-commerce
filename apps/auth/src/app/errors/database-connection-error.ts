import CustomError from './custom-error';

class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Error connecting to database';

  constructor() {
    super('Error connecting to db');
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors = () => [{ message: this.reason }];
}

export default DatabaseConnectionError;
