import axios from "axios";
import { Product } from '../models/Product';
import IProduct from "../interfaces/IProduct";

const shopifyUrl = "cpb-new-developer"
const accessToken = "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"

const graphqlQuery = `
        {
          products (first: 10) {
            edges {
              node {
                id
                bodyHtml
                images(first: 1) {
                  edges {
                    node {
                      originalSrc
                    }
                  }
                }
              }
            }
          }
        }
      `;

export class ShopifyServer {
  private accessToken: string;
  private apiUrl: string;
  constructor() {
      this.apiUrl = `https://${shopifyUrl}.myshopify.com/admin/api/2024-01/graphql.json`;
      this.accessToken = accessToken;
  }
  public async syncShopifyData() {
    try {
      const response = await axios.post(
        this.apiUrl,
        { query: graphqlQuery },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': this.accessToken,
          },
        }
      );
      const products = await response.data.data.products.edges.map((edge: any) => ({
        id: edge.node.id,
        bodyHtml: edge.node.bodyHtml,
        image: edge.node.images.edges[0]?.node?.originalSrc || '',
      }));

      const productsToInsert = products.map((product: IProduct) => ({
        id: product.id,
        bodyHtml: product.bodyHtml,
        image: product.image,
      }));
      await Product.insertMany(productsToInsert);
    } catch (error) {
      console.log("Не удалось загрузить данные");
    }
  }
}

export const shopifyServer = new ShopifyServer();