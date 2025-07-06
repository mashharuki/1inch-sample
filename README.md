# 1inch-sample
1inch調査用のリポジトリ

## 1inchとは

分散型取引所（DEX）アグリゲーター

## 1 inchの3つの主要サービス

### 1. Classic Swap（クラシック・スワップ）

- 機能: 複数のDEXから流動性を集約し、最適な交換レートを提供
- 特徴:  
    人気のあるすべてのプロトコルから流動性を調達
    複数のプロトコルを組み合わせて最適な出力を実現
    単一のトランザクションですべての交換を実行



### 2. 1inch Fusion（フュージョン）

- 仕組み:
  ユーザーが署名付きのスワップリクエストを送信
  ダッチオークション（価格が時間とともに下がる）を開始
  「リゾルバー」と呼ばれる競合者が非同期で注文を処理
- メリット:
    MEV（最大抽出可能価値）攻撃からユーザーを保護
    ユーザーにとってガス代不要
    より良いレートを提供

### 3. 1inch Fusion+（フュージョン・プラス）

- 機能: クロスチェーン（異なるブロックチェーン間）での交換
- 技術:
    ハッシュタイムロック契約（HTLC）を使用
    エスクロー契約で安全性を確保
    信頼性の高い仕組みを提供

### サポートチェーン

- Ethereum
- BNB Chain
- Polygon
- Optimism
- Arbitrum
- Base
- Avalanche
- zkSync Era
- Gnosis Chain
- Sonic
- Unichain
- Linea
- Fusion: Solanaも対応

### 開発者向け情報

- Developer Portal: portal.1inch.dev
- SDK: TypeScript/Golang で利用可能
- API アクセス:   
    プロキシサーバーが必要（フロントエンドから直接呼び出し不可）

    プロキシサーバーのサンプル実装は以下が参考になりそう

    [GitHub - Tanz0rz/1inch-vercel-proxy](https://github.com/Tanz0rz/1inch-vercel-proxy)

## 参考文献
- [ETH Global 1inch prize](https://ethglobal.com/events/unite/prizes/1inch)
- [Hackathon Guide Document](https://carnelian-raft-206.notion.site/Welcome-to-the-1inch-Hackathon-Landing-Page-1b4af144f6708016bd70c3ec7bbd7027)
- [Building With 1inch](https://carnelian-raft-206.notion.site/Building-with-1inch-132af144f6708092be0ee25ec80cec4d)
- [GitHub - Tanz0rz/1inch-vercel-proxy](https://github.com/Tanz0rz/1inch-vercel-proxy)