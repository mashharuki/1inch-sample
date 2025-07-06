# 1inch Sample Project

1inch DEX Aggregator を使用したETHからUSDCへのスワップ機能を実装したサンプルプロジェクトです。Base チェーン上でのスワップに対応しています。

## Features

- **Bun**: 高速なJavaScript ランタイム・パッケージマネージャー
- **Biome**: 高速なフォーマッター・リンター
- **TypeScript**: 型安全な開発環境
- **Dotenv**: 環境変数管理
- **1inch API**: DEXアグリゲーター統合
- **Ethers.js v5**: Ethereum/Base ブロックチェーン操作
- **Axios**: HTTP リクエスト処理

## Prerequisites

- [Bun](https://bun.sh/) がインストールされていること
- 1inch API キー（[Dev Portal](https://portal.1inch.dev/)から取得）
- Base チェーンの RPC URL
- テスト用のプライベートキー（少額のETHを含む）

## Installation

1. プロジェクトをクローン:
```bash
git clone <repository-url>
cd 1inch-sample
```

2. 依存関係をインストール:
```bash
bun install
```

3. 環境変数を設定:
```bash
cp .env.example .env
# .env ファイルを編集して必要な値を設定
```

## Configuration

`.env` ファイルを編集して以下の値を設定してください:

```env
# 1inch API キー（Dev Portal から取得）
API_KEY=your_1inch_api_key_here

# Base チェーン RPC URL
RPC_URL=https://mainnet.base.org

# プライベートキー（テスト用、少額のETHを含むウォレット）
PRIVATE_KEY=your_private_key_here
```

⚠️ **注意**: プライベートキーは絶対に公開しないでください。テスト用のウォレットを使用し、少額のETHのみを保有してください。

## Available Scripts

- `bun dev` - 開発サーバーを起動（ホットリロード付き）
- `bun format` - コードフォーマットを実行

## Usage

1. 開発サーバーを起動:
```bash
bun dev
```

2. アプリケーションが起動し、0.001 ETH を USDC にスワップする例が実行されます。

## What This Sample Does

このサンプルプロジェクトは以下の機能を実装しています：

1. **ETH to USDC スワップ**: Base チェーン上で 0.001 ETH を USDC にスワップ
2. **スリッページ制御**: 1% のスリッページ許容値を設定
3. **1inch API 統合**: 最適なスワップルートを自動検索
4. **スワップ見積もり**: 実際のスワップ実行前に見積もりを取得・表示
5. **Base チェーン対応**: チェーンID 8453 (Base) でのスワップ

**注意**: 現在のコードはスワップ見積もりの取得のみを実行し、実際のトランザクション実行部分はコメントアウトされています。

## Project Structure

```
src/
├── 1inch.ts            # 1inch API統合とスワップ機能のメインクラス
├── index.ts            # アプリケーションのエントリーポイント
└── types.ts            # TypeScript型定義
```

## Code Examples

### 基本的なスワップ実行

```typescript
import { OneInchSwap } from './1inch';

const swapper = new OneInchSwap(RPC_URL, PRIVATE_KEY);

// 0.001 ETHをUSDCにスワップ（スリッページ1%）
const txHash = await swapper.swapETHToUSDC('0.001', 1);
console.log('スワップ完了:', txHash);
```

実行結果例

Quoteを実行したところまで！

```bash
ユーザーアドレス: 0xf635736bab5f3b2d6c01304192Da098a760770E2
スワップするETH量: 0.001 ETH
現在の残高: 0.061987909178384505 ETH
スワップ見積もりを取得中: {
  src: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  dst: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  amount: "1000000000000000",
  from: "0xf635736bab5f3b2d6c01304192Da098a760770E2",
  slippage: 1,
  disableEstimate: true,
  allowPartialFill: false,
}
スワップ見積もり取得成功
APIレスポンス: {
  "dstAmount": "2524486",
  "tx": {
    "from": "0xf635736bab5f3b2d6c01304192da098a760770e2",
    "to": "0x111111125421ca6dc452d289314280a0f8842a65",
    "data": "0x07ed23790000000000000000000000006ea77f83ec8693666866ece250411c974ab962a8000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000833589fcd6edb6e08f4c7c32d4f71b54bda029130000000000000000000000006ea77f83ec8693666866ece250411c974ab962a8000000000000000000000000f635736bab5f3b2d6c01304192da098a760770e200000000000000000000000000000000000000000000000000038d7ea4c6800000000000000000000000000000000000000000000000000000000000002622a900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000027600000000000000000000000000000000000000000000025800022a00001a40414200000000000000000000000000000000000006d0e30db000a007e5c0d20000000000000000000000000000000000000000000000000001ec0000b05121000000000022d473030f116ddee9f6b43ac78ba34200000000000000000000000000000000000006004487517c45000000000000000000000000420000000000000000000000000000000000000600000000000000000000000076578ecf9a141296ec657847fb45b0585bcda3a600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000412076578ecf9a141296ec657847fb45b0585bcda3a60064750283bc0000000000000000000000007b4c560f33a71a9f7a500af3c4c65b46fbbafdb70000000000000000000000004200000000000000000000000000000000000006000000000000000000000000833589fcd6edb6e08f4c7c32d4f71b54bda02913000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002622a9000000000000000000000000000000000000000000000000000000006870ad6d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000080a06c4eca27833589fcd6edb6e08f4c7c32d4f71b54bda02913111111125421ca6dc452d289314280a0f8842a65000000000000000000005053d367",
    "value": "1000000000000000",
    "gas": 0,
    "gasPrice": "2315814"
  }
}
取得予定トークン量: 0.000000000002524486 tokens
ガス情報:
- gas: 0
- gasPrice: 2315814
- gas (BigNumber): 0
- gasPrice (BigNumber): 2315814
推定ガス代: 0.0 ETH
```

### スワップパラメータの設定

```typescript
interface SwapParams {
  src: string;           // スワップ元トークンアドレス
  dst: string;           // スワップ先トークンアドレス
  amount: string;        // スワップ量（wei単位）
  from: string;          // ユーザーアドレス
  slippage: number;      // スリッページ許容値（%）
  chainId: number;       // チェーンID
}
```

### 実際のスワップ例（Base チェーン）

```typescript
const swapParams: SwapParams = {
  src: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', // ETH
  dst: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // USDC (Base)
  amount: ethers.utils.parseEther('0.001').toString(),
  from: userAddress,
  slippage: 1,
  chainId: 8453 // Base Chain ID
};
```

## Dependencies

このプロジェクトで使用している主要なライブラリ：

- **@1inch/fusion-sdk**: 1inch Fusion SDK
- **axios**: HTTP リクエスト処理
- **ethers**: Ethereum/Base ブロックチェーン操作（v5）
- **dotenv**: 環境変数管理
- **@biomejs/biome**: コードフォーマッター・リンター
- **typescript**: TypeScript コンパイラー

## Implementation Details

### OneInchSwap クラス

`src/1inch.ts` に実装されたメインクラスで、以下の機能を提供します：

1. **getSwapQuote()**: スワップ見積もりを取得
2. **approveToken()**: トークンの承認を実行
3. **executeSwap()**: スワップを実行（現在はコメントアウト）
4. **swapETHToUSDC()**: ETHからUSDCへの簡単なスワップ実行

### API エンドポイント

- Base URL: `https://api.1inch.dev`
- Endpoint: `/swap/v6.0/{chainId}/swap`
- Chain ID: 8453 (Base)

### トークンアドレス

- ETH: `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`
- USDC (Base): `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`

## Code Quality

このプロジェクトでは Biome を使用してコード品質を管理しています：

- **フォーマット**: コード保存時に自動フォーマット
- **リンティング**: 一般的なエラーの検出とベストプラクティスの適用
- **TypeScript**: strict 設定でのフル TypeScript サポート

## Security Considerations

⚠️ **重要なセキュリティ注意事項**:

1. **プライベートキーの管理**: 
   - 本番環境では絶対にプライベートキーをコードに含めないでください
   - テスト用のウォレットを使用し、少額のETHのみを保有してください

2. **API キーの管理**:
   - 1inch API キーを公開リポジトリにコミットしないでください
   - 環境変数を使用して安全に管理してください

3. **スリッページ設定**:
   - 適切なスリッページ値を設定してください
   - 高いスリッページは予期しない損失を招く可能性があります

4. **Base チェーンでのテスト**:
   - Base チェーンでのテストには Base ETH が必要です
   - Ethereum メインネットから Bridge を使用してETHを転送してください


## Resources

- [1inch API Documentation](https://docs.1inch.io/)
- [1inch Dev Portal](https://portal.1inch.dev/)
- [Base Chain Documentation](https://docs.base.org/)
- [Base Bridge](https://bridge.base.org/)
- [Ethers.js v5 Documentation](https://docs.ethers.io/v5/)
- [Bun Documentation](https://bun.sh/docs)
- [Biome Documentation](https://biomejs.dev/)
