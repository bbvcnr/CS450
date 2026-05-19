const { canBorrowBook } = require('../borrowing');

describe('canBorrowBook', () => {

  // Requirement 1 – Active Membership
  describe('Requirement 1: Active Membership', () => {
    test('inactive member cannot borrow a book', () => {
      const member = { membershipActive: false, borrowedBooksCount: 0 };
      const book = { available: true };
      expect(canBorrowBook(member, book)).toBe('Membership is not active');
    });
  });

  // Requirement 2 – Book Availability
  describe('Requirement 2: Book Availability', () => {
    test('active member cannot borrow an unavailable book', () => {
      const member = { membershipActive: true, borrowedBooksCount: 0 };
      const book = { available: false };
      expect(canBorrowBook(member, book)).toBe('Book is not available');
    });
  });

  // Requirement 3 – Maximum Number of Borrowed Books
  describe('Requirement 3: Maximum Borrowed Books', () => {
    test('member with 3 borrowed books cannot borrow another', () => {
      const member = { membershipActive: true, borrowedBooksCount: 3 };
      const book = { available: true };
      expect(canBorrowBook(member, book)).toBe('Borrowing limit reached');
    });

    test('member with 2 borrowed books can borrow if other conditions are met', () => {
      const member = { membershipActive: true, borrowedBooksCount: 2 };
      const book = { available: true };
      expect(canBorrowBook(member, book)).toBe('Borrowing allowed');
    });

    test('member with 1 borrowed book can borrow if other conditions are met', () => {
      const member = { membershipActive: true, borrowedBooksCount: 1 };
      const book = { available: true };
      expect(canBorrowBook(member, book)).toBe('Borrowing allowed');
    });
  });

  // Requirement 4 – Successful Borrowing
  describe('Requirement 4: Successful Borrowing', () => {
    test('active member, available book, 0 borrowed books — borrowing allowed', () => {
      const member = { membershipActive: true, borrowedBooksCount: 0 };
      const book = { available: true };
      expect(canBorrowBook(member, book)).toBe('Borrowing allowed');
    });
  });

  // Requirement 5 – Borrowing Result Message
  describe('Requirement 5: Borrowing Result Message', () => {
    test('returns "Membership is not active" when membership is inactive', () => {
      const member = { membershipActive: false, borrowedBooksCount: 0 };
      const book = { available: true };
      expect(canBorrowBook(member, book)).toBe('Membership is not active');
    });

    test('returns "Book is not available" when book is not available', () => {
      const member = { membershipActive: true, borrowedBooksCount: 0 };
      const book = { available: false };
      expect(canBorrowBook(member, book)).toBe('Book is not available');
    });

    test('returns "Borrowing limit reached" when member has 3 borrowed books', () => {
      const member = { membershipActive: true, borrowedBooksCount: 3 };
      const book = { available: true };
      expect(canBorrowBook(member, book)).toBe('Borrowing limit reached');
    });

    test('returns "Borrowing allowed" when all conditions are satisfied', () => {
      const member = { membershipActive: true, borrowedBooksCount: 0 };
      const book = { available: true };
      expect(canBorrowBook(member, book)).toBe('Borrowing allowed');
    });
  });

});
