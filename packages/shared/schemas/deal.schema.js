import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';


/**
 * Allowed file types for the deal logo.
 * @type {readonly string[]}
 */
const allowedFileTypes = ['jpg', 'jpeg', 'png', 'gif'];

/**
 * Enum values for the deal category.
 * @type {readonly string[]}
 */
const categoryEnum = [
  'foodDrink',
  'bathroom',
  'jewelery',
  'sports',
  'tech',
  'auto',
  'entertainment',
  'travel',
];

/**
 * Common schema object.
 * @type {object}
 */
const commonSchemaObject = {
  merchantId: zfd.text(z.string().min(1, 'Merchant ID is required')),
  title: zfd.text(z.string().max(255, 'Title must be 255 characters or less')),
  originalPrice: zfd.text(z.coerce.number().min(0, 'Original Price must be a positive number')),
  discount: zfd.text(z.coerce.number().min(0, 'Discount must be at least 0').max(100, 'Discount cannot exceed 100')),
  logo: zfd.file(z.instanceof(File).refine(file => {
    const fileType = file.name.split('.').pop().toLowerCase();
    return allowedFileTypes.includes(fileType);
  }, 'Invalid file type')),
  category: zfd.text(z.enum(categoryEnum, 'Category is required')),
};

/**
 * Returns the deal schema with dynamic validation for expiration date.
 * @returns {import('zod').ZodType<DealFormSchema>}
 */
const getDealSchema = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return zfd.formData({
    ...commonSchemaObject,
    expiration: zfd.text(z.string().refine((val) => !isNaN(Date.parse(val)) && new Date(val) >= today, 'Expiration must be today\'s date or later')),
  });
};

/**
 * Static schema for API Gateway validation.
 * This schema doesn't include the dynamic check for expiration date.
 */
const staticDealSchema = zfd.formData({
  ...commonSchemaObject,
  expiration: zfd.text(z.string().refine((val) => !isNaN(Date.parse(val)), 'Expiration must be a valid date')),
});

/**
 * JSON schema for the deal.
 */
const jsonSchema = zodToJsonSchema(staticDealSchema, {
  $refStrategy: 'none',
  target: 'openApi3',
});

export { getDealSchema, jsonSchema };
