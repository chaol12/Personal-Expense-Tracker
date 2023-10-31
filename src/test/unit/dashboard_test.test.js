// This is a unit test that takes in the created class (in the file this is just for context, 
// not what we are testing) and tests the displayTotalSpent function. This function is just
// checking whether the user was created and displayed information is a number or not.
import {returnTotalSpent} from './dashboard_test';


test('Shows the correct total spent when input is a number', () => {
  expect(returnTotalSpent(1000, 300, 100, 400)).toBe(300);
});

test('Shows the correct error message when total spent is empty', () => {
  expect(returnTotalSpent(1000, '', 100, 400)).toBe('Error in database. Spent should be an integer.');
});

test('Shows the correct error message when total spent is a string number', () => {
  expect(returnTotalSpent(1000, '10', 100, 400)).toBe('Error in database. Spent should be an integer.');
});