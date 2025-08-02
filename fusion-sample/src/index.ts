import { SDK } from "@1inch/cross-chain-sdk";
import "dotenv/config";

const {
  API_KEY
} = process.env;

/**
 * Fusion SDKを試すためのサンプルスクリプト
 */
async function main() {
  // Fusion SDKのインスタンスを作成
  const sdk = new SDK({
    url: "https://api.1inch.dev/fusion-plus",
    authKey: API_KEY,
  });
  // getActiveOrdersメソッドを使ってアクティブな注文を取得
  const orders = await sdk.getActiveOrders({ page: 1, limit: 2 });

  console.log("Active Orders:", orders);

  // getOrdersByMakerメソッドを使って特定のアドレスの注文を取得
  const orders2 = await sdk.getOrdersByMaker({
    page: 1,
    limit: 2,
    address: "0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072",
  });

  console.log("Orders by Maker:", orders2);
}

main();