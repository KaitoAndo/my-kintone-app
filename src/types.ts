// フィールドの種類の定義
export type FieldType = 'SINGLE_LINE_TEXT' | 'NUMBER' | 'SELECT' | 'DATE'

// 1つのフィールドの設定情報
export interface AppField {
  fieldCode: string
  label: string
  type: FieldType
  required: boolean
  options?: string[]
  width?: 'full' | 'half'
}

// アプリ定義そのもの (Schema)
export interface AppSchema {
  appId: string
  name: string
  fields: AppField[]
}
