# Rice Cooker

## Instructions for starting the project

### Prerequisites

Make sure you have maven, java and kotlin installed

### Kotlin Coding Conventions

The source code for this project is written in accordance with the Kotlin Coding Conventions.
Kotlin is the programming language used in this project. Kotlin coding conventions ensure the consistency and readability of the code.

[Kotlin Coding Conventions](https://kotlinlang.org/docs/coding-conventions.html)

### Steps to get started

1. **Clone the project:**

   ```bash
   git clone https://github.com/hei-school/cc-d2-my-rice-cooker-micael-jerry.git
   cd cc-d2-my-rice-cooker-micael-jerry
   git checkout feature/kotlin

2. **Installing the various dependencies required for typescript to function properly**

   ```bash
   mvn install

3. **Run the project :**

   ```bash
   kotlinc -d out/ -cp src/ src/**/*.kt
   cd out
   kotlin MainKt.class

4. **Code verification with ktlint**

    ```bash
    ktlint

5. **If you want to format the code**

    ```bash
    npm run prettify
