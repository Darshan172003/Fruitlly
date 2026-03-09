# Fruitlly Frontend

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env`.
3. Fill in the Firebase web app values and `VITE_BACKEND_URL`.
4. Run the app with `npm run dev`.

## Hidden admin panel

The admin UI is intentionally not linked anywhere in the site navigation.

1. Open `/fruitllyadminpanel` manually in the browser.
2. Sign in with a Firebase Authentication email/password user.
3. Any signed-in Firebase Auth user can access the hidden admin panel and manage categories and products.

## Firestore collections

Categories are stored as top-level documents in `products/{categoryId}`:

```json
{
  "name": "Jelly Cubes",
  "sortName": "jelly cubes"
}
```

Products are stored inside each category at `products/{categoryId}/items/{productId}`.

`productId` is generated from the product name, and each product document uses this shape:

```json
{
   "categoryId": "jelly-cubes",
   "categoryName": "Jelly Cubes",
   "categorySortName": "jelly cubes",
   "productSortName": "sugar coated jelly cubes",
   "title": "Sugar Coated Jelly Cubes",
   "shortDescription": "Short product summary",
   "description": "Longer product description",
   "imageUrl": "https://...",
   "imagePath": "products/jelly-cubes/sugar-coated-jelly-cubes/file-name.webp",
   "ingredients": "Sugar, fruit pulp...",
   "textureProfile": "Soft center with sugar coating",
   "bulkPackaging": "5kg bags, 20kg cartons",
   "shelfLifeStorage": "12 months in a cool, dry place"
}
```

Product images are uploaded to Firebase Storage under `products/{categoryId}/{productId}/`.

## Public product routes

Products now resolve through the category path:

- `/products`
- `/products/{categoryId}/{productId}`
