import React from 'react'
import { Classes } from '@blueprintjs/core'

export function AdvancedUsage() {
  return (
    <div className={Classes.RUNNING_TEXT}>
      <h3 style={{ marginTop: 6 }}>高级搜索帮助</h3>
      <ul>
        <li>使用空格分割多个搜索词。</li>
        <li>
          使用 <code>"双引号"</code> 包围关键词以精确检索结果。
        </li>
        <li>
          在关键词前使用 <code>-</code> 减号从结果中移除部分结果。
        </li>
        <li>
          在关键词前增加 <code>cn:</code>、<code>en:</code> 或 <code>ja:</code>{' '}
          以仅在特定语言中检索结果。
        </li>
        <li>
          使用 <code>filename:文件名</code> 以仅在特定文件中检索结果（大小写
          <strong>敏感</strong>）。
        </li>
        <li>
          使用 <code>(括号)</code> 包围表达式以使用
          <a
            href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html#_simple_query_string_syntax"
            target="_blank"
            rel="noopener noreferrer"
          >
            高级表达式
          </a>
          检索。
          <br />
          <small>
            ProTip: <code>default_operator</code> is <code>AND</code>.
          </small>
        </li>
      </ul>
    </div>
  )
}
