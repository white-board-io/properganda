---
name: Soft Tactile Minimalism
colors:
  surface: '#f7fafb'
  surface-dim: '#d7dadb'
  surface-bright: '#f7fafb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f5'
  surface-container: '#ebeeef'
  surface-container-high: '#e6e9ea'
  surface-container-highest: '#e0e3e4'
  on-surface: '#181c1d'
  on-surface-variant: '#534340'
  inverse-surface: '#2d3132'
  inverse-on-surface: '#eef1f2'
  outline: '#85736f'
  outline-variant: '#d8c2bd'
  surface-tint: '#8b4d41'
  primary: '#8b4d41'
  on-primary: '#ffffff'
  primary-container: '#e89b8c'
  on-primary-container: '#693227'
  inverse-primary: '#ffb4a6'
  secondary: '#55624f'
  on-secondary: '#ffffff'
  secondary-container: '#d6e4cc'
  on-secondary-container: '#596653'
  tertiary: '#855239'
  on-tertiary: '#ffffff'
  tertiary-container: '#e0a083'
  on-tertiary-container: '#633620'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad3'
  primary-fixed-dim: '#ffb4a6'
  on-primary-fixed: '#380d06'
  on-primary-fixed-variant: '#6f372c'
  secondary-fixed: '#d9e7ce'
  secondary-fixed-dim: '#bdcbb3'
  on-secondary-fixed: '#131e0f'
  on-secondary-fixed-variant: '#3e4a38'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#fab799'
  on-tertiary-fixed: '#341101'
  on-tertiary-fixed-variant: '#693b24'
  background: '#f7fafb'
  on-background: '#181c1d'
  surface-variant: '#e0e3e4'
typography:
  display-lg:
    fontFamily: Quicksand
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Quicksand
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  title-sm:
    fontFamily: Quicksand
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 32px
  gutter: 24px
  element-gap: 16px
---

## Brand & Style

This design system establishes a premium, "Soft Tactile Minimalism" aesthetic tailored for a high-end children’s coloring experience. It bridges the gap between the structured precision of modern SaaS/Fintech products and the warmth of physical childhood play.

The brand personality is **composed, nurturing, and sophisticated**. It avoids the over-stimulating neon palettes of traditional children's apps in favor of a serene, "digital heirloom" feel. The UI leverages **Glassmorphism** for utility layers to maintain context, and **Tactile Skeuomorphism** for interactive elements to provide clear affordance and a sense of physical delight. The goal is to evoke a sense of calm focus and creative high-quality craftsmanship.

## Colors

The palette utilizes sophisticated, desaturated pastels that feel grounded and organic.

- **Primary (Dusty Rose):** Used for primary actions and brand moments.
- **Secondary (Sage Green):** Used for success states, natural themes, and secondary navigation.
- **Tertiary (Soft Terracotta):** Used for accents, creative tools, and warm highlights.
- **Neutral (Deep Charcoal):** Reserved for high-legibility text and iconography to maintain professional contrast.
- **Base (Off-White/Bone):** The foundation of the app, providing a warm, paper-like canvas that is easier on the eyes than pure white.

## Typography

The typographic scale balances playfulness with functional clarity. 

**Quicksand** is used for headings and prominent UI labels. Its rounded terminals provide a friendly, accessible entry point for children and parents alike. 

**Inter** is utilized for all interface elements, descriptions, and settings. Its neutral, systematic construction ensures maximum legibility and provides the "SaaS polish" required for complex tool configurations. Use generous line heights to maintain the airy, minimalist feel.

## Layout & Spacing

The design system employs a **fluid grid** with an emphasis on oversized margins and deep "breathable" whitespace. 

- **Layout Model:** 12-column grid for tablet/desktop views; 4-column for mobile.
- **Rhythm:** An 8px linear scale. 
- **Information Density:** Low. Every element must have significant clearance to prevent accidental touches and to maintain the "high-end" gallery aesthetic. 
- **Margins:** Screen edges should maintain a minimum 32px safe area to separate the interface from the device hardware.

## Elevation & Depth

Hierarchy is defined through a combination of physical extrusion and optical transparency.

1.  **Glassmorphism (The Environment):** Floating toolbars and navigation panels use a high-blur (20px-40px) backdrop filter with a 60% opaque white fill and a 1px soft white inner stroke. This keeps the user's artwork visible beneath the tools.
2.  **Tactile Depth (The Interaction):** Interactive components like buttons use "Inner Glows" (white, top-left) and "Drop Shadows" (tinted charcoal, bottom-right) to create a 3D "pill" effect. 
3.  **Soft Shadows:** Use large-radius, low-opacity shadows (Blur: 30px, Opacity: 4-8%) using the primary or neutral color as the shadow tint rather than pure black.

## Shapes

The shape language is dominated by **extreme roundedness**. 

- **Buttons & Chips:** Always fully pill-shaped (circular ends).
- **Cards & Overlays:** Use a minimum of 32px (rounded-xl) to 48px corner radius.
- **Selection Indicators:** Use thick, 4px concentric rings rather than sharp boxes.
- **The "Squish" Factor:** When active or pressed, shapes should visually "depress" by reducing shadow depth and increasing inner glow, mimicking physical soft-touch plastic or silicone.

## Components

### Buttons
Primary buttons are large, pill-shaped, and use the Primary (Dusty Rose) color. They feature a 2px top-left inner highlight to suggest volume. Secondary buttons use a glassmorphic style with a subtle charcoal border.

### Toolbars
Floating toolbars use the glassmorphism effect. Icons inside toolbars should be "chunky" with rounded caps, rendered in Deep Charcoal for high contrast against the blurred background.

### Cards (Artwork Gallery)
Artwork previews are housed in cards with a 32px radius. They should have no visible border, relying on a very soft, tinted ambient shadow to separate them from the off-white background.

### Sliders (Brush Size/Opacity)
Sliders feature an oversized, pill-shaped "thumb" for easy manipulation. The track should be a slightly darker shade of the background (Off-white) with an inset shadow to appear "carved" into the interface.

### Toggles & Controls
Switches should be large and tactile. The "on" state uses the Sage Green to provide a calming "active" confirmation.

### Color Swatches
Swatches are rendered as perfectly circular "wells" with a subtle inner shadow to look like physical paint pots. The active color is indicated by a thick, off-white concentric ring inside the swatch.