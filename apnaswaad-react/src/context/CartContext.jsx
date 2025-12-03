import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('apnaswaad_cart');
        return saved ? JSON.parse(saved) : [];
    });

    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem('apnaswaad_wishlist');
        return saved ? JSON.parse(saved) : [];
    });

    const [recentlyViewed, setRecentlyViewed] = useState(() => {
        const saved = localStorage.getItem('apnaswaad_recently_viewed');
        return saved ? JSON.parse(saved) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('apnaswaad_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Save wishlist to localStorage
    useEffect(() => {
        localStorage.setItem('apnaswaad_wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    // Save recently viewed to localStorage
    useEffect(() => {
        localStorage.setItem('apnaswaad_recently_viewed', JSON.stringify(recentlyViewed));
    }, [recentlyViewed]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) {
            removeFromCart(id);
            return;
        }
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const toggleWishlist = (id) => {
        setWishlist((prev) =>
            prev.includes(id) ? prev.filter((wid) => wid !== id) : [...prev, id]
        );
    };

    const viewProduct = (id) => {
        setRecentlyViewed((prev) => {
            const newViewed = [id, ...prev.filter((wid) => wid !== id)].slice(0, 4);
            return newViewed;
        });
    };

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const value = {
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        recentlyViewed,
        viewProduct,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
