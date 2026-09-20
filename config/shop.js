// ---------------------------------------------------------------------------
// Frozetto - shop ki settings ek hi jagah.
// Naam / address / phone .env se aate hain (SHOP_NAME, SHOP_ADDRESS, SHOP_PHONE ...).
// GST on/off aur bill ka output (thermal / PDF / WhatsApp) yahin se control hota hai.
//
// NOTE: env values function ke andar padhi jaati hain (import ke waqt nahi),
// kyunki dotenv.config() imports ke BAAD chalta hai.
// ---------------------------------------------------------------------------
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const LOGO_DIR = path.join(__dirname, "../assets/logos");

// Signature image (optional): backend/assets/logos/signature.png ya signature.jpg
const findSignature = () =>
  ["signature.png", "signature.jpg", "signature.jpeg"].find((f) => fs.existsSync(path.join(LOGO_DIR, f))) || "";

export const getShop = () => {
  const e = process.env;
  return {
    key: "frozen",
    name: e.SHOP_NAME || "Frozetto",
    address: e.SHOP_ADDRESS || "",
    phone: e.SHOP_PHONE || "",
    email: e.SHOP_EMAIL || "",
    gstin: e.SHOP_GSTIN || "",
    state: e.SHOP_STATE || "",
    billPrefix: e.BILL_PREFIX || "FRZ",
    gstEnabled: true, // GST lagti hai
    logoFile: "logo.png", // backend/assets/logos/logo.png
    signatureFile: findSignature(), // "Authorized Signatory" ke upar wali image
    requireCustomer: true, // har bill par customer ka naam + phone + address zaruri
    footer: e.SHOP_FOOTER || "Thank you for your business!",
    // Bill kaise dena hai
    output: { thermal: false, pdf: true, whatsapp: true },
  };
};

// Frontend ko jo info chahiye
export const publicShopInfo = (shop) => ({
  key: shop.key,
  name: shop.name,
  address: shop.address,
  phone: shop.phone,
  email: shop.email,
  gstin: shop.gstin,
  state: shop.state,
  gstEnabled: shop.gstEnabled,
  requireCustomer: shop.requireCustomer,
  output: shop.output,
  logoUrl: `/logos/${shop.logoFile}`,
  signatureUrl: shop.signatureFile ? `/logos/${shop.signatureFile}` : "",
});
