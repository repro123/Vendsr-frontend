Vendsr Frontend Repository

# Frontend Technologies

This project will be built using:

- HTML5 for structure and semantics
- Tailwind CSS v4.0+ for styling and responsive design
- Vanilla JavaScript for dynamic functionality

No additional frameworks or libraries are required. This approach ensures a lightweight, performant frontend application.

## Getting Started

Ensure you have the latest version of Tailwind CSS installed to properly render the styles.

### Installation Process

We are going to be installing tailwind css via the Tailwind CSS CLI. See the [Tailwind DOCS here for the installation guide](https://tailwindcss.com/docs/installation/tailwind-cli) or follow these steps:

First, create the following directory structure:

```
vendsr-frontend/
├
│   ├── src/
│   │   ├── input.css
│   ├── js/
│   │   └── main.js
│   └── index.html

```

This structure organizes your source files into logical directories:

- `src/`: Contains all source files
- `js/`: For JavaScript files

1. Initialize your project with npm:

   ```bash
   npm init -y
   ```

2. Install Tailwind CSS:

   ```bash
   npm install tailwindcss @tailwindcss/cli
   ```

3. Import tailwind into your main CSS file:

   ```css
   @import "tailwindcss";
   ```

4. Start the tailwind CLI build process:

   ```bash
   npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch

   ```

5. Link the output CSS in your HTML:
   ```html
   <link href="/output.css" rel="stylesheet" />
   ```
