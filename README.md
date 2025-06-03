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

## Folder and files naming.

Please note the following important things, to ensure smooth work around.

- Please add your `node_modules` folder and `package-lock.json` files to your `.gitignore` file.
- Please you should not have an index.html file. Everyone should name their html files with the name of the page they are buiding. e.g `signup.html`, `signin.html`, etc.
- Also, anem your javascript files the same way as your html file.

## Assets

- All the assets you will need, are in the [assets](./assets/) folder. As the UI/UX team drops more assets, I will add more there. IF you need any image or icon, please let me know so that i will add the required image/icon.
- The font family used are `Inter`, for all texts and `Poppins` for the headings.
- Add this to the head of your html files before you link the css file:

````html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
  rel="stylesheet"
/>
```
````

Further updates will be made as deemed necessary
