import type { Category, Product, ProductVariant, ProductImage, Review, User } from "../types/schema";

export const categories: Category[] = [
    { category_id: 1, name: "Textiles", parent_category: null },
    { category_id: 2, name: "Home Decor", parent_category: null },
    { category_id: 3, name: "Pottery", parent_category: 2 },
    { category_id: 4, name: "Bamboo Craft", parent_category: 2 },
];

// Mock users for reviews
export const users: User[] = [
    { user_id: 1, username: "Fatima Rahman", email: "fatima@example.com", password_hash: "", first_name: "Fatima", last_name: "Rahman", role: "customer" },
    { user_id: 2, username: "Karim Ahmed", email: "karim@example.com", password_hash: "", first_name: "Karim", last_name: "Ahmed", role: "customer" },
    { user_id: 3, username: "Nusrat Jahan", email: "nusrat@example.com", password_hash: "", first_name: "Nusrat", last_name: "Jahan", role: "customer" },
    { user_id: 4, username: "Rahim Khan", email: "rahim@example.com", password_hash: "", first_name: "Rahim", last_name: "Khan", role: "customer" },
    { user_id: 5, username: "Ayesha Begum", email: "ayesha@example.com", password_hash: "", first_name: "Ayesha", last_name: "Begum", role: "customer" },
];

// Mock reviews
export const reviews: (Review & { user?: User })[] = [
    // Reviews for Nakshi Kantha (product_id: 1)
    { review_id: 1, rating: 5, comment: "Absolutely beautiful! The embroidery work is stunning and the colors are vibrant. This kantha is a true work of art. Highly recommend!", user_id: 1, product_id: 1, user: users[0] },
    { review_id: 2, rating: 5, comment: "Exceeded my expectations. The craftsmanship is exceptional and it arrived well-packaged. Perfect addition to my bedroom!", user_id: 2, product_id: 1, user: users[1] },
    { review_id: 3, rating: 4, comment: "Very nice quality and authentic design. Took a bit longer to arrive but worth the wait. The stitching is intricate and beautiful.", user_id: 3, product_id: 1, user: users[2] },

    // Reviews for Bamboo Lamp (product_id: 2)
    { review_id: 4, rating: 5, comment: "Love this lamp! It creates such a warm ambiance in my living room. The bamboo work is excellent and very eco-friendly.", user_id: 4, product_id: 2, user: users[3] },
    { review_id: 5, rating: 4, comment: "Great quality bamboo craftsmanship. The light it casts is beautiful. Only wish it came in a larger size option.", user_id: 1, product_id: 2, user: users[0] },

    // Reviews for Jamdani Saree (product_id: 3)
    { review_id: 6, rating: 5, comment: "This Jamdani saree is absolutely gorgeous! The weaving is so delicate and the fabric feels luxurious. A true masterpiece!", user_id: 5, product_id: 3, user: users[4] },
    { review_id: 7, rating: 5, comment: "Authentic Dhakai Jamdani! I wore it to a wedding and received so many compliments. The quality is outstanding.", user_id: 3, product_id: 3, user: users[2] },
    { review_id: 8, rating: 4, comment: "Beautiful saree with intricate patterns. The gold accents are elegant. Slightly pricey but worth it for the quality.", user_id: 2, product_id: 3, user: users[1] },

    // Reviews for Terracotta Vase (product_id: 4)
    { review_id: 9, rating: 5, comment: "Perfect for my home decor! The traditional Bengali motifs are beautifully carved. Adds a rustic charm to my space.", user_id: 4, product_id: 4, user: users[3] },
    { review_id: 10, rating: 4, comment: "Nice terracotta work. The vase is sturdy and the design is authentic. Great for displaying dried flowers.", user_id: 5, product_id: 4, user: users[4] },
];

// Helper to create a full variant with /images/
const createVariant = (
    id: number,
    pid: number,
    size: string,
    color: string,
    price: number,
    stock: number,
    imgUrl: string
): ProductVariant & { images: ProductImage[] } => ({
    variant_id: id,
    product_id: pid,
    size,
    color,
    price,
    stock_quantity: stock,
    images: [
        { image_id: id * 10 + 1, variant_id: id, image_url: imgUrl }
    ]
});

// Map products with populated category relationships
const rawProducts: (Product & { variants: (ProductVariant & { images: ProductImage[] })[] })[] = [
    {
        product_id: 1,
        name: "Nakshi Kantha",
        description: "Traditional embroidered quilt art from rural Bangladesh. Hand-stitched with colorful patterns telling stories of village life.",
        base_price: 12000.00,
        category_id: 1,
        variants: [
            createVariant(101, 1, "Double (7x8ft)", "Red/Multicolor", 12000.00, 5, "/images/1_lRUm2IW.webp"), // Traditional hand-stitched quilt
            createVariant(102, 1, "Single (5x7ft)", "Blue/Multicolor", 8500.00, 8, "/images/Gemini_Generated_Image_ia1n70ia1n70ia1n.png") // Intricate textile pattern
        ]
    },
    {
        product_id: 2,
        name: "Handwoven Bamboo Lamp",
        description: "Eco-friendly bamboo lamp shade, crafted by artisans in Sylhet. Adds a warm, rustic glow to any room.",
        base_price: 4500.00,
        category_id: 4,
        variants: [
            createVariant(201, 2, "Medium", "Natural", 4500.00, 20, "/images/Gemini_Generated_Image_ty5znnty5znnty5z.png") // Artisan bamboo wicker
        ]
    },
    {
        product_id: 3,
        name: "Jamdani Saree",
        description: "Authentic Dhakai Jamdani saree, woven with fine cotton. A UNESCO Intangible Cultural Heritage of Humanity.",
        base_price: 25000.00,
        category_id: 1,
        variants: [
            createVariant(301, 3, "Free Size", "Off-White/Gold", 25000.00, 3, "/images/SALOAR_KAMIJ_SET_BLUE_PRINT.webp") // Luxurious Jamdani silk/cotton weaving
        ]
    },
    {
        product_id: 4,
        name: "Terracotta Vase",
        description: "Hand-molded clay vase with traditional Bengali motifs. Perfect for dried flowers or as a standalone piece.",
        base_price: 3000.00,
        category_id: 3,
        variants: [
            createVariant(401, 4, "12 inch", "Terracotta", 3000.00, 15, "/images/Gemini_Generated_Image_3kkhxj3kkhxj3kkh.png") // Traditional clay pottery with motifs
        ]
    }
];

// Populate category relationships
export const products = rawProducts.map(product => ({
    ...product,
    category: categories.find(cat => cat.category_id === product.category_id)
}));

