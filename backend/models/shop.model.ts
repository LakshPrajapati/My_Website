import mongoose, {
  Schema,
  type HydratedDocument,
  type Model,
} from 'mongoose';

const SHOP_STATUSES = ['active', 'suspended', 'archived'] as const;
const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP'] as const;
const SHOP_TIMEZONE_PATTERN = /^[A-Za-z]+\/[A-Za-z_]+(?:\/[A-Za-z_]+)?$/;

export type ShopStatus = (typeof SHOP_STATUSES)[number];
export type ShopCurrency = (typeof CURRENCIES)[number];

export interface ShopAddress {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
}

export interface ShopSettings {
  allowNegativeInventory: boolean;
  lowStockNotifications: boolean;
  khataReminders: boolean;
}

export interface Shop {
  organizationId?: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  currency: ShopCurrency;
  timezone: string;
  address?: ShopAddress;
  settings: ShopSettings;
  status: ShopStatus;
  archivedAt?: Date;
}

export type ShopDocument = HydratedDocument<Shop>;

const addressSchema = new Schema<ShopAddress>(
  {
    line1: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
    line2: {
      type: String,
      trim: true,
      maxlength: 160,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    state: {
      type: String,
      trim: true,
      maxlength: 80,
    },
    postalCode: {
      type: String,
      trim: true,
      maxlength: 20,
    },
    country: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      minlength: 2,
      maxlength: 2,
      match: /^[A-Z]{2}$/,
    },
  },
  { _id: false, strict: 'throw' },
);

const settingsSchema = new Schema<ShopSettings>(
  {
    allowNegativeInventory: {
      type: Boolean,
      default: false,
      required: true,
    },
    lowStockNotifications: {
      type: Boolean,
      default: true,
      required: true,
    },
    khataReminders: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { _id: false, strict: 'throw' },
);

const shopSchema = new Schema<Shop>(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 2,
      maxlength: 80,
      match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    },
    currency: {
      type: String,
      enum: CURRENCIES,
      default: 'INR',
      required: true,
    },
    timezone: {
      type: String,
      required: true,
      default: 'Asia/Kolkata',
      validate: {
        validator: (value: string): boolean =>
          SHOP_TIMEZONE_PATTERN.test(value),
        message: 'timezone must be a valid IANA-style timezone',
      },
    },
    address: {
      type: addressSchema,
    },
    settings: {
      type: settingsSchema,
      required: true,
      default: (): ShopSettings => ({
        allowNegativeInventory: false,
        lowStockNotifications: true,
        khataReminders: true,
      }),
    },
    status: {
      type: String,
      enum: SHOP_STATUSES,
      default: 'active',
      required: true,
      index: true,
    },
    archivedAt: {
      type: Date,
    },
  },
  {
    collection: 'shops',
    timestamps: true,
    strict: true,
    strictQuery: true,
    minimize: true,
    versionKey: '__v',
  },
);

shopSchema.index({ organizationId: 1, slug: 1 }, { unique: true, sparse: true });
shopSchema.index({ status: 1, createdAt: -1 });

shopSchema.pre('validate', function validateArchiveState() {
  if (this.status === 'archived' && !this.archivedAt) {
    this.archivedAt = new Date();
  }

  if (this.status !== 'archived' && this.archivedAt) {
    this.invalidate(
      'archivedAt',
      'archivedAt is only allowed when the shop is archived',
    );
  }
});

export const ShopModel: Model<Shop> =
  mongoose.models.Shop ?? mongoose.model<Shop>('Shop', shopSchema);
