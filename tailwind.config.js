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

        // Custom Colors:
        "selected-subemotion": "hsl(var(--selected-subemotion))",
        "accent-color": "hsl(var(--accent-color))",
        "selected-tag": "hsl(var(--selected-tag))",

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
      // Font Family Extensions:
      fontFamily: {
        primary: ["var(--font-primary)"],
        highlight: ["var(--font-highlight)"],
      },
      // Custom Font Size Extensions:
      fontSize: {
        xs: "0.625rem", // 10px
        sm: "0.75rem", // 12px
        md: "1.25rem", // 20px
        lg: "2.5rem", // 40px
        xl: "3.75rem", // 60px
      },
      // Custom Line Height Extensions:
      lineHeight: {
        16: "1rem", // 16px
        20: "1.25rem", // 20px
        26: "1.625rem", // 26px
        30: "1.875rem", // 30px
      },
      // Custom Spacing Extensions:
      letterSpacing: {
        tight: "-0.022em", // -0.22px
      },

      // Custom Rotate Extension for rotate(-2.065deg) --rotate-on-hover in index.css
      rotate: {
        "-2.065": "-2.065deg",
      },

      transform: {
        "rotate-on-hover": "rotate(-2.065deg)",
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
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      addUtilities(
        {
          /* custom rotation for selected subemotions */
          ".rotate-on-hover": {
            "&:hover": {
              transform: "rotate(-2.065deg)",
              transitionDuration: "0.2s",
            },
          },
          // Add new utilities for the Slider component
          ".slider-track": {
            "&[data-disabled]": {
              opacity: "1",
            },
          },
          ".slider-range": {
            "&[data-disabled]": {
              opacity: "0.5",
            },
          },
          ".slider-thumb": {
            "&[data-disabled]": {
              opacity: "0.5",
            },
          },
        },
        ["responsive", "hover", "focus", "disabled"]
      );
    },
  ],
};
