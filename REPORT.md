# College Login & Security Module

## 1. Title of the Project

College Login & Security Module using Regular Expressions and DFA

## 2. Abstract

The College Login & Security Module is a web-based mini-project developed using HTML, CSS and JavaScript. The purpose of this project is to validate important login-related fields such as Email, Username, Password, Confirm Password and OTP. The project is strongly related to Theory of Computation because the validation rules are written using Regular Expressions, and each Regular Expression defines a Regular Language. These languages can be recognized by Finite Automata. Thus, the project demonstrates the practical use of TOC in authentication and security systems.

## 3. Objective

- To design a secure login validation module for a college portal
- To apply Regular Expressions for input validation
- To connect practical validation rules with TOC concepts
- To explain how DFA can recognize valid strings
- To create a report-friendly project that combines theory and implementation

## 4. Problem Statement

In college portals, user input must be validated before granting access. Invalid email addresses, weak passwords, incorrect usernames and wrong OTP formats can lead to security issues. This project solves that problem by using regular expressions and client-side validation to check inputs in real time. The accepted strings follow specific patterns, which makes them suitable examples of regular languages.

## 5. Input Fields and Regex Used

| Field | Regex | Meaning |
| --- | --- | --- |
| Email | `^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$` | Valid email format |
| Username | `^[A-Za-z]{3,15}$` | Only letters, 3 to 15 length |
| Password | `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$` | Strong password |
| Confirm Password | Compared with password | Must match password |
| OTP | `^\d{6}$` | Exactly six digits |

## 6. TOC Concepts Used

### 6.1 Regular Expression

A Regular Expression is a formal pattern used to describe a set of strings. In this project, each form field has a regex rule. If the user input matches the regex, it is accepted; otherwise it is rejected.

### 6.2 Regular Language

Any language that can be represented by a regular expression is called a regular language. The valid inputs for Email, Username and OTP are examples of regular languages because they can be expressed using regex.

### 6.3 Finite Automata

Finite Automata are abstract machines used to recognize patterns. A Deterministic Finite Automaton reads one input symbol at a time and changes states according to transition rules. If the input ends in an accepting state, the string is valid.

## 7. DFA Explanation for Project Fields

### 7.1 OTP Validation

Regex: `^\d{6}$`

The DFA for OTP reads exactly six digits:

- Start from `q0`
- On each digit move to the next state
- `q6` is the final accepting state
- Any non-digit or extra digit leads to reject state

State flow:

`q0 -> q1 -> q2 -> q3 -> q4 -> q5 -> q6`

### 7.2 Username Validation

Regex: `^[A-Za-z]{3,15}$`

The DFA for Username:

- Accepts only alphabet characters
- Rejects digits and symbols
- Minimum 3 letters needed for acceptance
- Maximum 15 letters allowed

Example flow:

- `q0` start
- `q1` after first letter
- `q2` after second letter
- `q3` becomes first accepting state
- Continue accepting until `q15`
- Any non-letter goes to reject state

### 7.3 Email Validation

Email validation is more complex but still described using a regular expression. It includes local-part, `@` symbol, domain name and extension.

### 7.4 Password Validation

The password rule checks multiple character classes:

- At least one uppercase letter
- At least one lowercase letter
- At least one digit
- At least one special character
- Minimum length of 8

This is implemented with regex lookaheads in JavaScript for practical validation.

## 8. Algorithm

1. Start the program.
2. Accept user input in the form.
3. Check Email against email regex.
4. Check Username against username regex.
5. Check Password against password regex.
6. Check whether Confirm Password matches Password.
7. Check OTP against OTP regex.
8. If all fields are valid, show success message.
9. Otherwise, show error messages for invalid fields.
10. Stop.

## 9. Sample Test Cases

| Field | Input | Result |
| --- | --- | --- |
| Email | `student@college.edu` | Valid |
| Email | `studentcollege.edu` | Invalid |
| Username | `Rahul` | Valid |
| Username | `ra1` | Invalid |
| Password | `Abcd@123` | Valid |
| Password | `abc123` | Invalid |
| OTP | `123456` | Valid |
| OTP | `12a456` | Invalid |

## 10. Output Description

The project provides immediate feedback below each input field. Valid inputs are highlighted positively, while invalid inputs show clear error messages. On successful submission, the system displays a secure login success banner.

## 11. Applications

- College portals
- Student login systems
- Online examination systems
- Password policy enforcement
- OTP-based verification pages

## 12. Advantages

- Easy to implement
- Strong connection with TOC theory
- Good visual demonstration
- Real-time validation improves usability
- Suitable for viva and report explanation

## 13. Limitations

- Client-side validation alone is not enough for real production security
- Complex email rules in the real world may require server-side checks
- Confirm password comparison is logical validation, not pure regex matching

## 14. Conclusion

The College Login & Security Module is an excellent TOC mini-project because it combines theory and practical implementation. The project shows how regular expressions are used in real applications and how they relate to regular languages and finite automata. It is simple to understand, easy to demonstrate and strong enough for scoring high marks.

## 15. Viva Questions and Answers

### Q1. Why is this project related to Theory of Computation?

Because the validation rules are represented using regular expressions, and regular expressions define regular languages that can be recognized by DFA.

### Q2. Why is OTP validation a good DFA example?

Because OTP has a fixed structure of exactly six digits, so the state transitions are simple and easy to draw.

### Q3. Why is Confirm Password not a pure regular expression problem?

Because it requires checking equality with another input value, which is easier to handle using program logic.

### Q4. Which tool can be used to draw DFA?

FSM Simulator such as Noam can be used to draw and test DFA or NFA.

### Q5. Where does the actual project run?

The HTML, CSS and JavaScript project runs in a browser or through VS Code Live Server.

## 16. How to Use External Tools

### FSM Simulator

Use FSM Simulator to:

- Create DFA for OTP
- Create DFA for Username
- Test acceptance and rejection of strings
- Take screenshots for the report

### CFG Tool

CFG Tool is optional and can be used only if grammar demonstration is required. It is not used for running HTML, CSS or JavaScript.

## 17. Suggested Screenshots for Report

1. Project home screen
2. Valid form submission output
3. Invalid input demonstration
4. OTP DFA in FSM Simulator
5. Username DFA in FSM Simulator

## 18. Future Scope

- Add database connectivity
- Add server-side authentication
- Add CAPTCHA verification
- Add mobile number validation
- Add role-based login for students and faculty
