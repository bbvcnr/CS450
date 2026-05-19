# Library Book Borrowing – Unit Tests

## Testing Framework

**Jest** (JavaScript) — configured via `package.json`.

## Requirements Tested

| Requirement | Description |
|---|---|
| Requirement 1 | Active Membership — inactive member cannot borrow |
| Requirement 2 | Book Availability — unavailable book cannot be borrowed |
| Requirement 3 | Maximum Borrowed Books — at most 3 books at a time |
| Requirement 4 | Successful Borrowing — all three conditions must be true |
| Requirement 5 | Result Message — correct message returned for each outcome |

## Test Cases

| Test | Scenario | Expected Result |
|---|---|---|
| Test 1 | Active member, available book, 0 borrowed | `Borrowing allowed` |
| Test 2 | Inactive member, available book, 0 borrowed | `Membership is not active` |
| Test 3 | Active member, unavailable book, 0 borrowed | `Book is not available` |
| Test 4 | Active member, available book, 3 borrowed | `Borrowing limit reached` |
| Test 5 | Active member, available book, 2 borrowed | `Borrowing allowed` |
| Test 6 | Active member, available book, 1 borrowed | `Borrowing allowed` |

## Assumptions

- The `canBorrowBook` function receives a `member` object `{ membershipActive: boolean, borrowedBooksCount: number }` and a `book` object `{ available: boolean }`.
- Conditions are checked in order: membership → availability → borrow limit.
- The function returns a plain string message matching the exact wording from the requirements.
- Business logic is **not yet implemented** — the stub in `src/borrowing.js` is intentionally empty. Tests are expected to fail until the logic is added (TDD approach).

## How to Run

```bash
npm install
npm test
```
