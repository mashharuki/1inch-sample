import { FusionSDK, NetworkEnum } from "@1inch/fusion-sdk";
import "dotenv/config";

const {
  API_KEY
} = process.env;


/**
 * Fusion SDKを試すためのサンプルスクリプト
 * intentを意識している
 */
async function main() {
  // Fusion SDKのインスタンスを作成
  const sdk = new FusionSDK({
    url: "https://api.1inch.dev/fusion",
    network: NetworkEnum.ETHEREUM,
    authKey: API_KEY,
  });

  // getActiveOrdersメソッドを使ってアクティブな注文を取得
  const orders = await sdk.getActiveOrders({ page: 1, limit: 2 });

  console.log("Active Orders:", orders);

  // getOrdersByMakerメソッドを使って特定のアドレスの注文を取得
  const orders2 = await sdk.getOrdersByMaker({
    page: 1,
    limit: 2,
    address: "0xfa80cd9b3becc0b4403b0f421384724f2810775f",
  });

  console.log("Orders by Maker:", orders2);

  // クォート取得用のパラメータ
  const params = {
    fromTokenAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",  // DAI
    toTokenAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",  // WETH
    amount: "1000000000000000000000",
  };

  const quote = await sdk.getQuote(params);

  console.log("Quote:", quote);

  // placeOrderメソッドを使って注文を作成する
}

main();