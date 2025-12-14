/**
 * 🗄️ GAS Partition Table
 * アプリケーションIDとライブラリの紐付け定義
 */
const GasPartitionTable = {

  // 📝 Registry (Routing Table)
  // key: URLパラメータ(?app=xxx)
  // value: { lib: ライブラリ識別子, title: アプリ名 }
  REGISTRY: {
    // デフォルトアプリ
    'PRD': { 
      lib: DemoOS, // スクリプトエディタで追加したライブラリ名
      title: 'DemoOS - PRD'
    },
    // デフォルトアプリ
    'STG': { 
      lib: DemoOS, // スクリプトエディタで追加したライブラリ名
      title: 'DemoOS - STG'
    }
  },

  /**
   * 💿 Mount Partition
   * ライブラリからBootClass(Kernel)を取り出して返す
   */
  mountPartition(partitionId) {
    const entry = this.REGISTRY[partitionId];
    if (!entry) return null;

    try {
      // ライブラリ識別子からオブジェクトを取得
      // ※ GASの仕様上、globalThis[string] でライブラリにアクセスする
      const library = entry.lib;
      
      if (!library) {
        throw new Error(`Library '${entry.lib}' is not attached to this script.`);
      }

      // Stage 2 の export.gs で定義した "BootClass" を取得
      if (!library.BootClass) {
        throw new Error(`Library '${entry.lib}' does not export 'BootClass'.`);
      }

      return library.BootClass;

    } catch (e) {
      console.error(`[Partition Mount Error] ${e.message}`);
      throw e;
    }
  },

  /**
   * 🏷️ Get Meta Info
   */
  getAppTitle(partitionId) {
    const entry = this.REGISTRY[partitionId];
    return entry ? entry.title : 'GBS Application';
  }
};
var PartitionTable = GasPartitionTable;
