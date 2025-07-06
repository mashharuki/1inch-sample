import axios from 'axios';
import * as dotenv from 'dotenv';
import { ethers } from 'ethers';
import { SwapParams, SwapQuote } from './types';

dotenv.config();

// APIはDev Portalから取得する
const {
  API_KEY
} = process.env;

// 1inch API のベースURL
const INCH_API_BASE_URL = 'https://api.1inch.dev';

/**
 * 1inch DEX Aggregator を使用してトークンスワップを実行するクラス
 * 
 * @description
 * このクラスは1inch APIを使用してトークンのスワップを実行します。
 * スワップの見積もり取得、トークンの承認、スワップの実行などの機能を提供します。
 * 
 * @example
 * ```typescript
 * const oneInchSwap = new OneInchSwap(RPC_URL, PRIVATE_KEY);
 * const txHash = await oneInchSwap.swapETHToUSDC('0.1', 1);
 * console.log('スワップ完了:', txHash);
 * ```
 * 
 * @remarks
 * - 1inch API キーが必要です
 * - プライベートキーを安全に管理してください
 * - スワップ前にトークンの承認が必要な場合があります
 * - スリッページ設定に注意してください
 */
export class OneInchSwap {
  private provider: ethers.providers.JsonRpcProvider;
  private signer: ethers.Signer;

  constructor(rpcUrl: string, privateKey: string) {
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    this.signer = new ethers.Wallet(privateKey, this.provider);
  }

  /**
   * スワップの見積もりを取得
   */
  async getSwapQuote(params: SwapParams): Promise<SwapQuote> {
    // API エンドポイントの構築
    const url = `${INCH_API_BASE_URL}/swap/v6.0/${params.chainId}/swap`;
    
    // スワップパラメータの設定
    const swapParams = {
      src: params.src,
      dst: params.dst,
      amount: params.amount,
      from: params.from,
      slippage: params.slippage,
      disableEstimate: true,
      allowPartialFill: false
    };

    try {
      console.log('スワップ見積もりを取得中:', swapParams);
      // API リクエストの実行
      const response = await axios.get(url, {
        params: swapParams,
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'accept': 'application/json'
        }
      });

      console.log('スワップ見積もり取得成功');
      console.log('APIレスポンス:', JSON.stringify(response.data, null, 2));
        
        // レスポンスデータを分割代入で取得
        const { dstAmount, dstToken, tx } = response.data;
        
        // 取得できるトークン量を表示
        const dstDecimals = dstToken?.decimals || 18;
        const formattedDstAmount = ethers.utils.formatUnits(dstAmount, dstDecimals);
        console.log(`取得予定トークン量: ${formattedDstAmount} ${dstToken?.symbol || 'tokens'}`);
        
        // ガス情報を詳細表示
        console.log('ガス情報:');
        console.log('- gas:', tx.gas);
        console.log('- gasPrice:', tx.gasPrice);
        console.log('- gas (BigNumber):', ethers.BigNumber.from(tx.gas).toString());
        console.log('- gasPrice (BigNumber):', ethers.BigNumber.from(tx.gasPrice).toString());
        
        // ガス代をETH単位で表示
        const gasCostWei = ethers.BigNumber.from(tx.gas).mul(tx.gasPrice);
        const gasCostEth = ethers.utils.formatEther(gasCostWei);
        console.log(`推定ガス代: ${gasCostEth} ETH`);
      

      return response.data;
    } catch (error) {
      console.error('スワップ見積もりエラー:', error);
      throw error;
    }
  }

  /**
   * トークンの承認を実行
   */
  async approveToken(
    tokenAddress: string, 
    spenderAddress: string, 
    amount: string
  ): Promise<void> {
    const tokenContract = new ethers.Contract(
      tokenAddress,
      [
        'function approve(address spender, uint256 amount) returns (bool)',
        'function allowance(address owner, address spender) view returns (uint256)'
      ],
      this.signer
    );

    const userAddress = await this.signer.getAddress();
    const currentAllowance = await tokenContract.allowance(userAddress, spenderAddress);

    if (currentAllowance.lt(amount)) {
      console.log('トークンの承認を実行中...');
      const approveTx = await tokenContract.approve(spenderAddress, amount);
      await approveTx.wait();
      console.log('承認完了:', approveTx.hash);
    } else {
      console.log('既に十分な承認があります');
    }
  }

  /**
   * スワップを実行
   */
  async executeSwap(params: SwapParams) {
    try {
      // 1. スワップ見積もりを取得
      const quote = await this.getSwapQuote(params);
      
      /*
      // 2. トークンの承認（ETHの場合はスキップ）
      if (params.src !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
        await this.approveToken(
          params.src,
          quote.tx.to,
          params.amount
        );
      }

      // 3. スワップトランザクションを実行
      console.log('スワップを実行中...');
      
      // ガス制限を適切な数値に変換し、最小値を確保
      let gasLimit = ethers.BigNumber.from(quote.tx.gas);
      const gasPrice = ethers.BigNumber.from(quote.tx.gasPrice);
      
      // ガス制限が0や異常に低い場合のフォールバック
      const minGasLimit = ethers.BigNumber.from('50000'); // 最小ガス制限
      if (gasLimit.lt(minGasLimit)) {
        console.warn(`ガス制限が低すぎます (${gasLimit.toString()})。最小値 ${minGasLimit.toString()} を使用します。`);
        gasLimit = minGasLimit;
      }
      
      console.log('トランザクション詳細:');
      console.log('- to:', quote.tx.to);
      console.log('- value:', quote.tx.value);
      console.log('- gasLimit:', gasLimit.toString());
      console.log('- gasPrice:', gasPrice.toString());
      
      const tx = await this.signer.sendTransaction({
        to: quote.tx.to,
        data: quote.tx.data,
        value: quote.tx.value,
        gasLimit: gasLimit,
        gasPrice: gasPrice
      });

      console.log('スワップトランザクション送信:', tx.hash);
      
      // 4. トランザクションの確認を待つ
      const receipt = await tx.wait();
      console.log('スワップ完了:', receipt!.transactionHash);
      
      return receipt!.transactionHash;

      */
      
    } catch (error) {
      console.error('スワップ実行エラー:', error);
      throw error;
    }
  }

  /**
   * 使用例：ETHをUSDCにスワップ
   */
  async swapETHToUSDC(ethAmount: string, slippage: number = 1) {
    const userAddress = await this.signer.getAddress();

    console.log(`ユーザーアドレス: ${userAddress}`);
    console.log(`スワップするETH量: ${ethAmount} ETH`);
    console.log(`現在の残高: ${ethers.utils.formatEther(await this.provider.getBalance(userAddress))} ETH`);
    
    // スワップパラメータの設定
    const swapParams: SwapParams = {
      src: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', // ETH
      dst: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // USDC (Base)
      amount: ethers.utils.parseEther(ethAmount).toString(),
      from: userAddress,
      slippage: slippage,
      chainId: 8453 // Base Chain ID
    };

    return await this.executeSwap(swapParams);
  }
}