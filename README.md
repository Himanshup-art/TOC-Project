# College Login & Security Module

This project is a Theory of Computation mini-project that demonstrates how regular expressions are used for input validation and how those rules correspond to regular languages and DFA design.

## Project Features

- Email validation
- Username validation
- Password strength validation
- Confirm password matching
- OTP validation
- Real-time error messages
- Clean UI for college project demonstration

## Technologies Used

- HTML
- CSS
- JavaScript
- TOC concepts: Regular Expressions, Regular Languages, DFA

## How to Run

1. Open `index.html` in any browser.
2. Enter values in the form fields.
3. Observe real-time validation messages.
4. Submit the form to check whether all fields are valid.

## Validation Regex

- Email: `^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$`
- Username: `^[A-Za-z]{3,15}$`
- Password: `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$`
- OTP: `^\d{6}$`

## Suggested TOC Theory Screenshots

- DFA for OTP validation in FSM Simulator
- DFA for Username validation in FSM Simulator
- Optional grammar explanation using CFG Tool

## Viva Line

`We used regular expressions for validation and mapped them to equivalent DFA to show that the accepted inputs belong to regular languages.`
