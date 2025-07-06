export interface SwapParams {
  src: string;           // スワップ元トークンアドレス
  dst: string;           // スワップ先トークンアドレス
  amount: string;        // スワップ量（wei単位）
  from: string;          // ユーザーアドレス
  slippage: number;      // スリッページ許容値（%）
  chainId: number;       // チェーンID
}

export interface SwapQuote {
  dstAmount: string;
  tx: {
    to: string;
    data: string;
    value: string;
    gas: string;
    gasPrice: string;
  };
}