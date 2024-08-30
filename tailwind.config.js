/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // to use this, add class="dark" to the corresponding html tag
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "", // optinal: add a prefix to all classes; e.g. "tw-" will result in "tw-bg-primary"
  theme: {
    // to define our design system (colors, spacing, etc.)
    // tailwindcss default values:
    container: {
      // the class .container comes from tailwindcss
      center: true, // centers the container
      padding: "2rem",
      screens: {
        // breakpoints for the container (for different screen sizes)
        "2xl": "1400px", // max-width: 1400px (for screens 2xl (ca. 1536 px) and up)
      },
    },
    // Extensions:
    // extend the tailwindcss default values:
    extend: {
      colors: {
        border: "hsl(var(--border))",
        // the key "border" has the value-placeholder of the css variable "--border". The concrete value is in index.css;

        //! If we change the name of the variable in the index.css file, we have to change the key here as well!

        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Color for specific purposes Extensions:

        // shadcn/ui purposes: primary, secondary, destructive, muted, accent, popover, card
        // DEFAULT: main color if nothing is specified
        // foreground: color for text and icons

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        /* custom test */
        customtest: {
          DEFAULT: "hsl(var(--customtest))",
          foreground: "hsl(var(--customtest-foreground))",
        },
      },
      // Border Radius Extensions:
      borderRadius: {
        lg: "var(--radius)", //"--radius" in index.css
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Keyframes for animations Extensions:
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  // Plugins (to add third party plugins to tailwindcss)
  plugins: [require("tailwindcss-animate")],
};
