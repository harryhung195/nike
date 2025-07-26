# Nike Website Clone - Todo List

## Project Setup ✅
- [x] Create Next.js project with shadcn
- [x] Set up basic structure

## Frontend Components ✅
- [x] Header/Navigation component
- [x] Hero section with "TOTAL 90" campaign
- [x] New & Featured section (Women, Men, Kids cards)
- [x] Product showcase sections
- [x] Trending This Week carousel
- [x] Nike Football dramatic section with green lighting
- [x] Shop The Classics grid section
- [x] Footer component with all links

## Backend Development ✅
- [x] Set up database schema and models using MongoDB Atlas: mongodb+srv://harryhung195:Vanhung123@cluster0.wbhvhlg.mongodb.net/Nike
- [x] Create product management API endpoints
- [x] Implement user authentication system
- [x] Build shopping cart functionality (context + UI)
- [x] Create order management system
- [ ] Add search and filtering capabilities
- [ ] Implement user reviews and ratings
- [ ] Set up admin dashboard for product management

## Database Models Needed ✅
- [x] Products (id, name, description, price, images, category, sizes, colors, stock)
- [x] Users (id, email, password, name, address, phone)
- [x] Cart Items (user_id, product_id, size, color, quantity)
- [x] Orders (id, user_id, items, total, status, shipping_address)
- [x] Reviews (id, user_id, product_id, rating, comment)

## API Endpoints to Create ✅
- [x] GET /api/products - List all products with filters
- [x] GET /api/products/[id] - Get single product
- [x] POST /api/auth/login - User login
- [x] POST /api/auth/register - User registration
- [x] GET /api/cart - Get user's cart
- [x] POST /api/cart - Add/update/delete cart items
- [x] POST /api/orders - Create new order
- [x] GET /api/orders - Get user's orders
- [x] GET /api/orders/[id] - Get specific order
- [x] GET /api/reviews - Get product reviews
- [x] POST /api/reviews - Add product review
- [x] GET /api/user/profile - Get user profile
- [x] PUT /api/user/profile - Update user profile
- [x] POST /api/seed - Seed database with sample products

## Recent Accomplishments ✅
- [x] Database successfully connected and seeded with sample products
- [x] Created comprehensive API utility functions for frontend
- [x] Implemented AuthContext for user state management
- [x] Updated Header component with user authentication dropdown
- [x] Enhanced SignInPage with real authentication and error handling
- [x] Integrated backend with frontend authentication flow

## Frontend Integration 🚧
- [x] Connect product pages to backend APIs (API utility created)
- [x] Implement user authentication UI (with AuthContext)
- [x] Build functional shopping cart (context + UI complete)
- [ ] Create checkout process with backend integration
- [ ] Add user account management pages
- [ ] Integrate product loading from API into components
- [ ] Connect cart to backend persistence
- [ ] Add loading states and error handling

## Deployment ✅
- [x] Deploy to Netlify
- [x] Test live deployment
