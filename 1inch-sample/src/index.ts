import * as dotenv from 'dotenv';
import { OneInchSwap } from './1inch';

dotenv.config();

// APIはDev Portalから取得する
const {
  RPC_URL,
  PRIVATE_KEY,
} = process.env;

if (!RPC_URL || !PRIVATE_KEY) {
  throw new Error('環境変数 RPC_URL と PRIVATE_KEY を設定してください');
}

/**
 * 検証用のスクリプト
 */
const main = async () => {
  const swapper = new OneInchSwap(RPC_URL, PRIVATE_KEY);
  
  try {
    // 0.001 ETHをUSDCにスワップ（スリッページ1%）
    const txHash = await swapper.swapETHToUSDC('0.001', 1);
    console.log('スワップ完了:', txHash);
  } catch (error) {
    console.error('エラー:', error);
  }
};

main();
