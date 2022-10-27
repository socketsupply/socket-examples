* need a test utility
    - something you can call like `ssc build -r --test .` . This will pass along the `--test` arg to our build script, and there you can compile the tests along with the application code.
    - then to run the program, you call it like `./my-app --test=./tests/my-test.js`
