# Apna Sawaad - Production React + Vite Application

Welcome to **Apna Sawaad**, a modern e-commerce website for authentic Indian sweets, built with React, Vite, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ✨ Features

### 🛒 Enhanced Cart System
- **Persistent Cart** - Cart data saved to localStorage
- **Mini Cart Dropdown** - Quick access from header
- **Quantity Management** - Easy increment/decrement controls
- **Real-time Calculations** - Automatic totals and counts
- **Wishlist** - Save favorite products

### 🍬 Product Catalog
- **20 Indian Sweets** - Traditional to premium varieties
- **Category Filtering** - Filter by Traditional, Premium, Festive, Regional, Specialty
- **Smart Search** - Search by name, flavor, or description
- **Sorting Options** - Sort by name or price
- **Product Details** - Hover to see flavor information

### 📱 Responsive Design
- Mobile-first approach
- Touch-optimized interactions
- Hamburger menu for mobile
- Responsive cart views (table on desktop, cards on mobile)

### 🎨 Beautiful UI
- Custom Tailwind theme with Indian-inspired colors
- Smooth animations and transitions
- Traditional pattern backgrounds
- Glassmorphism effects
- Hover interactions

## 📦 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form validation
- **Context API** - State management
- **LocalStorage** - Data persistence

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.jsx      # Navigation with cart
│   ├── Footer.jsx      # Footer with newsletter
│   └── ProductCard.jsx # Product display card
├── context/
│   └── CartContext.jsx # Global cart state
├── data/
│   └── products.js     # Product data (20 items)
├── pages/              # Route pages
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── Cart.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Login.jsx
│   └── Signup.jsx
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 🎯 Available Routes

- `/` - Home page with carousel and featured products
- `/products` - Product catalog with filters
- `/cart` - Shopping cart page
- `/about` - About the company
- `/contact` - Contact form
- `/login` - User login
- `/signup` - User registration

## 🛠️ Development

### Prerequisites
- Node.js 16+ and npm

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Access at: `http://localhost:5173/`

### Build for Production
```bash
npm run build
```
Output in `dist/` folder

### Preview Production Build
```bash
npm run preview
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
colors: {
  'peach-100': '#FFF3E0',
  'indigo-900': '#1A237E',
  'indigo-100': '#C5CAE9',
  'gold-500': '#FFD700',
}
```

### Products
Add or modify products in `src/data/products.js`

### Images
Add product images to `public/items/` folder

## 📝 Product Data Format

```javascript
{
  id: 1,
  name: "Gulab Jamun",
  price: 150,
  image: "/items/gulab_jamun.jpg",
  description: "Soft, spongy milk-solid balls...",
  flavor: "Sweet, syrupy, soft",
  category: "Traditional"
}
```

## 🌟 Key Components

### CartContext
Provides global state for:
- Cart items
- Wishlist
- Recently viewed products
- Add/remove/update operations

### Header
- Responsive navigation
- Search functionality
- Mini cart dropdown
- Mobile menu

### ProductCard
- Image with hover effects
- Wishlist toggle
- Add to cart button
- Click to track views

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Connect Git repository to Vercel
```

### Netlify
```bash
npm run build
# Drag and drop dist/ folder
```

### GitHub Pages
Update `vite.config.js`:
```javascript
export default {
  base: '/your-repo-name/',
  // ...
}
```

## 📧 Contact

- **Email**: amaanullah2607@gmail.com
- **Instagram**: [@_.amanullah](https://www.instagram.com/_.amanullah/)
- **GitHub**: [@amaan-exe](https://github.com/amaan-exe)
- **Twitter**: [@amanullah_2607](https://x.com/amanullah_2607)

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Built with love by Md Amanullah
- Inspired by traditional Indian sweets shops
- Special thanks to the open-source community

---

**Made with ❤️ for sweet lovers everywhere!**
