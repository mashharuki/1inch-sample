import { NetworkEnum, SDK, type QuoteParams } from "@1inch/cross-chain-sdk";
import "dotenv/config";

const {
  API_KEY
} = process.env;

/**
 * Swap API SDKを試すためのサンプルスクリプト
 */
async function main() {
  // Swap API SDKのインスタンスを作成
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

  // クォートを取得するためのパラメータを設定
  const params: QuoteParams = {
    srcChainId: NetworkEnum.ETHEREUM,
    dstChainId: NetworkEnum.GNOSIS,
    srcTokenAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
    dstTokenAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    amount: "1000000000000000000000",
    walletAddress: "0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072",
  };

  // get quoteを使ってクォートを取得
  const quote = await sdk.getQuote(params);

  console.log("Quote:", quote);
}

main();