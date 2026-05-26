update public.exercises
set starter_code = replace(starter_code, '\n', chr(10))
where starter_code like '%\n%';

update public.exercises
set problem_statement = 'Add a short Python comment above the print statement. The program should print I am learning Python.',
    starter_code = 'print("I am learning Python")',
    expected_output = 'I am learning Python',
    hints = array[
      'Add a new line above the print statement.',
      'Start the comment with #.',
      'The print statement should stay in the program so output appears.'
    ]
where title = 'Comment and Print';
