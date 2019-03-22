import React from 'react'
import { ISearchResult, ITextLine } from '../search/ITextLine'
import { HTMLTable, Colors } from '@blueprintjs/core'
import styled from '@emotion/styled'

const HighlightedTbody = styled.tbody({
  em: {
    textDecoration: 'none',
    backgroundColor: Colors.GOLD5,
    fontStyle: 'normal'
  }
})

export function ResultTable(props: { result: ISearchResult<ITextLine> }) {
  const items =
    props.result &&
    props.result.hits.map(item => {
      return {
        _id: item._id,
        index:
          item._source.filename.replace(/\.csv$/, '') +
          '#' +
          item._source.index,
        html: [
          ['cn', highlight(item, 'cn')],
          ['en', highlight(item, 'en')],
          ['ja', highlight(item, 'ja')]
        ]
      }
    })

  return (
    <HTMLTable condensed striped interactive>
      <thead>
        <tr>
          <th>位置</th>
          <th>中文</th>
          <th>英语</th>
          <th>日语</th>
        </tr>
      </thead>
      <HighlightedTbody>
        {items.map(item => (
          <tr key={item._id}>
            <td>{item.index}</td>
            {item.html.map(i => (
              <td key={i[0]} dangerouslySetInnerHTML={{ __html: i[1] }} />
            ))}
          </tr>
        ))}
      </HighlightedTbody>
    </HTMLTable>
  )
}

function highlight(
  h: { highlight: any; _source: any },
  lang: 'cn' | 'en' | 'ja'
) {
  let html = h.highlight && h.highlight[lang] && h.highlight[lang][0]
  if (!html) {
    html = h._source[lang] || ''
  }
  return html
    .replace(/\t/g, '\n')
    .replace(/<(?!\/?em)([^>]+)>/, '&lt;$1&gt;')
    .replace(/<(?!\/?em)/, '&lt;')
}
