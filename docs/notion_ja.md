# 1 inch ETH Global参加者向け Notion ドキュメントの内容

# 1inch開発ガイド（日本語版）

## 概要

1inchは、Ethereum と EVM ブロックチェーン上のプロトコルネットワークです。スワップ機能で有名ですが、包括的なAPIセットも提供しており、様々なブロックチェーンアプリケーションの開発を支援します。

---

## スワップ・プロトコル

1inchには4つのスワップ・プロトコルがあります：

### 1. Classic Swap（クラシック・スワップ）
- **旧称**: Aggregation Protocol
- **概要**: 2019年から稼働する1inchの元祖スワップ・プロトコル
- **特徴**: 
  - 複数のDEXを統合して最適なレートを提供
  - 現在はバージョン6で、エコシステム全体で信頼されている
  - DeFiサマーで大きく利用され、Ethereum最高のDEXアグリゲーターの地位を維持

### 2. Limit Order Protocol（リミット・オーダー・プロトコル）
- **概要**: オンチェーンオーダーブック・システム
- **特徴**:
  - 特定価格でトークンをリストアップ
  - 非同期アプローチでガス代不要の実行
  - アグリゲーションプロトコルによって追跡され、スワップの価格影響を軽減
- **制限**: ストップロス注文は標準では対応していない

#### 拡張機能
- [RangeAmountCalculator](https://github.com/1inch/limit-order-protocol/blob/master/contracts/extensions/RangeAmountCalculator.sol)
- [DutchAuctionCalculator](https://github.com/1inch/limit-order-protocol/blob/master/contracts/extensions/DutchAuctionCalculator.sol)

### 3. Fusion（フュージョン）
- **別名**: Intent Swap
- **仕組み**:
  - ユーザーが売りたいトークンと量を指定
  - ダッチオークションが開始（数分間）
  - 「リゾルバー」が最適レートで注文を処理
- **メリット**:
  - 価格影響、スリッページ、ガス代を気にする必要がない
  - ワンクリックでスワップ実行
  - 常に最適なレートを取得

### 4. Fusion+（フュージョン・プラス）
- **概要**: 待望のクロスチェーン・ソリューション
- **特徴**:
  - 元のFusionの機能を拡張
  - 対応するEVMチェーン間で任意のトークンをスワップ可能

#### 拡張リソース
- [Cross-chain Resolver Example](https://github.com/1inch/cross-chain-resolver-example)
- [Cross-chain Swap](https://github.com/1inch/cross-chain-swap)

---

## インフラAPI

スワップ以外にも開発者向けの包括的なREST APIを提供：

- **Wallet Balances API**: ウォレット残高取得
- **Token Prices API**: トークン価格情報
- **Transaction History API**: 取引履歴
- **Transaction Traces API**: 取引の詳細分析
- その他多数のAPI

---

## 1inch Developer Portal

### アクセス方法

- 通常のKYC要件をスキップ
- **⚠️ 注意**: ハッカソン用APIキーはイベント後に無効化

### API呼び出しの方法
- **ドキュメント**: [portal.1inch.dev/documentation](http://portal.1inch.dev/documentation)
- **推奨**: Fusion+、Fusion、OrderbookにはSDKの使用を強く推奨

### 開発言語サポート

#### TypeScript SDK
- [Fusion+ example](https://github.com/Tanz0rz/fusion-plus-order)
- [Fusion example](https://github.com/1inch/fusion-sdk)
- [Orderbook example](https://github.com/1inch/limit-order-sdk)
- [Classic Swap example](https://portal.1inch.dev/documentation/apis/swap/classic-swap/quick-start)

#### Golang SDK
- [Fusion+ example](https://github.com/1inch/1inch-sdk-go/blob/main/sdk-clients/fusionplus/examples/place_order/main.go)
- [Fusion example](https://github.com/1inch/1inch-sdk-go/blob/main/sdk-clients/fusion/examples/place_order/main.go)
- [Orderbook example](https://github.com/1inch/1inch-sdk-go/blob/5b7b5c82a6691770142e01ee8bc318b9512e1dee/sdk-clients/orderbook/examples/create_order/main.go)
- [Classic Swap quote example](https://github.com/1inch/1inch-sdk-go/blob/main/sdk-clients/aggregation/examples/quote-no-key/main.go)
- [Token lookup example](https://github.com/1inch/1inch-sdk-go/blob/main/sdk-clients/tokens/examples/get_custom_token/main.go)

### フロントエンドからのAPI呼び出し

**⚠️ 重要**: 1inch APIは認証トークンが必要なため、ブラウザから直接呼び出すとCORSエラーが発生します。**プロキシが必須**です。

#### プロキシの選択肢

##### Option 1: Vercel（推奨：クラウド・無料）
- [1inch Vercel Proxy](https://github.com/Tanz0rz/1inch-vercel-proxy)
- クラウドプロキシをVercelにデプロイ

##### Option 2: Nginx（ローカル）
- [1inch Nginx Proxy](https://github.com/Tanz0rz/1inch-nginx-proxy/tree/main)
- `docker-compose`を使用したローカルnginxプロキシ

##### Option 3: カスタムプロキシサーバー（ローカル）
- [1inch Express Proxy](https://github.com/Tanz0rz/1inch-express-proxy)
- Node.js Expressを使用したローカルプロキシ

---

## Token Plugins（トークン・プラグイン）

**注意**: 現在のハッカソンでは対象外の賞金カテゴリ

### 概要
- ERC20トークンの機能を拡張するスマートコントラクト
- カスタム会計機能をオリジナルトークンに追加
- **主な利点**: トークンを特別なコントラクトに転送する必要がない
- 一度デプロイすれば、1inchプラグイン標準をサポートする任意のトークンで再利用可能

### 使用例

#### st1INCH resolver delegation
- ステーキングされた1INCHトークンがFusion/Fusion+システムのリゾルバーから報酬を獲得
- 委任はトークンプラグインで実行（トークン転送不要）

#### 重み付き投票権
- 長期保有者により多くの投票権を付与
- veCRVのようなVEガバナンスモデルの代替

#### LPトークン・ファーミング
- LP保有者への追加報酬を提供
- セカンダリコントラクトへの預金不要

#### シャドウ・ステーキング
- 保有期間に応じて報酬APRが増加
- 長期保有者が短期トレーダーより多くの利益を獲得

### ドキュメント
- [Token Plugins 設計ガイド](https://github.com/tradersnow222/token-plugins/blob/c154a1493c7d34157668999bc263814a54eab474/token-plugins-guide.md)

---

## テスト環境について

**⚠️ 重要**: 1inchはライブプロトコルを使用するため、**テストネットでのデプロイは利用できません**。

### テスト方法

#### Classic Swap
- ローカルでメインネットをフォークしてテスト
- [1inchSwap サンプルリポジトリ](https://github.com/Tanz0rz/1inchSwap)

#### Orderbook Protocol
- Classic Swapと同様の方法でテスト可能

#### Fusion/Fusion+
- ライブの取引相手が必要なため、直接サポートチームに相談
- ハッカソン期間中は現地でサポート提供

---

## 開発者向けリソース

### 公式リンク
- **Developer Portal**: [portal.1inch.dev](http://portal.1inch.dev)
- **API Documentation**: [portal.1inch.dev/documentation](http://portal.1inch.dev/documentation)
- **ハッカソン登録**: [hackathon.1inch.community](http://hackathon.1inch.community)

### GitHub リポジトリ
- TypeScript/Golang の実装例が豊富
- 各プロトコルのサンプルコード提供
- 活発なコミュニティサポート

### サポート
- ハッカソン期間中は直接サポート利用可能
- 包括的なドキュメンテーション
- コミュニティフォーラム

---

## まとめ

このガイドは、1inchの機能を活用して強力なDeFiアプリケーションを構築したい開発者にとって包括的なリソースとなっています。スワップ機能からインフラAPI、クロスチェーン機能まで、1inchエコシステムの全機能を活用して革新的なアプリケーションを開発することができます。