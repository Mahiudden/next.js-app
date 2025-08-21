# E-Commerce Next.js Application

A full-stack e-commerce application built with Next.js 15, featuring authentication, product management, and a modern responsive UI.

## 🚀 Features

- **Public Pages**: Landing page, product listing, and product details
- **Authentication**: NextAuth.js with Google OAuth and credentials login
- **Protected Routes**: Dashboard for adding new products (requires login)
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Database**: MongoDB with Mongoose ODM
- **Real-time Updates**: Toast notifications and loading states
- **Type Safety**: Full TypeScript support

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: MongoDB + Mongoose
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts    # NextAuth API routes
│   │   └── products/
│   │       ├── route.ts                   # Products CRUD API
│   │       └── [id]/route.ts              # Individual product API
│   ├── components/                         # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductHighlights.tsx
│   │   └── NextAuthProvider.tsx
│   ├── dashboard/add-product/page.tsx      # Protected add product page
│   ├── login/page.tsx                      # Login page
│   ├── products/
│   │   ├── page.tsx                        # Products listing
│   │   └── [id]/page.tsx                   # Product details
│   ├── layout.tsx                          # Root layout
│   └── page.tsx                            # Landing page
├── lib/
│   ├── auth.ts                             # NextAuth configuration
│   └── db.ts                               # Database configuration
└── scripts/
    └── seed-mongo.js                       # MongoDB seed script
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd nextjs-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your values:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   MONGODB_DB=ecommerce
   ```

4. **Set up the database**
   ```bash
   # Seed MongoDB with sample data
   npm run seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication Setup

### Google OAuth (Recommended)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client IDs
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy Client ID and Client Secret to `.env.local`

### Credentials Login

For development, you can create a user directly in the database or modify the auth configuration to use a simple in-memory user.

## 📱 Available Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page with hero section and product highlights |
| `/login` | Public | Authentication page (Google OAuth + credentials) |
| `/products` | Public | Product listing page |
| `/products/[id]` | Public | Individual product details |
| `/dashboard/add-product` | Protected | Add new product form (requires login) |

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update component styles in individual component files
- Global styles in `src/app/globals.css`

### Components
- All components are in `src/app/components/`
- Easy to modify and extend
- Responsive design with mobile-first approach

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

- **Netlify**: Use `next build && next export`
- **Railway**: Direct deployment from GitHub
- **AWS/GCP**: Build and deploy manually

## 🔧 Development

### Database Changes

```bash
# Update MongoDB schema in models
# No migrations needed - MongoDB is schema-less

# Re-seed database if needed
npm run seed
```

### Adding New Features

1. Create new API routes in `src/app/api/`
2. Add new pages in `src/app/`
3. Create reusable components in `src/app/components/`
4. Update MongoDB models if needed

## 🐛 Troubleshooting

### Common Issues

1. **Database connection errors**
   - Ensure `.env.local` has correct `MONGODB_URI`
   - Check MongoDB connection string format

2. **Authentication not working**
   - Check Google OAuth credentials
   - Verify `NEXTAUTH_SECRET` is set
   - Ensure callback URLs are correct

3. **Build errors**
   - Clear `.next` folder: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

---

**Happy coding! 🎉**
