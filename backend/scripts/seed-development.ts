import mongoose, { Schema, type Model } from 'mongoose';
import { connectToDatabase, disconnectFromDatabase } from '../config/database';
import { env } from '../config/env';
import { logger } from '../utils/logger';

const SEED_KEY = 'smart-dukaan-khata-development-v1';
const CONFIRMATION = 'smart-dukaan-khata-development';
const DAY = 24 * 60 * 60 * 1000;

interface SeedDocument {
  _id: mongoose.Types.ObjectId;
  seedKey: string;
  shopId: mongoose.Types.ObjectId;
  [key: string]: unknown;
}

const seedSchema = new Schema<SeedDocument>(
  { seedKey: { type: String, required: true, index: true }, shopId: { type: Schema.Types.ObjectId, required: true, index: true } },
  { strict: false, timestamps: true },
);

const models = {
  users: mongoose.model<SeedDocument>('DevelopmentUsers', seedSchema, 'users'),
  customers: mongoose.model<SeedDocument>('DevelopmentCustomers', seedSchema, 'customers'),
  products: mongoose.model<SeedDocument>('DevelopmentProducts', seedSchema, 'products'),
  transactions: mongoose.model<SeedDocument>('DevelopmentTransactions', seedSchema, 'transactions'),
  sales: mongoose.model<SeedDocument>('DevelopmentSales', seedSchema, 'sales'),
  expenses: mongoose.model<SeedDocument>('DevelopmentExpenses', seedSchema, 'expenses'),
};

function at<T>(values: readonly T[], index: number): T {
  const value = values[index];
  if (value === undefined) {
    throw new Error(`Seed data is missing index ${index}`);
  }
  return value;
}

const id = (prefix: string, value: number): mongoose.Types.ObjectId =>
  new mongoose.Types.ObjectId(`${prefix}${value.toString(16).padStart(20, '0')}`);

const money = (value: number): number => Math.round(value * 100);
const dateAt = (daysAgo: number, hour = 11): Date => {
  const date = new Date(Date.now() - daysAgo * DAY);
  date.setHours(hour, (daysAgo * 7) % 60, 0, 0);
  return date;
};

async function seed(): Promise<void> {
  if (env.NODE_ENV !== 'development') {
    throw new Error('Development seed refused: NODE_ENV must be development');
  }
  if (!env.MONGODB_DB_NAME.includes('dev') && !env.MONGODB_DB_NAME.includes('local')) {
    throw new Error('Development seed refused: use a database name containing "dev" or "local"');
  }
  if (process.env.SEED_CONFIRMATION !== CONFIRMATION) {
    throw new Error(`Set SEED_CONFIRMATION=${CONFIRMATION} to run the development seed`);
  }

  const shopId = id('a001', 1);
  const userIds = [id('b001', 1), id('b001', 2)];
  const customerIds = Array.from({ length: 12 }, (_, index) => id('c001', index + 1));
  const productIds = Array.from({ length: 18 }, (_, index) => id('d001', index + 1));

  const shop = {
    _id: shopId,
    seedKey: SEED_KEY,
    name: 'Shree Narmada Kirana',
    slug: 'shree-narmada-kirana-demo',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    address: { line1: '14 Market Road', city: 'Indore', state: 'Madhya Pradesh', postalCode: '452001', country: 'IN' },
    settings: { allowNegativeInventory: false, lowStockNotifications: true, khataReminders: true },
    status: 'active',
  };

  const users = [
    { _id: userIds[0], seedKey: SEED_KEY, shopId, name: 'Aarav Mehta', email: 'aarav.demo@example.test', role: 'owner' },
    { _id: userIds[1], seedKey: SEED_KEY, shopId, name: 'Kavya Shah', email: 'kavya.demo@example.test', role: 'staff' },
  ];
  const customerNames = ['Rohan Verma', 'Isha Patel', 'Manav Joshi', 'Nisha Rao', 'Dev Malhotra', 'Tara Singh', 'Kabir Jain', 'Mira Nair', 'Yash Gupta', 'Anaya Das', 'Vivaan Roy', 'Sara Khan'];
  const customers = customerIds.map((customerId, index) => ({
    _id: customerId, seedKey: SEED_KEY, shopId, name: at(customerNames, index), phone: `900000${String(index + 101).padStart(4, '0')}`,
    creditLimitMinor: money(at([3000, 5000, 2500, 8000], index % 4)), openingBalanceMinor: index % 3 === 0 ? money(320 + index * 45) : 0,
    status: 'active',
  }));
  const productData = [
    ['Basmati Rice 5kg', 'grocery', 480, 620], ['Toor Dal 1kg', 'grocery', 110, 145], ['Wheat Flour 5kg', 'grocery', 220, 285],
    ['Sunflower Oil 1L', 'grocery', 125, 155], ['Tea 250g', 'grocery', 95, 125], ['Sugar 1kg', 'grocery', 42, 52],
    ['Bath Soap', 'personal-care', 32, 45], ['Toothpaste 150g', 'personal-care', 85, 112], ['Shampoo Sachet Pack', 'personal-care', 60, 78],
    ['Detergent 1kg', 'household', 105, 138], ['Dishwash Bar', 'household', 22, 30], ['LED Bulb 9W', 'household', 90, 125],
    ['Notebook 200 Pages', 'stationery', 55, 75], ['Ball Pen Pack', 'stationery', 35, 50], ['Pencil Box', 'stationery', 70, 95],
    ['Biscuits Assorted', 'snacks', 30, 40], ['Namkeen 400g', 'snacks', 75, 95], ['Fruit Juice 1L', 'beverages', 90, 120],
  ] as const;
  const products = productIds.map((productId, index) => {
    const [name, category, cost, price] = at(productData, index);
    return { _id: productId, seedKey: SEED_KEY, shopId, name, sku: `DEMO-${String(index + 1).padStart(3, '0')}`, category, unit: 'piece', costPriceMinor: money(cost), sellingPriceMinor: money(price), stockQuantity: 25 + (index * 7) % 60, reorderLevel: 12 };
  });

  const sales: SeedDocument[] = [];
  const transactions: SeedDocument[] = [];
  const expenses: SeedDocument[] = [];
  for (let index = 0; index < 48; index += 1) {
    const saleId = id('e001', index + 1);
    const customerId = index % 5 === 0 ? undefined : customerIds[index % customerIds.length];
    const lineCount = 2 + (index % 3);
    const lines = Array.from({ length: lineCount }, (_, lineIndex) => {
      const productIndex = (index * 3 + lineIndex) % productIds.length;
      const quantity = 1 + ((index + lineIndex) % 4);
      const productId = at(productIds, productIndex);
      const product = at(products, productIndex);
      return { productId, quantity, unitPriceMinor: product.sellingPriceMinor, lineTotalMinor: quantity * product.sellingPriceMinor };
    });
    const totalMinor = lines.reduce((sum, line) => sum + line.lineTotalMinor, 0);
    const isCredit = Boolean(customerId) && index % 4 === 0;
    const paidMinor = isCredit ? (index % 8 === 0 ? Math.round(totalMinor * 0.5) : Math.round(totalMinor * 0.6)) : totalMinor;
    const saleDate = dateAt(180 - index * 3, 9 + (index % 9));
    sales.push({ _id: saleId, seedKey: SEED_KEY, shopId, customerId, invoiceNumber: `DEMO-${String(index + 1).padStart(4, '0')}`, items: lines, subtotalMinor: totalMinor, totalMinor, paidMinor, creditMinor: totalMinor - paidMinor, paymentMethod: isCredit ? 'credit' : index % 3 === 0 ? 'upi' : 'cash', status: 'completed', saleDate });
    transactions.push({ _id: id('f001', index + 1), seedKey: SEED_KEY, shopId, type: 'sale', saleId, customerId, amountMinor: totalMinor, direction: 'credit', paymentMethod: isCredit ? 'credit' : 'cash', occurredAt: saleDate });
    if (isCredit && index % 8 === 0) {
      transactions.push({ _id: id('f001', 100 + index), seedKey: SEED_KEY, shopId, type: 'payment', saleId, customerId, amountMinor: paidMinor, direction: 'debit', paymentMethod: 'upi', occurredAt: dateAt(180 - index * 3 - 10, 16) });
    }
  }
  for (let index = 0; index < 15; index += 1) {
    const amountMinor = money(at([1800, 2400, 950, 3200, 1200], index % 5));
    const occurredAt = dateAt(175 - index * 11, 18);
    expenses.push({ _id: id('g001', index + 1), seedKey: SEED_KEY, shopId, category: at(['rent', 'utilities', 'transport', 'supplies'], index % 4), description: at(['Monthly shop rent', 'Electricity and broadband', 'Local supplier delivery', 'Packaging and carry bags'], index % 4), amountMinor, paymentMethod: index % 2 ? 'upi' : 'cash', occurredAt });
    transactions.push({ _id: id('f001', 300 + index), seedKey: SEED_KEY, shopId, type: 'expense', expenseId: id('g001', index + 1), amountMinor, direction: 'debit', paymentMethod: index % 2 ? 'upi' : 'cash', occurredAt });
  }

  await mongoose.connection.transaction(async (session) => {
    await Promise.all([
      mongoose.connection.collection('shops').deleteMany({ seedKey: SEED_KEY }, { session }),
      ...Object.values(models).map((model) => model.deleteMany({ seedKey: SEED_KEY }, { session })),
    ]);
    await mongoose.connection.collection('shops').insertOne(shop, { session });
    await models.users.insertMany(users, { session });
    await models.customers.insertMany(customers, { session });
    await models.products.insertMany(products, { session });
    await models.sales.insertMany(sales, { session });
    await models.expenses.insertMany(expenses, { session });
    await models.transactions.insertMany(transactions, { session });
  });

  logger.success(`DEVELOPMENT_SEED_COMPLETE: ${sales.length} sales, ${customers.length} customers, ${products.length} products`);
}

connectToDatabase()
  .then(seed)
  .catch((error: unknown) => {
    logger.error('DEVELOPMENT_SEED_FAILED', { errorType: error instanceof Error ? error.name : 'UnknownError' });
    process.exitCode = 1;
  })
  .finally(disconnectFromDatabase);
