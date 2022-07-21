export enum OrderStatus {
  /*
    When order has been created,
    but the clothing it is trying to order has not been reserved
   */
  Created = 'created',
  /*
    When clothing trying to be ordered has already been reserved,
    When user has cancelled the order or
    when the order expires before payment
 */
  Cancelled = 'cancelled',
  /*
    The order has successfully reserved the clothing
 */
  Pending = 'pending',
  /*
    When order has reserved the clothing and the user has
    provided payment successfully
  */
  Complete = 'complete',
}
