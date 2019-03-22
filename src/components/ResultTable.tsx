import React from 'react'
import { ISearchResult, ITextLine } from '../search/ITextLine'
import { HTMLTable, Colors, Classes } from '@blueprintjs/core'
import styled from '@emotion/styled'

const HighlightedTbody = styled.tbody({
  em: {
    textDecoration: 'none',
    backgroundColor: Colors.GOLD5,
    fontStyle: 'normal'
  },
  td: {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    cursor: 'auto'
  },
  'td:nth-of-type(1)': {
    width: '10%',
    fontSize: 12,
    fontFamily: 'monospace'
  },
  'td:nth-of-type(2)': {
    width: '30%'
  },
  'td:nth-of-type(3)': {
    width: '30%'
  },
  'td:nth-of-type(4)': {
    width: '30%'
  }
})

const StyledHtmlTable = styled(HTMLTable)({
  minWidth: 700,
  [`&.${Classes.HTML_TABLE}.${Classes.HTML_TABLE_STRIPED} tbody tr:hover td`]: {
    backgroundColor: Colors.LIGHT_GRAY4
  }
})

const ScollableContainer = styled.div({
  width: '100%',
  overflowX: 'auto'
})

export function ResultTable(props: { result: ISearchResult<ITextLine> }) {
  const items =
    props.result &&
    props.result.hits.map(item => {
      return {
        _id: item._id,
        index:
          item._source.filename.replace(/\.csv$/, '') +
          '\n#' +
          item._source.index,
        html: [
          ['cn', highlight(item, 'cn')],
          ['en', highlight(item, 'en')],
          ['ja', highlight(item, 'ja')]
        ]
      }
    })

  return (
    <ScollableContainer>
      <StyledHtmlTable condensed striped>
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
      </StyledHtmlTable>
    </ScollableContainer>
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
